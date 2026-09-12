import { ButtonLink, type ButtonSize } from './Button'
import { WhatsAppIcon } from './Icons'
import { company, contact } from '../content/site'
import { useLanguage } from '../i18n/useLanguage'

/** Companion of PhoneCta in the top bar: same ink chip, WhatsApp logo instead of the status dot. */
export function WhatsAppCta({ size = 'xs', className = '' }: { size?: ButtonSize; className?: string }) {
  const { t } = useLanguage()

  return (
    <ButtonLink
      href={company.whatsappHref}
      target="_blank"
      rel="noreferrer noopener"
      variant="utility"
      size={size}
      className={className}
    >
      <WhatsAppIcon className="size-4 shrink-0" />
      <span>WhatsApp</span>
      <span className="sr-only"> {t(contact.online.newTab)}</span>
    </ButtonLink>
  )
}
