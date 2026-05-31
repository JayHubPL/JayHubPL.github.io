import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react'
import Section from './Section'
import FadeIn from './FadeIn'
import { contact } from '../data'

const items = [
  { Icon: Mail, label: contact.email, href: `mailto:${contact.email}` },
  { Icon: Phone, label: contact.phone, href: `tel:${contact.phone.replace(/\s/g, '')}` },
  { Icon: MapPin, label: contact.location, href: null },
  { Icon: Linkedin, label: 'LinkedIn', href: contact.linkedin },
  { Icon: Github, label: 'GitHub — JayHubPL', href: contact.github },
]

export default function Contact() {
  return (
    <Section id="contact" title="Contact">
      <div className="max-w-lg">
        <FadeIn>
          <p className="text-muted text-sm leading-relaxed mb-8" style={{ lineHeight: '1.75' }}>
            I'm currently open to new opportunities. Whether you have a question, a proposal,
            or just want to say hi — my inbox is always open.
          </p>
        </FadeIn>
        <div className="space-y-2.5">
          {items.map(({ Icon, label, href }, i) =>
            href ? (
              <FadeIn key={label} delay={i * 0.07}>
                <a
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="tile flex items-center gap-4 p-4 group"
                >
                  <span className="text-accent group-hover:scale-110 transition-transform duration-200 shrink-0">
                    <Icon size={17} />
                  </span>
                  <span className="text-sm text-muted group-hover:text-text transition-colors duration-200">
                    {label}
                  </span>
                </a>
              </FadeIn>
            ) : (
              <FadeIn key={label} delay={i * 0.07}>
                <div className="tile flex items-center gap-4 p-4">
                  <span className="text-accent shrink-0">
                    <Icon size={17} />
                  </span>
                  <span className="text-sm text-muted">{label}</span>
                </div>
              </FadeIn>
            ),
          )}
        </div>

        <FadeIn delay={0.4}>
          <p className="text-muted/30 text-xs mt-12 pb-8">
            © {new Date().getFullYear()} Hubert Mazur. Built with React 19 & Tailwind CSS.
          </p>
        </FadeIn>
      </div>
    </Section>
  )
}
