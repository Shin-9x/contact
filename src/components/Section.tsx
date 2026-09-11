import type { ReactNode } from 'react'
import { useReveal } from '../hooks/useReveal'

interface SectionProps {
  id?: string
  children: ReactNode
  className?: string
  labelledBy?: string
}

/** A page section with the hairline rule the design draws between sections. */
export function Section({ id, children, className = '', labelledBy }: SectionProps) {
  const { ref, isVisible } = useReveal<HTMLElement>({ rootMargin: '0px' })

  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={labelledBy}
      className={`relative border-t border-ink/10 ${className}`}
    >
      {/* The rule inks itself in across the page as the section arrives; the border
          underneath keeps it drawn once it has. */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 top-[-1px] h-px origin-left bg-ink/30 transition-transform duration-[600ms] ease-soft ${
          isVisible ? 'scale-x-100' : 'scale-x-0'
        }`}
      />
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
