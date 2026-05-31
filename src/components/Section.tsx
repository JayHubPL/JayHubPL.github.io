import FadeIn from './FadeIn'

interface SectionProps {
  id: string
  title: string
  children: React.ReactNode
  className?: string
}

export default function Section({ id, title, children, className = '' }: SectionProps) {
  return (
    <section id={id} className={`py-24 px-6 max-w-5xl mx-auto ${className}`}>
      <FadeIn>
        <p className="section-heading mb-10">{title}</p>
      </FadeIn>
      {children}
    </section>
  )
}
