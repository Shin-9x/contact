import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SiteLayout } from './layouts/SiteLayout'
import { PrivacyPage } from './pages/PrivacyPage'
import { LanguageProvider } from './i18n/LanguageProvider'
// Self-hosted webfonts: no request leaves the visitor's browser for a third party.
import '@fontsource-variable/schibsted-grotesk'
import '@fontsource-variable/jetbrains-mono'
import './styles/index.css'

const container = document.getElementById('root')
if (!container) throw new Error('Root element #root not found')

createRoot(container).render(
  <StrictMode>
    <LanguageProvider documentTitle="privacy">
      <SiteLayout standalone>
        <PrivacyPage />
      </SiteLayout>
    </LanguageProvider>
  </StrictMode>,
)
