import markUrl from '../assets/logo/contact-mark.png'
import { company } from '../content/site'
import { useLanguage } from '../i18n/useLanguage'

interface LogoProps {
  /** Rendered pixel size of the square mark. */
  size?: number
  className?: string
}

export function Logo({ size = 40, className = '' }: LogoProps) {
  const { t } = useLanguage()

  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <img
        src={markUrl}
        alt=""
        width={size}
        height={size}
        className="block object-contain transition-transform duration-300 ease-soft group-hover/logo:scale-105"
        style={{ width: size, height: size }}
      />
      <span className="flex flex-col leading-none">
        <span className="text-[19px] font-bold tracking-[-.02em]">CONTACT</span>
        <span className="mt-1 font-mono text-[9px] tracking-[.18em] text-ink/50 uppercase transition-colors duration-300 group-hover/logo:text-accent-deep">
          {t(company.tagline)}
        </span>
      </span>
    </span>
  )
}
