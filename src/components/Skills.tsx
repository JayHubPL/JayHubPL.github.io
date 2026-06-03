import Section from './Section'
import FadeIn from './FadeIn'
import { coreSkills, skills } from '../data'

export default function Skills() {
  return (
    <Section id="skills" title="Skills">

      {/* Core Stack */}
      <p className="text-[0.6rem] font-bold tracking-[0.22em] uppercase text-accent/50 mb-3.5">
        Core Stack
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {coreSkills.map((skill, i) => (
          <FadeIn key={skill.name} delay={i * 0.06}>
            <div className="core-card h-full">
              <i className={`${skill.icon} colored text-[2.6rem] leading-none`} />
              <p className="text-[0.8rem] font-bold text-text">{skill.name}</p>
              <p className="text-[0.62rem] text-muted/70 leading-snug">{skill.ctx}</p>
              <span
                className="mt-auto text-[0.56rem] font-bold tracking-[0.08em] uppercase px-1.5 py-0.5 rounded"
                style={{
                  color: 'rgba(255, 222, 89, 0.55)',
                  background: 'rgba(255, 222, 89, 0.07)',
                  border: '1px solid rgba(255, 222, 89, 0.15)',
                }}
              >
                {skill.badge}
              </span>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Divider */}
      <div
        className="h-px mb-6"
        style={{ background: 'linear-gradient(to right, rgba(255,222,89,0.1), transparent)' }}
      />

      {/* Full Toolkit */}
      <p className="text-[0.6rem] font-bold tracking-[0.22em] uppercase text-accent/50 mb-3.5">
        Full Toolkit
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((group, i) => (
          <FadeIn key={group.category} delay={i * 0.07}>
            <div className="tile p-5 h-full">
              <p className="text-[0.58rem] font-bold tracking-[0.2em] uppercase text-accent/45 mb-3">
                {group.category}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map(item =>
                  item.icon ? (
                    <span key={item.name} className="icon-tag">
                      <i
                        className={`${item.icon} colored text-[1rem] leading-none${item.aura ? ' icon-aura' : ''}`}
                      />
                      {item.name}
                    </span>
                  ) : (
                    <span key={item.name} className="icon-tag-text">
                      {item.name}
                    </span>
                  )
                )}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

    </Section>
  )
}
