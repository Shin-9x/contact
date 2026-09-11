import markUrl from '../assets/logo/contact-mark.png'
import { company, footer } from '../content/site'
import { privacy } from '../content/privacy'
import { useLanguage } from '../i18n/useLanguage'

export function Footer({ standalone = false }: { standalone?: boolean }) {
  const { t } = useLanguage()

  const linkClasses =
    'link-underline font-mono text-[11px] tracking-[.14em] text-ink/50 uppercase transition-colors duration-200 hover:text-accent'

  return (
    <footer className="flex flex-wrap items-end justify-between gap-6 border-t border-ink/10 pt-[clamp(40px,5vw,64px)] pb-10">
      <div className="flex items-center gap-3">
        <img
          src={markUrl}
          alt=""
          width={32}
          height={32}
          className="block size-8 object-contain"
        />
        <p className="text-[13.5px] leading-[1.6] text-ink/60">
          {company.copyright}
          <br />
          {company.vat}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
        <a href={standalone ? './' : './privacy.html'} className={linkClasses}>
          {standalone ? t(privacy.backToSite) : t(footer.privacy)}
        </a>
        <a href="#top" className={linkClasses}>
          {t(footer.backToTop)}
        </a>
      </div>
    </footer>
  )
}
