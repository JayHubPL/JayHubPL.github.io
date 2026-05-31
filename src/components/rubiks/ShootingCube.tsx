import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import RubiksCube, { DEFAULT_CONFIG, type RubiksCubeConfig } from './RubiksCube'

export interface ShootingCubeProps {
  scale: number
  /** World-units per second */
  speed: number
  /** Tumble speed on each axis in rad/s */
  rotationSpeed: [number, number, number]
  /** Seconds to wait before first spawn */
  initialDelay: number
  config?: Partial<RubiksCubeConfig>
}

type Viewport = { width: number; height: number }

function spawnFromEdge(vp: Viewport, speed: number, pos: THREE.Vector3, vel: THREE.Vector3) {
  const hw = vp.width  / 2
  const hh = vp.height / 2
  const margin = 0.3

  const edge = Math.floor(Math.random() * 4)
  let x = 0, y = 0, dx = 0, dy = 0

  if (edge === 0) {          // left → right
    x = -(hw + margin); y = (Math.random() - 0.5) * vp.height
    dx = 1; dy = (Math.random() - 0.5) * 0.7
  } else if (edge === 1) {   // right → left
    x = hw + margin;  y = (Math.random() - 0.5) * vp.height
    dx = -1; dy = (Math.random() - 0.5) * 0.7
  } else if (edge === 2) {   // top → down
    x = (Math.random() - 0.5) * vp.width; y = hh + margin
    dx = (Math.random() - 0.5) * 0.7; dy = -1
  } else {                   // bottom → up
    x = (Math.random() - 0.5) * vp.width; y = -(hh + margin)
    dx = (Math.random() - 0.5) * 0.7; dy = 1
  }

  pos.set(x, y, 0)
  vel.set(dx, dy, 0).normalize().multiplyScalar(speed)
}

export default function ShootingCube({
  scale, speed, rotationSpeed, initialDelay, config,
}: ShootingCubeProps) {
  const groupRef = useRef<THREE.Group>(null)

  const mergedConfig = useMemo<RubiksCubeConfig>(
    () => ({ ...DEFAULT_CONFIG, ...config }),
    [config],
  )

  const pos   = useRef(new THREE.Vector3())
  const vel   = useRef(new THREE.Vector3())
  const delay = useRef(initialDelay)

  // When speed changes, rescale the live velocity so it takes effect immediately
  useEffect(() => {
    if (vel.current.lengthSq() > 0) {
      vel.current.normalize().multiplyScalar(speed)
    }
  }, [speed])

  useFrame(({ viewport: vp }, delta) => {
    const ref = groupRef.current
    if (!ref) return

    if (delay.current > 0) {
      ref.visible = false
      delay.current -= delta
      return
    }

    if (!ref.visible) {
      spawnFromEdge(vp, speed, pos.current, vel.current)
      ref.visible = true
    }

    pos.current.addScaledVector(vel.current, delta)
    ref.position.copy(pos.current)

    ref.rotation.x += rotationSpeed[0] * delta
    ref.rotation.y += rotationSpeed[1] * delta
    ref.rotation.z += rotationSpeed[2] * delta

    const hw = vp.width  / 2 + 0.5
    const hh = vp.height / 2 + 0.5
    if (
      pos.current.x < -hw || pos.current.x > hw ||
      pos.current.y < -hh || pos.current.y > hh
    ) {
      spawnFromEdge(vp, speed, pos.current, vel.current)
    }
  })

  return (
    <group ref={groupRef} scale={scale} visible={false}>
      <RubiksCube config={mergedConfig} />
    </group>
  )
}
