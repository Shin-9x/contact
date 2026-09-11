import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

/*
 * Three roles, not five colours:
 *  - primary: the one action a section is asking for, blue on any surface;
 *  - secondary: the alternative beside it, a hairline that borrows the page colour;
 *  - utility: not a call to action at all — the contact chip in the top bar.
 * Hover always deepens the same colour: no hue ever changes under the cursor.
 */
export type ButtonVariant = 'primary' | 'secondary' | 'secondaryOnInk' | 'utility'
export type ButtonSize = 'lg' | 'md' | 'sm' | 'xs'

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-accent-deep text-white hover:bg-accent-deeper',
  secondary: 'border border-ink/22 text-ink hover:border-ink/45 hover:bg-ink/5',
  secondaryOnInk: 'border border-paper/30 text-paper hover:border-paper/60 hover:bg-paper/10',
  utility: 'bg-ink text-paper hover:bg-ink-deep',
}

const sizeClasses: Record<ButtonSize, string> = {
  lg: 'px-[26px] py-[15px] text-[15.5px] font-medium',
  md: 'px-[26px] py-[14px] text-[15.5px] font-medium',
  sm: 'px-[22px] py-[13px] text-[15px] font-medium',
  xs: 'px-5 py-[11px] text-[14px] font-medium',
}

/* The lift is suppressed on disabled buttons so the submit button stays put while sending. */
const base =
  'group/btn inline-flex cursor-pointer items-center gap-[10px] rounded-full ' +
  'transition-[background-color,color,border-color,box-shadow,translate] duration-200 ease-soft ' +
  'hover:not-disabled:-translate-y-px hover:not-disabled:shadow-lift ' +
  'active:not-disabled:translate-y-0 active:not-disabled:duration-75'

function classesFor(variant: ButtonVariant, size: ButtonSize, className: string) {
  return `${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`
}

interface CommonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  children: ReactNode
}

type ButtonLinkProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement>

export function ButtonLink({
  variant = 'primary',
  size = 'lg',
  className = '',
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <a className={classesFor(variant, size, className)} {...props}>
      {children}
    </a>
  )
}

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement>

export function Button({
  variant = 'primary',
  size = 'lg',
  className = '',
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button type={type} className={classesFor(variant, size, className)} {...props}>
      {children}
    </button>
  )
}

/** The mono arrow that trails most calls to action in the design. */
export function ArrowGlyph() {
  return (
    <span
      aria-hidden="true"
      className="font-mono transition-transform duration-300 ease-soft group-hover/btn:translate-x-[3px]"
    >
      →
    </span>
  )
}
