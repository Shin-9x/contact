import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { EnquiryTypeContext } from './context'
import type { EnquiryType } from '../services/enquiryValidation'

/** Anchors that open the contact form on a specific tab, also as shareable links. */
const hashes: Record<string, EnquiryType> = {
  '#contatti': 'business',
  '#candidatura': 'candidate',
}

function typeFromHash(): EnquiryType | null {
  return hashes[window.location.hash] ?? null
}

/**
 * Which tab of the contact form is active. It lives above the form so that calls to
 * action elsewhere on the page can preselect it while the browser scrolls down.
 */
export function EnquiryTypeProvider({ children }: { children: ReactNode }) {
  const [type, selectType] = useState<EnquiryType>(() => typeFromHash() ?? 'business')

  useEffect(() => {
    // Covers deep links opened in an already loaded page, and the back button.
    const onHashChange = () => {
      const next = typeFromHash()
      if (next) selectType(next)
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const value = useMemo(() => ({ type, selectType }), [type])

  return <EnquiryTypeContext value={value}>{children}</EnquiryTypeContext>
}
