interface TechBadgeProps {
  icon: string
  name: string
}

export default function TechBadge({ icon, name }: TechBadgeProps) {
  return (
    <span
      className="inline-flex items-center gap-1 align-middle mx-px"
      style={{
        background: 'rgba(255, 222, 89, 0.08)',
        border: '1px solid rgba(255, 222, 89, 0.2)',
        borderRadius: '5px',
        padding: '1px 7px 1px 5px',
        fontSize: '0.85rem',
        color: 'rgba(232, 232, 232, 0.85)',
        verticalAlign: 'middle',
      }}
    >
      <i className={`${icon} colored`} style={{ fontSize: '0.85rem', lineHeight: 1 }} />
      {name}
    </span>
  )
}
