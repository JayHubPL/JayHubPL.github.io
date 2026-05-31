import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef, useEffect, type RefObject } from 'react'
import * as THREE from 'three'
import ShootingCube from './ShootingCube'
import type { RubiksCubeConfig } from './RubiksCube'
import {
  type PhysicsBody,
  QuadTree,
  makeRadius,
  spawnFromEdge,
  resolveCollision,
} from './physics'

// ─── Cube parameters ──────────────────────────────────────────────────────────

interface CubeParam {
  baseScale:    number
  baseSpeed:    number
  baseRotVel:   [number, number, number]
  initialDelay: number
  config:       Partial<RubiksCubeConfig>
}

function makeParams(count: number): CubeParam[] {
  return Array.from({ length: count }, (_, i) => {
    const s = i + 1
    return {
      baseScale:   0.056 + (s % 5) * 0.008,
      baseSpeed:   (1.4 + (s % 4) * 0.4) * 0.2,
      baseRotVel: [
        (0.18 + (s % 3) * 0.07) * 1.2,
        (0.22 + (s % 4) * 0.06) * 1.2,
        (0.10 + (s % 2) * 0.05) * 1.2,
      ] as [number, number, number],
      initialDelay: i * 0.9,
      config: {
        twistInterval: 1.2 + (s % 4) * 0.4,
        twistDuration: 0.35,
      },
    }
  })
}

// ─── Debug overlay drawing ────────────────────────────────────────────────────

function drawDebug(
  ctx:   CanvasRenderingContext2D,
  qt:    QuadTree,
  bodies: PhysicsBody[],
  flash: Map<number, number>,
  vpW:   number, vpH: number,  // viewport in world units
  pw:    number, ph: number,   // canvas in pixels
): void {
  ctx.clearRect(0, 0, pw, ph)

  // World → canvas pixel transforms (Three.js is Y-up, canvas is Y-down)
  const toX = (wx: number) =>  (wx / vpW + 0.5) * pw
  const toY = (wy: number) => (-wy / vpH + 0.5) * ph
  const toW = (ww: number) =>  ww / vpW * pw
  const toH = (wh: number) =>  wh / vpH * ph

  // QuadTree cell outlines
  ctx.save()
  ctx.strokeStyle = 'rgba(255,222,89,0.18)'
  ctx.lineWidth   = 1
  ctx.setLineDash([4, 4])
  qt.draw(ctx, toX, toY, toW, toH)
  ctx.setLineDash([])
  ctx.restore()

  // Collision radii + centre dots
  for (let i = 0; i < bodies.length; i++) {
    const body = bodies[i]
    if (!body.visible) continue

    const cx = toX(body.pos[0])
    const cy = toY(body.pos[1])
    const r  = toW(body.radius)
    const flashing = (flash.get(i) ?? 0) > 0

    ctx.beginPath()
    ctx.arc(cx, cy, r, 0, Math.PI * 2)
    if (flashing) {
      ctx.fillStyle   = 'rgba(255,80,80,0.15)'
      ctx.fill()
      ctx.strokeStyle = 'rgba(255,80,80,0.9)'
      ctx.lineWidth   = 2
    } else {
      ctx.strokeStyle = 'rgba(255,222,89,0.4)'
      ctx.lineWidth   = 1
    }
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(cx, cy, 2.5, 0, Math.PI * 2)
    ctx.fillStyle = flashing ? 'rgba(255,80,80,0.9)' : 'rgba(255,222,89,0.7)'
    ctx.fill()
  }
}

// ─── Inner physics scene (must live inside Canvas) ────────────────────────────

interface PhysicsSceneProps {
  params:       CubeParam[]
  speedMult:    number
  rotationMult: number
  scaleMult:    number
  debug:        boolean
  debugCanvas:  RefObject<HTMLCanvasElement | null>
}

function PhysicsScene({
  params, speedMult, rotationMult, scaleMult, debug, debugCanvas,
}: PhysicsSceneProps) {
  const groupRefs = useRef<(THREE.Group | null)[]>([])

  // Stable per-cube ref callbacks — set invisible on mount, store in groupRefs
  const refCallbacks = useMemo(
    () => params.map((_, i) => (el: THREE.Group | null) => {
      if (el) el.visible = false
      groupRefs.current[i] = el
    }),
    [params],
  )

  // Physics bodies — lazy init once per mount
  const bodiesRef = useRef<PhysicsBody[] | null>(null)
  if (!bodiesRef.current) {
    bodiesRef.current = params.map(p => ({
      pos:        [0, 0] as [number, number],
      vel:        [0, 0] as [number, number],
      rotVel:     [p.baseRotVel[0] * rotationMult, p.baseRotVel[1] * rotationMult, p.baseRotVel[2] * rotationMult] as [number, number, number],
      baseRotVel: [p.baseRotVel[0] * rotationMult, p.baseRotVel[1] * rotationMult, p.baseRotVel[2] * rotationMult] as [number, number, number],
      rotation:   [0, 0, 0] as [number, number, number],
      radius:     makeRadius(p.baseScale * scaleMult),
      baseSpeed:  p.baseSpeed,
      delay:      p.initialDelay,
      visible:    false,
    }))
  }

  // Collision flash timers: body index → remaining seconds
  const flashRef = useRef(new Map<number, number>())

  // Rescale live velocities when speedMult changes
  useEffect(() => {
    for (const body of bodiesRef.current!) {
      if (!body.visible) continue
      const speed = body.baseSpeed * speedMult
      const vLen  = Math.sqrt(body.vel[0] ** 2 + body.vel[1] ** 2)
      if (vLen > 1e-6) {
        body.vel[0] = body.vel[0] / vLen * speed
        body.vel[1] = body.vel[1] / vLen * speed
      }
    }
  }, [speedMult])

  // Update baseRotVel when rotationMult changes
  useEffect(() => {
    params.forEach((p, i) => {
      const body = bodiesRef.current![i]
      if (!body) return
      body.baseRotVel = [
        p.baseRotVel[0] * rotationMult,
        p.baseRotVel[1] * rotationMult,
        p.baseRotVel[2] * rotationMult,
      ]
    })
  }, [rotationMult, params])

  // Update radii when scaleMult changes
  useEffect(() => {
    params.forEach((p, i) => {
      const body = bodiesRef.current![i]
      if (!body) return
      body.radius = makeRadius(p.baseScale * scaleMult)
    })
  }, [scaleMult, params])

  const maxR = useMemo(
    () => Math.max(...params.map(p => makeRadius(p.baseScale * scaleMult))),
    [params, scaleMult],
  )

  useFrame(({ viewport: vp, size }, delta) => {
    const bodies = bodiesRef.current!
    const flash  = flashRef.current

    // ── 1. Integrate + build quadtree ─────────────────────────────────────────
    const qt = new QuadTree({
      cx: 0, cy: 0,
      hw: vp.width  / 2 + maxR,
      hh: vp.height / 2 + maxR,
    }, 2)

    for (let i = 0; i < bodies.length; i++) {
      const body = bodies[i]
      if (body.delay > 0) { body.delay -= delta; continue }

      if (!body.visible) {
        spawnFromEdge(vp.width, vp.height, body.baseSpeed * speedMult, body)
        body.visible = true
      }

      body.pos[0] += body.vel[0] * delta
      body.pos[1] += body.vel[1] * delta

      // Exponential decay of rotVel back to base
      const decay = 1 - Math.exp(-2.5 * delta)
      for (let k = 0; k < 3; k++) {
        body.rotVel[k]   += (body.baseRotVel[k] - body.rotVel[k]) * decay
        body.rotation[k] += body.rotVel[k] * delta
      }

      qt.insert({ x: body.pos[0], y: body.pos[1], idx: i })
    }

    // ── 2. Collision detection + resolution ───────────────────────────────────
    for (let i = 0; i < bodies.length; i++) {
      const bi = bodies[i]
      if (!bi.visible) continue

      const candidates = qt.query(bi.pos[0], bi.pos[1], bi.radius + maxR)
      for (const j of candidates) {
        if (j <= i) continue
        const bj = bodies[j]
        if (!bj.visible) continue
        if (resolveCollision(bi, bj)) {
          flash.set(i, 0.35)
          flash.set(j, 0.35)
        }
      }
    }

    // ── 3. Apply to Three.js groups + respawn out-of-bounds ───────────────────
    for (let i = 0; i < bodies.length; i++) {
      const body = bodies[i]
      const ref  = groupRefs.current[i]
      if (!ref) continue

      if (!body.visible || body.delay > 0) { ref.visible = false; continue }

      const hw = vp.width  / 2 + body.radius + 0.2
      const hh = vp.height / 2 + body.radius + 0.2
      if (body.pos[0] < -hw || body.pos[0] > hw || body.pos[1] < -hh || body.pos[1] > hh) {
        body.visible = false
        ref.visible  = false
        continue
      }

      ref.visible = true
      ref.position.set(body.pos[0], body.pos[1], 0)
      ref.rotation.set(body.rotation[0], body.rotation[1], body.rotation[2])
    }

    // ── 4. Debug overlay ──────────────────────────────────────────────────────
    if (!debug) return
    const canvas = debugCanvas.current
    if (!canvas) return

    if (canvas.width !== size.width || canvas.height !== size.height) {
      canvas.width  = size.width
      canvas.height = size.height
    }
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Tick flash timers
    for (const [idx, t] of flash) {
      const next = t - delta
      if (next <= 0) flash.delete(idx)
      else flash.set(idx, next)
    }

    drawDebug(ctx, qt, bodies, flash, vp.width, vp.height, canvas.width, canvas.height)
  })

  return (
    <>
      {params.map((p, i) => (
        <ShootingCube
          key={i}
          ref={refCallbacks[i]}
          scale={p.baseScale * scaleMult}
          config={p.config}
        />
      ))}
    </>
  )
}

// ─── Public component ─────────────────────────────────────────────────────────

export interface CubeSceneProps {
  count?:        number
  speedMult?:    number
  rotationMult?: number
  scaleMult?:    number
  debug?:        boolean
}

export default function CubeScene({
  count        = 10,
  speedMult    = 1,
  rotationMult = 1,
  scaleMult    = 1,
  debug        = false,
}: CubeSceneProps) {
  const params      = useMemo(() => makeParams(count), [count])
  const debugCanvas = useRef<HTMLCanvasElement>(null)

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.55, filter: 'blur(1.2px)' }}>
        <Canvas
          camera={{ position: [0, 0, 10], fov: 55 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
          dpr={[1, 1.5]}
        >
          <PhysicsScene
            key={count}
            params={params}
            speedMult={speedMult}
            rotationMult={rotationMult}
            scaleMult={scaleMult}
            debug={debug}
            debugCanvas={debugCanvas}
          />
        </Canvas>
      </div>
      {debug && (
        <canvas
          ref={debugCanvas}
          style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
        />
      )}
    </div>
  )
}
