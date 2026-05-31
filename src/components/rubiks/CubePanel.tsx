import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export interface CubeConfig {
  count: number
  speedMult: number
  rotationMult: number
  scaleMult: number
}

export const DEFAULT_CUBE_CONFIG: CubeConfig = {
  count: 10,
  speedMult: 1,
  rotationMult: 1,
  scaleMult: 1,
}

interface SliderProps {
  label: string
  value: number
  min: number
  max: number
  step: number
  display: string
  onChange: (v: number) => void
}

function Slider({ label, value, min, max, step, display, onChange }: SliderProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <span className="text-xs uppercase tracking-widest text-muted">{label}</span>
        <span className="text-xs font-mono text-accent">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
        className="cube-slider w-full"
      />
    </div>
  )
}

interface CubePanelProps {
  config: CubeConfig
  onChange: (config: CubeConfig) => void
}

export default function CubePanel({ config, onChange }: CubePanelProps) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === '`') setOpen(v => !v)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const set = (key: keyof CubeConfig) => (v: number) =>
    onChange({ ...config, [key]: key === 'count' ? Math.round(v) : v })

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed bottom-6 right-6 z-50 w-72 tile p-5 backdrop-blur-md pointer-events-auto"
          initial={{ opacity: 0, x: 24, y: 8 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 24, y: 8 }}
          transition={{ type: 'spring', stiffness: 320, damping: 28 }}
        >
          <div className="flex items-center justify-between mb-5">
            <span className="text-xs font-bold uppercase tracking-widest text-accent">
              Cube Controls
            </span>
            <span className="text-xs font-mono text-muted opacity-60">` to close</span>
          </div>

          <div className="flex flex-col gap-5">
            <Slider
              label="Count"
              value={config.count}
              min={1} max={20} step={1}
              display={String(config.count)}
              onChange={set('count')}
            />
            <Slider
              label="Speed"
              value={config.speedMult}
              min={0.1} max={4} step={0.05}
              display={config.speedMult.toFixed(2) + '×'}
              onChange={set('speedMult')}
            />
            <Slider
              label="Rotation"
              value={config.rotationMult}
              min={0.1} max={5} step={0.1}
              display={config.rotationMult.toFixed(1) + '×'}
              onChange={set('rotationMult')}
            />
            <Slider
              label="Scale"
              value={config.scaleMult}
              min={0.2} max={5} step={0.1}
              display={config.scaleMult.toFixed(1) + '×'}
              onChange={set('scaleMult')}
            />
          </div>

          <div className="mt-5 pt-4 border-t border-white/5 text-center">
            <span className="text-xs text-muted opacity-40">press ` to toggle</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
