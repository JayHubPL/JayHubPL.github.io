import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import RubiksCube, { DEFAULT_CONFIG, type RubiksCubeConfig } from './RubiksCube'

export interface FloatingCubeProps {
  position: [number, number, number]
  scale: number
  /** Slow tumble speed on each axis in rad/s */
  rotationSpeed: [number, number, number]
  /** [amplitudeX, amplitudeY, frequency, phaseOffset] */
  drift: [number, number, number, number]
  config?: Partial<RubiksCubeConfig>
}

export default function FloatingCube({ position, scale, rotationSpeed, drift, config }: FloatingCubeProps) {
  const groupRef = useRef<THREE.Group>(null)
  const origin = useMemo(() => new THREE.Vector3(...position), [position])
  const mergedConfig = useMemo<RubiksCubeConfig>(
    () => ({ ...DEFAULT_CONFIG, ...config }),
    [config],
  )

  useFrame(({ clock }, delta) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()
    const [ax, ay, freq, phase] = drift
    groupRef.current.position.set(
      origin.x + Math.sin(t * freq + phase) * ax,
      origin.y + Math.cos(t * freq * 0.7 + phase) * ay,
      origin.z,
    )
    groupRef.current.rotation.x += rotationSpeed[0] * delta
    groupRef.current.rotation.y += rotationSpeed[1] * delta
    groupRef.current.rotation.z += rotationSpeed[2] * delta
  })

  return (
    <group ref={groupRef} scale={scale}>
      <RubiksCube config={mergedConfig} />
    </group>
  )
}
