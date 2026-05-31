import Section from './Section'
import FadeIn from './FadeIn'
import { skills } from '../data'

export default function Skills() {
  return (
    <Section id="skills" title="Skills">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((group, i) => (
          <FadeIn key={group.category} delay={i * 0.07}>
            <div className="tile p-5 h-full">
              <p className="text-[0.65rem] font-bold tracking-[0.22em] uppercase text-accent/70 mb-3.5">
                {group.category}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.items.map(skill => (
                  <span key={skill} className="tag">
                    {skill}
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
