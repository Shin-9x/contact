import type { ReactNode } from 'react'
import { Container } from '../components/Container'
import { Header } from './Header'
import { Footer } from './Footer'
import { ui } from '../content/site'
import { useLanguage } from '../i18n/useLanguage'

export function SiteLayout({ children }: { children: ReactNode }) {
  const { t } = useLanguage()

  return (
    <Container>
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-paper"
      >
        {t(ui.skipToContent)}
      </a>
      <Header />
      <main>{children}</main>
      <Footer />
    </Container>
  )
}
