interface SectionLabelProps {
  children: string
  /**
   * Sections without a visible headline (Azienda, Metodo, partner) use their index
   * label as the heading, so the document outline stays h1 → h2 → h3.
   */
  as?: 'p' | 'h2'
}

const classes =
  'w-[200px] shrink-0 grow-0 font-mono text-[11px] font-normal tracking-[.18em] text-ink/45 uppercase'

export function SectionLabel({ children, as: Tag = 'p' }: SectionLabelProps) {
  return <Tag className={classes}>{children}</Tag>
}
