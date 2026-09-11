import { useEffect, useRef } from 'react'

/**
 * Shifts an element against the scroll by at most `strength` pixels while its
 * container is on screen. Writes the `translate` property (not `transform`), so a
 * CSS `scale` transition on the same element keeps working; skipped outright when
 * the visitor asks for reduced motion.
 */
export function useParallax<T extends HTMLElement = HTMLImageElement>(strength = 18) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    let isOnScreen = true

    const measure = () => {
      frame = 0
      if (!isOnScreen) return
      const box = element.getBoundingClientRect()
      const middle = box.top + box.height / 2
      // -1 when the element sits above the viewport, 1 when below, 0 dead centre.
      const distance = (middle - window.innerHeight / 2) / (window.innerHeight / 2 + box.height / 2)
      element.style.translate = `0 ${(distance * strength).toFixed(2)}px`
    }

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(measure)
    }

    const observer =
      'IntersectionObserver' in window
        ? new IntersectionObserver(
            ([entry]) => {
              isOnScreen = entry.isIntersecting
              if (isOnScreen) schedule()
            },
            { rootMargin: '20% 0px' },
          )
        : null
    observer?.observe(element)

    measure()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule, { passive: true })

    return () => {
      observer?.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [strength])

  return ref
}
