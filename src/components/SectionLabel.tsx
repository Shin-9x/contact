interface SectionLabelProps {
  children: string
  /**
   * Sections without a visible headline (Azienda, Metodo, partner) use their index
   * label as the heading, so the document outline stays h1 → h2 → h3.
   */
  as?: 'p' | 'h2'
  /**
   * Pins the label beside its section while that section scrolls past. Only from the
   * large breakpoint, where the label really has a column of its own.
   */
  sticky?: boolean
}

const classes =
  'w-[200px] shrink-0 grow-0 font-mono text-[11px] font-normal tracking-[.18em] text-ink/45 uppercase'

const stickyClasses = 'lg:sticky lg:top-[104px] lg:self-start'

export function SectionLabel({ children, as: Tag = 'p', sticky = false }: SectionLabelProps) {
  return <Tag className={sticky ? `${classes} ${stickyClasses}` : classes}>{children}</Tag>
}
