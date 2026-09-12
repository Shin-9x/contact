import type { ReactNode } from 'react'
import { siFacebook } from 'simple-icons'

interface IconProps {
  className?: string
}

function LineIcon({ className = '', children }: IconProps & { children: ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {children}
    </svg>
  )
}

export function GlobeIcon({ className }: IconProps) {
  return (
    <LineIcon className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z" />
    </LineIcon>
  )
}

export function MailIcon({ className }: IconProps) {
  return (
    <LineIcon className={className}>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </LineIcon>
  )
}

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill={`#${siFacebook.hex}`} className={className}>
      <path d={siFacebook.path} />
    </svg>
  )
}

export function PecIcon({ className }: IconProps) {
  return (
    <LineIcon className={className}>
      <path d="M13.5 16H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5.5" />
      <path d="m3.5 6.5 7.5 5.25 7.5-5.25" />
      <circle cx="18.5" cy="17.5" r="3.5" />
      <path d="m16.9 17.6 1.1 1.1 2.1-2.2" />
    </LineIcon>
  )
}
