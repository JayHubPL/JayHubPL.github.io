import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// ─── Shared resource cache ────────────────────────────────────────────────────
// Geometry and materials are identical for all cubes with the same visual config.
// Cache them at module scope so N cube instances share 4 GPU resources instead of 4N.

type CubeletResources = {
  boxGeo:   THREE.BoxGeometry
  edgeGeo:  THREE.EdgesGeometry
  blackMat: THREE.MeshBasicMaterial
  edgeMat:  THREE.LineBasicMaterial
}
const _resourceCache = new Map<string, CubeletResources>()

function getCubeletResources(cubeletSize: number, faceColor: string, edgeColor: string): CubeletResources {
  const key = `${cubeletSize}|${faceColor}|${edgeColor}`
  let res = _resourceCache.get(key)
  if (!res) {
    const bg = new THREE.BoxGeometry(cubeletSize, cubeletSize, cubeletSize)
    res = {
      boxGeo:   bg,
      edgeGeo:  new THREE.EdgesGeometry(bg),
      blackMat: new THREE.MeshBasicMaterial({ color: faceColor }),
      edgeMat:  new THREE.LineBasicMaterial({ color: edgeColor }),
    }
    _resourceCache.set(key, res)
  }
  return res
}

// ─── Config ───────────────────────────────────────────────────────────────────

export interface RubiksCubeConfig {
  /** Visual size of each cubelet. Gap between cubelets = 1 - cubeletSize. */
  cubeletSize: number
  edgeColor: string
  faceColor: string
  /** Seconds of idle time between layer twists */
  twistInterval: number
  /** Seconds a single 90° twist takes */
  twistDuration: number
}

export const DEFAULT_CONFIG: RubiksCubeConfig = {
  cubeletSize: 0.94,
  edgeColor: '#ffde59',
  faceColor: '#090909',
  twistInterval: 2.0,
  twistDuration: 0.45,
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2
}

// Cubelets live on an integer grid: each coordinate in {-1, 0, 1}.
// Positions in THREE-space match exactly (spacing = 1 unit).
const GRID_COORDS = Array.from({ length: 27 }, (_, i) => [
  (i % 3) - 1,
  (Math.floor(i / 3) % 3) - 1,
  Math.floor(i / 9) - 1,
] as [number, number, number])

const TWIST_AXES = [
  new THREE.Vector3(1, 0, 0),
  new THREE.Vector3(0, 1, 0),
  new THREE.Vector3(0, 0, 1),
]

interface TwistState {
  indices: number[]
  axis: THREE.Vector3
  targetAngle: number
  startPositions: THREE.Vector3[]
  startQuats: THREE.Quaternion[]
  elapsed: number
  duration: number
}

// ─── RubiksCube ───────────────────────────────────────────────────────────────

export default function RubiksCube({ config = DEFAULT_CONFIG }: { config?: RubiksCubeConfig }) {
  const { boxGeo, edgeGeo, blackMat, edgeMat } = useMemo(
    () => getCubeletResources(config.cubeletSize, config.faceColor, config.edgeColor),
    [config.cubeletSize, config.faceColor, config.edgeColor],
  )

  // One Group ref per cubelet — all animation is direct THREE.js mutation, no React state
  const refs = useRef<(THREE.Group | null)[]>(Array(27).fill(null))
  // Stable ref callbacks prevent React from re-running all 27 ref assignments on every re-render
  const cubeletRefCbs = useMemo(
    () => GRID_COORDS.map((_, i) => (el: THREE.Group | null) => { refs.current[i] = el }),
    [],
  )

  // Logical integer-grid positions, updated only when a twist completes
  const logPos = useRef(GRID_COORDS.map(([x, y, z]) => new THREE.Vector3(x, y, z)))
  const logQuat = useRef(Array.from({ length: 27 }, () => new THREE.Quaternion()))

  const twist = useRef<TwistState | null>(null)
  const idleTimer = useRef(0)
  // Reusable quaternion to avoid per-frame allocations
  const rotQ = useRef(new THREE.Quaternion())

  function startTwist() {
    const axis = TWIST_AXES[Math.floor(Math.random() * 3)]
    const layer = (Math.floor(Math.random() * 3) - 1) as -1 | 0 | 1
    const dir = Math.random() < 0.5 ? 1 : -1

    const indices: number[] = []
    logPos.current.forEach((p, i) => {
      if (Math.round(p.dot(axis)) === layer) indices.push(i)
    })

    twist.current = {
      indices,
      axis,
      targetAngle: dir * Math.PI / 2,
      startPositions: indices.map(i => logPos.current[i].clone()),
      startQuats:     indices.map(i => logQuat.current[i].clone()),
      elapsed: 0,
      duration: config.twistDuration,
    }
  }

  useFrame((_, delta) => {
    if (!twist.current) {
      idleTimer.current += delta
      if (idleTimer.current >= config.twistInterval) {
        idleTimer.current = 0
        startTwist()
      }
      return
    }

    const ts = twist.current
    ts.elapsed += delta
    const t = Math.min(ts.elapsed / ts.duration, 1)
    rotQ.current.setFromAxisAngle(ts.axis, easeInOutCubic(t) * ts.targetAngle)

    ts.indices.forEach((idx, i) => {
      const ref = refs.current[idx]
      if (!ref) return
      // Positions live in the same unit space as logPos (spacing = 1)
      ref.position.copy(ts.startPositions[i]).applyQuaternion(rotQ.current)
      ref.quaternion.copy(rotQ.current).multiply(ts.startQuats[i])
    })

    if (t >= 1) {
      ts.indices.forEach((idx) => {
        const ref = refs.current[idx]
        if (!ref) return
        ref.position.set(
          Math.round(ref.position.x),
          Math.round(ref.position.y),
          Math.round(ref.position.z),
        )
        logPos.current[idx].copy(ref.position)
        logQuat.current[idx].copy(ref.quaternion)
      })
      twist.current = null
    }
  })

  return (
    <group>
      {GRID_COORDS.map(([x, y, z], i) => (
        <group key={i} ref={cubeletRefCbs[i]} position={[x, y, z]}>
          <mesh geometry={boxGeo} material={blackMat} />
          <lineSegments geometry={edgeGeo} material={edgeMat} />
        </group>
      ))}
    </group>
  )
}
