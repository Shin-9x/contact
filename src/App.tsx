import { SiteLayout } from './layouts/SiteLayout'
import { HomePage } from './pages/HomePage'
import { LanguageProvider } from './i18n/LanguageProvider'
import { EnquiryTypeProvider } from './enquiry/EnquiryTypeProvider'

export default function App() {
  return (
    <LanguageProvider>
      <EnquiryTypeProvider>
        <SiteLayout>
          <HomePage />
        </SiteLayout>
      </EnquiryTypeProvider>
    </LanguageProvider>
  )
}
