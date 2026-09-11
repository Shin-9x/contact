import { useEffect, useRef, useState } from 'react'

interface RevealOptions {
  /** How far into the viewport the element has to travel before it reveals. */
  rootMargin?: string
}

/**
 * Mirrors the design's `[data-reveal]` behaviour: elements fade and slide in once,
 * the first time they enter the viewport.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>({
  rootMargin = '0px 0px -12% 0px',
}: RevealOptions = {}) {
  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin },
    )
    observer.observe(element)

    // Safety net from the design: never leave content hidden. It only covers elements
    // already on screen, so anything further down still reveals when it is reached.
    const fallback = window.setTimeout(() => {
      const box = element.getBoundingClientRect()
      if (box.top < window.innerHeight && box.bottom > 0) setIsVisible(true)
    }, 1600)

    return () => {
      observer.disconnect()
      window.clearTimeout(fallback)
    }
  }, [rootMargin])

  return { ref, isVisible }
}
