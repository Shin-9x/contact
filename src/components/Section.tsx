import type { ReactNode } from 'react'

interface SectionProps {
  id?: string
  children: ReactNode
  className?: string
  labelledBy?: string
}

/** A page section with the hairline rule the design draws between sections. */
export function Section({ id, children, className = '', labelledBy }: SectionProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`border-t border-ink/10 ${className}`}>
      {children}
    </section>
  )
}

/**
 * The recurring two-column rhythm of the design: a fixed mono label on the left,
 * fluid content on the right, wrapping to a single column when space runs out.
 */
export function SectionSplit({
  children,
  align = 'stretch',
}: {
  children: ReactNode
  align?: 'stretch' | 'start'
}) {
  return (
    <div
      className={`flex flex-wrap gap-x-[56px] gap-y-5 ${align === 'start' ? 'items-start' : ''}`}
    >
      {children}
    </div>
  )
}

/** Right-hand column of a `SectionSplit`. */
export function SectionBody({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`min-w-0 flex-[1_1_min(100%,420px)] ${className}`}>{children}</div>
}
