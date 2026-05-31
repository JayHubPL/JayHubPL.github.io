import { Canvas } from '@react-three/fiber'
import { useMemo } from 'react'
import ShootingCube, { type ShootingCubeProps } from './ShootingCube'

// Base values — multipliers from CubeConfig are applied at render time
// so count changes recreate cubes, but multiplier changes only update props.
interface BaseProps extends Omit<ShootingCubeProps, 'speed' | 'rotationSpeed' | 'scale'> {
  baseSpeed: number
  baseRotation: [number, number, number]
  baseScale: number
}

function makeBaseCubes(count: number): BaseProps[] {
  return Array.from({ length: count }, (_, i) => {
    const s = i + 1
    return {
      baseScale: 0.056 + (s % 5) * 0.008,
      baseSpeed: (1.4 + (s % 4) * 0.4) * 0.2,
      baseRotation: [
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

export interface CubeSceneProps {
  count?: number
  speedMult?: number
  rotationMult?: number
  scaleMult?: number
}

export default function CubeScene({
  count = 10,
  speedMult = 1,
  rotationMult = 1,
  scaleMult = 1,
}: CubeSceneProps) {
  // Only recreates when count changes — multipliers applied below, not here
  const bases = useMemo(() => makeBaseCubes(count), [count])

  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
      dpr={[1, 1.5]}
    >
      {bases.map((b, i) => (
        <ShootingCube
          key={i}
          scale={b.baseScale * scaleMult}
          speed={b.baseSpeed * speedMult}
          rotationSpeed={[
            b.baseRotation[0] * rotationMult,
            b.baseRotation[1] * rotationMult,
            b.baseRotation[2] * rotationMult,
          ]}
          initialDelay={b.initialDelay}
          config={b.config}
        />
      ))}
    </Canvas>
  )
}
