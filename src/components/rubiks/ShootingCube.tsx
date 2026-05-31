import { forwardRef, useMemo } from 'react'
import * as THREE from 'three'
import RubiksCube, { DEFAULT_CONFIG, type RubiksCubeConfig } from './RubiksCube'

export interface ShootingCubeProps {
  scale:   number
  config?: Partial<RubiksCubeConfig>
}

const ShootingCube = forwardRef<THREE.Group, ShootingCubeProps>(
  function ShootingCube({ scale, config }, ref) {
    const mergedConfig = useMemo<RubiksCubeConfig>(
      () => ({ ...DEFAULT_CONFIG, ...config }),
      [config],
    )
    return (
      <group ref={ref} scale={scale}>
        <RubiksCube config={mergedConfig} />
      </group>
    )
  }
)

export default ShootingCube
