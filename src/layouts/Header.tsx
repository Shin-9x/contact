import { useEffect, useId, useState } from 'react'
import { Logo } from '../components/Logo'
import { PhoneCta } from '../components/PhoneCta'
import { LanguageToggle } from '../components/LanguageToggle'
import { navigation, ui } from '../content/site'
import { useLanguage } from '../i18n/useLanguage'

export function Header() {
  const { t } = useLanguage()
  const [isMenuOpen, setMenuOpen] = useState(false)
  const menuId = useId()

  useEffect(() => {
    if (!isMenuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isMenuOpen])

  return (
    <header className="sticky top-0 z-40 border-b border-ink/8 bg-paper/88 backdrop-blur-[10px]">
      <div className="flex flex-wrap items-center justify-between gap-x-[28px] gap-y-[10px] py-[14px]">
        <a href="#top" onClick={() => setMenuOpen(false)}>
          <Logo />
        </a>

        <nav aria-label={t(ui.mainMenu)} className="hidden lg:flex lg:flex-wrap lg:items-center lg:gap-x-[26px] lg:gap-y-3 lg:text-[14.5px]">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition-colors duration-200 hover:text-accent"
            >
              {t(item.label)}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-x-[14px] gap-y-[10px] lg:flex lg:flex-wrap">
          <LanguageToggle />
          <PhoneCta />
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-controls={menuId}
          aria-label={isMenuOpen ? t(ui.closeMenu) : t(ui.openMenu)}
          className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-ink/18 transition-colors duration-200 hover:border-ink lg:hidden"
        >
          <span aria-hidden="true" className="relative block h-[11px] w-[18px]">
            <span
              className={`absolute left-0 block h-px w-full bg-ink transition-transform duration-200 ${
                isMenuOpen ? 'top-[5px] rotate-45' : 'top-0'
              }`}
            />
            <span
              className={`absolute left-0 block h-px w-full bg-ink transition-transform duration-200 ${
                isMenuOpen ? 'top-[5px] -rotate-45' : 'top-[10px]'
              }`}
            />
          </span>
        </button>
      </div>

      <div
        id={menuId}
        hidden={!isMenuOpen}
        className="border-t border-ink/10 pb-6 lg:hidden"
      >
        <nav aria-label={t(ui.mobileMenu)} className="flex flex-col">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="border-b border-ink/10 py-4 text-[17px] transition-colors duration-200 hover:text-accent"
            >
              {t(item.label)}
            </a>
          ))}
        </nav>
        <div className="mt-6 flex flex-wrap items-center gap-x-[14px] gap-y-3">
          <LanguageToggle />
          <PhoneCta />
        </div>
      </div>
    </header>
  )
}
