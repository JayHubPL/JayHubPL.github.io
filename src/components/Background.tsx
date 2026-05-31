import { useEffect, Suspense, lazy } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'

const CubeScene = lazy(() => import('./rubiks/CubeScene'))

export default function Background() {
  const mouseX = useMotionValue(50)
  const mouseY = useMotionValue(50)
  const springX = useSpring(mouseX, { stiffness: 45, damping: 22 })
  const springY = useSpring(mouseY, { stiffness: 45, damping: 22 })
  const spotlight = useMotionTemplate`radial-gradient(1200px circle at ${springX}% ${springY}%, rgba(255,222,89,0.13), transparent 65%)`

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) * 100)
      mouseY.set((e.clientY / window.innerHeight) * 100)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [mouseX, mouseY])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />
      <div className="bg-orb bg-orb-3" />
      <motion.div className="absolute inset-0" style={{ background: spotlight }} />

      {/* 3-D floating Rubik's cubes */}
      <div className="absolute inset-0" style={{ opacity: 0.55 }}>
        <Suspense fallback={null}>
          <CubeScene count={8} />
        </Suspense>
      </div>
    </div>
  )
}
