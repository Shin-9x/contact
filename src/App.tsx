import { SiteLayout } from './layouts/SiteLayout'
import { HomePage } from './pages/HomePage'
import { LanguageProvider } from './i18n/LanguageProvider'

export default function App() {
  return (
    <LanguageProvider>
      <SiteLayout>
        <HomePage />
      </SiteLayout>
    </LanguageProvider>
  )
}
