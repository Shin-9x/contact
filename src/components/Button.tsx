import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

export type ButtonVariant = 'accent' | 'ink' | 'paper' | 'outline' | 'outlineOnWhite'
export type ButtonSize = 'lg' | 'md' | 'sm' | 'xs'

const variantClasses: Record<ButtonVariant, string> = {
  accent: 'bg-accent text-white hover:bg-ink',
  ink: 'bg-ink text-paper hover:bg-accent hover:text-white',
  paper: 'bg-paper text-ink hover:bg-lime',
  outline: 'border border-ink/20 text-ink hover:border-ink hover:bg-white',
  outlineOnWhite: 'border border-ink/20 text-ink hover:border-ink hover:bg-paper',
}

const sizeClasses: Record<ButtonSize, string> = {
  lg: 'px-[26px] py-[15px] text-[15.5px] font-medium',
  md: 'px-[26px] py-[14px] text-[15.5px] font-medium',
  sm: 'px-[22px] py-[13px] text-[15px] font-medium',
  xs: 'px-5 py-[11px] text-[14px] font-medium',
}

const base =
  'inline-flex cursor-pointer items-center gap-[10px] rounded-full transition-colors duration-200'

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
  variant = 'accent',
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
  variant = 'accent',
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
    <span aria-hidden="true" className="font-mono">
      →
    </span>
  )
}
