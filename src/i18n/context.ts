import { createContext } from 'react'
import type { Language, Localized } from './types'

export interface LanguageContextValue {
  language: Language
  /** Resolves a bilingual string to the active language. */
  t: (value: Localized) => string
  toggleLanguage: () => void
}

export const LanguageContext = createContext<LanguageContextValue | null>(null)
