import { GraduationCap, Award } from 'lucide-react'
import Section from './Section'
import FadeIn from './FadeIn'
import { education, certificates } from '../data'

export default function Education() {
  return (
    <Section id="education" title="Education & Certificates">
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <FadeIn>
            <p className="flex items-center gap-2 text-[0.65rem] font-bold tracking-[0.2em] uppercase text-muted/50 mb-3">
              <GraduationCap size={13} />
              Education
            </p>
          </FadeIn>
          <div className="space-y-3">
            {education.map((edu, i) => (
              <FadeIn key={edu.institution} delay={i * 0.1}>
                <div className="tile p-5">
                  <p className="font-semibold text-text text-sm leading-snug">{edu.degree}</p>
                  <p className="text-muted text-xs mt-1">{edu.institution}</p>
                  <p className="text-muted/50 text-xs mt-2">{edu.period}</p>
                  {edu.note && (
                    <p className="text-accent text-xs font-semibold mt-1.5">{edu.note}</p>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        <div>
          <FadeIn>
            <p className="flex items-center gap-2 text-[0.65rem] font-bold tracking-[0.2em] uppercase text-muted/50 mb-3">
              <Award size={13} />
              Certificates
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="tile p-5">
              {certificates.map((cert, i) => (
                <div
                  key={i}
                  className={i > 0 ? 'pt-4 mt-4 border-t border-white/[0.05]' : ''}
                >
                  <p className="font-semibold text-text text-sm">{cert.name}</p>
                  <p className="text-muted text-xs mt-0.5">{cert.issuer}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </Section>
  )
}
