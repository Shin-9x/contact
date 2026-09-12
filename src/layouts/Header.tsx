import { useEffect, useId, useState } from 'react'
import { Logo } from '../components/Logo'
import { PhoneCta } from '../components/PhoneCta'
import { WhatsAppCta } from '../components/WhatsAppCta'
import { LanguageToggle } from '../components/LanguageToggle'
import { navigation, ui } from '../content/site'
import { useLanguage } from '../i18n/useLanguage'
import { useScrollState } from '../hooks/useScrollState'
import { useActiveSection } from '../hooks/useActiveSection'

const sectionIds = navigation.map((item) => item.href.replace('#', ''))
const noSections: string[] = []

/** `standalone` prefixes every anchor with the home page, for pages other than the home. */
export function Header({ standalone = false }: { standalone?: boolean }) {
  const { t } = useLanguage()
  const home = standalone ? './' : '#top'
  const anchor = (hash: string) => (standalone ? `./${hash}` : hash)
  const [isMenuOpen, setMenuOpen] = useState(false)
  const menuId = useId()
  const { progressRef, isScrolled } = useScrollState<HTMLSpanElement>()
  // On pages other than the home there are no sections to follow.
  const activeId = useActiveSection(standalone ? noSections : sectionIds)

  useEffect(() => {
    if (!isMenuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isMenuOpen])

  return (
    <header
      className={`sticky top-0 z-40 border-b border-ink/8 backdrop-blur-[10px] transition-[background-color,box-shadow] duration-300 ease-soft ${
        isScrolled ? 'bg-paper/94 shadow-header' : 'bg-paper/88'
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-x-[28px] gap-y-[10px] py-[14px]">
        <a href={home} onClick={() => setMenuOpen(false)} className="group/logo">
          <Logo />
        </a>

        <nav aria-label={t(ui.mainMenu)} className="hidden lg:flex lg:flex-wrap lg:items-center lg:gap-x-[26px] lg:gap-y-3 lg:text-[14.5px]">
          {navigation.map((item) => {
            const isCurrent = activeId === item.href.replace('#', '')
            return (
              <a
                key={item.href}
                href={anchor(item.href)}
                aria-current={isCurrent ? 'location' : undefined}
                className={`link-underline transition-colors duration-200 hover:text-accent-deep ${
                  isCurrent ? 'text-accent-deep' : ''
                }`}
              >
                {t(item.label)}
              </a>
            )
          })}
        </nav>

        <div className="hidden items-center gap-x-[14px] gap-y-[10px] lg:flex lg:flex-wrap">
          <LanguageToggle />
          <PhoneCta />
          {/* Below xl the top bar is 7px short of room for a third chip; the mobile panel and
              the contact section still offer WhatsApp there. */}
          <WhatsAppCta className="max-xl:hidden" />
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
              className={`absolute left-0 block h-px w-full bg-ink transition-[top,transform] duration-300 ease-soft ${
                isMenuOpen ? 'top-[5px] rotate-45' : 'top-0'
              }`}
            />
            <span
              className={`absolute left-0 block h-px w-full bg-ink transition-[top,transform] duration-300 ease-soft ${
                isMenuOpen ? 'top-[5px] -rotate-45' : 'top-[10px]'
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile panel: height animated through a 0fr → 1fr grid row, so it opens and
          closes smoothly without a fixed height. */}
      <div
        id={menuId}
        inert={!isMenuOpen}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-soft lg:hidden ${
          isMenuOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="border-t border-ink/10 pb-6">
            <nav aria-label={t(ui.mobileMenu)} className="flex flex-col">
              {navigation.map((item) => {
                const isCurrent = activeId === item.href.replace('#', '')
                return (
                  <a
                    key={item.href}
                    href={anchor(item.href)}
                    onClick={() => setMenuOpen(false)}
                    aria-current={isCurrent ? 'location' : undefined}
                    className={`border-b border-ink/10 py-4 text-[17px] transition-colors duration-200 hover:text-accent-deep ${
                      isCurrent ? 'text-accent-deep' : ''
                    }`}
                  >
                    {t(item.label)}
                  </a>
                )
              })}
            </nav>
            {/* Language sits in the list as one more row, so the two contact actions below can
                take the full width: stacked on phones, side by side from sm. */}
            <div className="flex items-center justify-between border-b border-ink/10 py-3">
              <span className="font-mono text-[11px] tracking-[.16em] text-ink/45 uppercase">
                {t(ui.language)}
              </span>
              <LanguageToggle />
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <PhoneCta size="md" className="w-full justify-center" />
              <WhatsAppCta size="md" className="w-full justify-center" />
            </div>
          </div>
        </div>
      </div>

      {/* Reading progress: one hairline, scaled from the scroll position each frame. */}
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-[-1px] h-[2px] overflow-hidden">
        <span
          ref={progressRef}
          style={{ transform: 'scaleX(0)' }}
          className="block h-full w-full origin-left bg-accent"
        />
      </span>
    </header>
  )
}
