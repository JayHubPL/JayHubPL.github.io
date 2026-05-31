import { motion, type Variants } from 'framer-motion'
import { Github, Linkedin, Download, ArrowDown, Mail } from 'lucide-react'
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
        <div className="grid min-[930px]:grid-cols-[auto_1fr] gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
            className="hidden min-[930px]:flex justify-center"
          >
            <div
              className="w-[14.5rem] h-[14.5rem] rounded-full overflow-hidden"
              style={{
                border: '2px solid rgba(255, 222, 89, 0.28)',
                boxShadow: '0 0 48px rgba(255, 222, 89, 0.1)',
              }}
            >
              <img src="/profile.jpg" alt="Hubert Mazur" className="w-full h-full object-cover" />
            </div>
          </motion.div>

          <motion.div variants={container} initial="hidden" animate="show" className="justify-self-center max-w-full min-[930px]:justify-self-stretch">
            <motion.p
              variants={item}
              className="text-muted text-xs font-semibold tracking-[0.25em] uppercase mb-5"
            >
              Hi, I'm
            </motion.p>

            <motion.h1
              variants={item}
              className="text-[4.125rem] sm:text-[4.95rem] font-extrabold tracking-tight leading-[1.0] mb-3 whitespace-nowrap"
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
              className="text-[1.375rem] sm:text-[1.65rem] text-muted font-light tracking-wide mb-6"
            >
              Software Engineer
              <span className="text-accent mx-3 font-normal">·</span>
              Full Stack
            </motion.p>

            <motion.p
              variants={item}
              className="text-muted text-base leading-relaxed mb-9 text-justify max-w-[37rem]"
              style={{ lineHeight: '1.75' }}
            >
              Full-stack engineer with 3.5 years of production experience building scalable services
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
              <a href="#contact" className="btn-outline">
                <Mail size={15} />
                Get in Touch
              </a>
            </motion.div>
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
            className="text-accent/40 hover:text-accent transition-all duration-300 hover:drop-shadow-[0_0_10px_rgba(255,222,89,0.55)]"
            animate={{ y: [0, 7, 0] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
            aria-label="Scroll to experience"
          >
            <ArrowDown size={22} strokeWidth={2.5} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
