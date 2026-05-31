import { motion, type Variants } from 'framer-motion'
import { Github, Linkedin, Download, ArrowDown } from 'lucide-react'
import { contact } from '../data'

const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98]

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
}

export default function Hero() {
  return (
    <section id="about" className="min-h-screen flex flex-col justify-center px-6 pt-16">
      <div className="max-w-5xl mx-auto w-full">
        <div className="grid md:grid-cols-[1fr_auto] gap-12 items-center">
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.p
              variants={item}
              className="text-muted text-xs font-semibold tracking-[0.25em] uppercase mb-5"
            >
              Hi, I'm
            </motion.p>

            <motion.h1
              variants={item}
              className="text-6xl sm:text-7xl font-extrabold tracking-tight leading-[1.0] mb-3"
            >
              Hubert{' '}
              <span
                className="text-accent"
                style={{ textShadow: '0 0 48px rgba(255,222,89,0.35)' }}
              >
                Mazur
              </span>
            </motion.h1>

            <motion.p
              variants={item}
              className="text-xl sm:text-2xl text-muted font-light tracking-wide mb-6"
            >
              Software Engineer
              <span className="text-accent mx-3 font-normal">·</span>
              Backend
            </motion.p>

            <motion.p
              variants={item}
              className="text-muted text-sm leading-relaxed max-w-lg mb-9"
              style={{ lineHeight: '1.75' }}
            >
              Backend engineer with 3.5 years of production experience building scalable services
              in Java and Python. Currently pursuing an MSc in Software Engineering at UvA.
              I thrive in cross-functional teams on challenges that impact large user bases.
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap gap-3">
              <a href="/cv.pdf" download className="btn-primary">
                <Download size={15} />
                Download CV
              </a>
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                <Github size={15} />
                GitHub
              </a>
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                <Linkedin size={15} />
                LinkedIn
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
            className="hidden md:flex justify-center"
          >
            <div
              className="w-52 h-52 rounded-full overflow-hidden"
              style={{
                border: '2px solid rgba(255, 222, 89, 0.28)',
                boxShadow: '0 0 48px rgba(255, 222, 89, 0.1)',
              }}
            >
              <img src="/profile.jpg" alt="Hubert Mazur" className="w-full h-full object-cover" />
            </div>
          </motion.div>
        </div>

        <motion.div
          className="flex justify-center mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.5 }}
        >
          <motion.a
            href="#experience"
            className="text-muted/40 hover:text-muted/70 transition-colors"
            animate={{ y: [0, 7, 0] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
            aria-label="Scroll to experience"
          >
            <ArrowDown size={20} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
