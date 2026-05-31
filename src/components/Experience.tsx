import { Building2, Calendar } from 'lucide-react'
import Section from './Section'
import FadeIn from './FadeIn'
import { experience } from '../data'

export default function Experience() {
  return (
    <Section id="experience" title="Work Experience">
      <div className="space-y-4">
        {experience.map((job, i) => (
          <FadeIn key={job.company} delay={i * 0.09}>
            <div className="tile p-6 md:p-8">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
                <div>
                  <h3 className="font-bold text-text text-lg leading-tight">{job.title}</h3>
                  <div className="flex items-center gap-1.5 text-muted text-sm mt-1.5">
                    <Building2 size={12} />
                    <span>{job.company}</span>
                  </div>
                </div>
                <div className="text-left sm:text-right shrink-0">
                  <div className="flex items-center sm:justify-end gap-1.5 text-muted text-sm">
                    <Calendar size={12} />
                    <span>{job.period}</span>
                  </div>
                  <span className="text-xs text-muted/50 mt-0.5 block">{job.duration}</span>
                </div>
              </div>

              <ul className="space-y-2.5 mb-5">
                {job.bullets.map((bullet, j) => (
                  <li key={j} className="flex gap-3 text-base text-muted leading-relaxed">
                    <span className="text-accent mt-[3px] shrink-0 text-xs">▸</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {job.stack.map(tech => (
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
