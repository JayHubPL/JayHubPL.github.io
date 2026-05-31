import { Github } from 'lucide-react'
import Section from './Section'
import FadeIn from './FadeIn'
import { projects } from '../data'

export default function Projects() {
  return (
    <Section id="projects" title="Projects">
      <div className="grid gap-5">
        {projects.map((project, i) => (
          <FadeIn key={project.title} delay={i * 0.1}>
            <div className="tile p-6 md:p-8">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <p className="text-xs font-bold tracking-[0.2em] uppercase text-muted/50 mb-1">
                    {project.shortTitle}
                  </p>
                  <h3 className="font-bold text-text text-xl leading-tight">{project.title}</h3>
                </div>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 p-2 rounded-lg border border-white/[0.06] hover:border-accent/30 hover:text-accent text-muted transition-all duration-200"
                  aria-label="View on GitHub"
                >
                  <Github size={18} />
                </a>
              </div>

              <p className="text-base text-muted leading-relaxed mb-5">{project.description}</p>

              <ul className="space-y-2.5 mb-5">
                {project.bullets.map((bullet, j) => (
                  <li key={j} className="flex gap-3 text-base text-muted leading-relaxed">
                    <span className="text-accent mt-[3px] shrink-0 text-xs">▸</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {project.stack.map(tech => (
                  <span key={tech} className="tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  )
}
