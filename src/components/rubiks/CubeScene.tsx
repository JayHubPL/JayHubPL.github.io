import { Canvas } from '@react-three/fiber'
import { useMemo } from 'react'
import FloatingCube, { type FloatingCubeProps } from './FloatingCube'

// Deterministic-ish seeded layout so cubes don't jump on remount
function makeCubes(count: number): FloatingCubeProps[] {
  const cubes: FloatingCubeProps[] = []
  // Spread cubes across a wide viewport-like area (units map roughly to screen)
  const xs = [-7, -4.5, -2, 0.5, 3, 5.5, 8, -6, 4]
  const ys = [4, -3, 5.5, -5, 3, -1.5, 0, 1.5, -4]

  for (let i = 0; i < count; i++) {
    const seed = i + 1
    cubes.push({
      position: [xs[i % xs.length], ys[i % ys.length], -2 - (seed % 3)],
      scale: 0.28 + (seed % 5) * 0.04,
      rotationSpeed: [
        0.18 + (seed % 3) * 0.07,
        0.22 + (seed % 4) * 0.06,
        0.1  + (seed % 2) * 0.05,
      ],
      drift: [
        0.35 + (seed % 3) * 0.1,
        0.28 + (seed % 4) * 0.08,
        0.18 + (seed % 5) * 0.03,
        seed * 1.3,
      ],
      config: {
        twistInterval: 1.8 + (seed % 5) * 0.5,
      },
    })
  }
  return cubes
}

export interface CubeSceneProps {
  count?: number
}

export default function CubeScene({ count = 8 }: CubeSceneProps) {
  const cubes = useMemo(() => makeCubes(count), [count])

  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
      dpr={[1, 1.5]}
    >
      {cubes.map((props, i) => (
        <FloatingCube key={i} {...props} />
      ))}
    </Canvas>
  )
}
