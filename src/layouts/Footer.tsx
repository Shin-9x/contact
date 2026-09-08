import markUrl from '../assets/logo/contact-mark.png'
import { company, footer } from '../content/site'
import { useLanguage } from '../i18n/useLanguage'

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="flex flex-wrap items-end justify-between gap-6 border-t border-ink/10 pt-[clamp(40px,5vw,64px)] pb-10">
      <div className="flex items-center gap-3">
        <img src={markUrl} alt="" width={32} height={32} className="block size-8 object-contain" />
        <p className="text-[13.5px] leading-[1.6] text-ink/60">
          {company.copyright}
          <br />
          {company.vat}
        </p>
      </div>
      <a
        href="#top"
        className="font-mono text-[11px] tracking-[.14em] text-ink/50 uppercase transition-colors duration-200 hover:text-accent"
      >
        {t(footer.backToTop)}
      </a>
    </footer>
  )
}
