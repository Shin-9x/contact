import { ui } from '../content/site'
import { useLanguage } from '../i18n/useLanguage'

export function LanguageToggle({ className = '' }: { className?: string }) {
  const { language, t, toggleLanguage } = useLanguage()

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      aria-label={t(ui.switchLanguage)}
      className={`cursor-pointer rounded-full border border-ink/18 px-3 py-2 font-mono text-[11px] tracking-[.1em] transition-colors duration-200 hover:border-accent hover:text-accent ${className}`}
    >
      {language === 'en' ? 'IT' : 'EN'}
    </button>
  )
}
