import { useEffect, useRef, useState } from 'react'

/**
 * Page scroll, read once per animation frame. The progress value is written straight
 * to a DOM node instead of to state, so scrolling never re-renders the header; only
 * the `isScrolled` flag — which changes twice per page — goes through React.
 */
export function useScrollState<T extends HTMLElement = HTMLDivElement>() {
  const progressRef = useRef<T>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    let frame = 0

    const measure = () => {
      frame = 0
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const offset = window.scrollY

      setIsScrolled(offset > 8)
      if (progressRef.current) {
        const progress = scrollable > 0 ? Math.min(1, Math.max(0, offset / scrollable)) : 0
        progressRef.current.style.transform = `scaleX(${progress})`
      }
    }

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule, { passive: true })

    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return { progressRef, isScrolled }
}
