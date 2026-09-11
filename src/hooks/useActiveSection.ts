import { useEffect, useState } from 'react'

/**
 * Id of the section currently crossing the middle of the viewport, for the header's
 * current-page marker. The root margin leaves a thin band across the centre of the
 * screen: a section counts as current only while it passes through that band.
 */
export function useActiveSection(ids: readonly string[]) {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return

    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null)
    if (targets.length === 0) return

    const inBand = new Set<string>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) inBand.add(entry.target.id)
          else inBand.delete(entry.target.id)
        }
        // Page order wins when two short sections share the band.
        setActiveId(ids.find((id) => inBand.has(id)) ?? null)
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    targets.forEach((target) => observer.observe(target))

    return () => observer.disconnect()
  }, [ids])

  return activeId
}
