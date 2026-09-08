import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { LanguageContext } from './context'
import { meta } from '../content/site'
import type { Language, Localized } from './types'

const STORAGE_KEY = 'contactsrl:lang'

function readStoredLanguage(): Language {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'en' ? 'en' : 'it'
  } catch {
    return 'it'
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(readStoredLanguage)

  useEffect(() => {
    document.documentElement.lang = language
    document.title = meta.title[language]
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', meta.description[language])
    try {
      localStorage.setItem(STORAGE_KEY, language)
    } catch {
      // Storage can be unavailable (private browsing); the language still applies.
    }
  }, [language])

  const toggleLanguage = useCallback(
    () => setLanguage((current) => (current === 'it' ? 'en' : 'it')),
    [],
  )

  const value = useMemo(
    () => ({
      language,
      t: (localized: Localized) => localized[language],
      toggleLanguage,
    }),
    [language, toggleLanguage],
  )

  return <LanguageContext value={value}>{children}</LanguageContext>
}
