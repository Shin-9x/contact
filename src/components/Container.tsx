import type { ReactNode } from 'react'

/** The 1440px design canvas with its fluid 20px → 64px gutter. */
export function Container({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-shell px-[clamp(20px,4vw,64px)]">{children}</div>
}
