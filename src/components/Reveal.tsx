import type { ReactNode } from 'react'
import { useReveal } from '../hooks/useReveal'

interface RevealProps {
  children: ReactNode
  className?: string
}

/** Fade-and-rise on first scroll into view, as in the design's `[data-reveal]`. */
export function Reveal({ children, className = '' }: RevealProps) {
  const { ref, isVisible } = useReveal()

  return (
    <div
      ref={ref}
      className={`transition-[opacity,translate] duration-700 ease-reveal ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  )
}
