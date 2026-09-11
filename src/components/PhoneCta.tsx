import { ButtonLink, type ButtonSize } from './Button'
import { company } from '../content/site'

/** Ink pill with the lime status dot — the header's always-visible call action. */
export function PhoneCta({ size = 'xs', className = '' }: { size?: ButtonSize; className?: string }) {
  return (
    <ButtonLink href={company.phoneHref} variant="utility" size={size} className={className}>
      <span aria-hidden="true" className="relative block size-1.5">
        <span className="absolute inset-0 rounded-full bg-lime" />
        <span className="absolute inset-0 rounded-full bg-lime animate-dot-pulse" />
      </span>
      <span>{company.phone}</span>
    </ButtonLink>
  )
}
