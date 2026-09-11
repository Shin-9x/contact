import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { LanguageContext } from './context'
import { meta } from '../content/site'
import { privacy } from '../content/privacy'
import type { Language, Localized } from './types'

const STORAGE_KEY = 'contactsrl:lang'

function readStoredLanguage(): Language {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'en' ? 'en' : 'it'
  } catch {
    return 'it'
  }
}

interface LanguageProviderProps {
  children: ReactNode
  /** Which page's metadata to keep in sync with the active language. */
  documentTitle?: 'home' | 'privacy'
}

export function LanguageProvider({ children, documentTitle = 'home' }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(readStoredLanguage)

  useEffect(() => {
    document.documentElement.lang = language
    if (documentTitle === 'privacy') {
      document.title = `${privacy.title[language]} — ${meta.siteName}`
    } else {
      document.title = meta.title[language]
      document
        .querySelector('meta[name="description"]')
        ?.setAttribute('content', meta.description[language])
    }
    try {
      localStorage.setItem(STORAGE_KEY, language)
    } catch {
      // Storage can be unavailable (private browsing); the language still applies.
    }
  }, [documentTitle, language])

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
