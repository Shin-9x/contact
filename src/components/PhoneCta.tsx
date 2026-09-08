import { ButtonLink, type ButtonSize } from './Button'
import { company } from '../content/site'

/** Ink pill with the lime status dot — the header's always-visible call action. */
export function PhoneCta({ size = 'xs', className = '' }: { size?: ButtonSize; className?: string }) {
  return (
    <ButtonLink href={company.phoneHref} variant="ink" size={size} className={className}>
      <span aria-hidden="true" className="block size-1.5 rounded-full bg-lime" />
      <span>{company.phone}</span>
    </ButtonLink>
  )
}
