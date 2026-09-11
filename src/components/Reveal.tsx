import type { ReactNode, Ref } from 'react'
import { useReveal } from '../hooks/useReveal'

/** `rise` is the design's default; `fade` and `zoom` are for images and full-width frames. */
export type RevealVariant = 'rise' | 'fade' | 'zoom'

const hiddenClasses: Record<RevealVariant, string> = {
  rise: 'translate-y-4 opacity-0',
  fade: 'opacity-0',
  zoom: 'scale-[0.985] opacity-0',
}

interface RevealProps {
  children: ReactNode
  className?: string
  /** Milliseconds before this element starts, for staggering a group. */
  delay?: number
  variant?: RevealVariant
  /** Renders the wrapper as another tag, so lists and cards need no extra div. */
  as?: 'div' | 'li' | 'article' | 'p' | 'section' | 'span'
  duration?: number
}

/** Fade-and-rise on first scroll into view, as in the design's `[data-reveal]`. */
export function Reveal({
  children,
  className = '',
  delay = 0,
  variant = 'rise',
  as = 'div',
  duration = 480,
}: RevealProps) {
  const { ref, isVisible } = useReveal<HTMLDivElement>()
  const Tag = as as 'div'

  return (
    <Tag
      ref={ref as Ref<HTMLDivElement>}
      style={{ transitionDuration: `${duration}ms`, transitionDelay: `${delay}ms` }}
      className={`transition-[opacity,translate,scale] ease-reveal ${
        isVisible ? 'translate-y-0 scale-100 opacity-100' : hiddenClasses[variant]
      } ${className}`}
    >
      {children}
    </Tag>
  )
}
