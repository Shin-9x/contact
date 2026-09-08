import { ContactForm } from '../components/ContactForm'
import { Section } from '../components/Section'
import { company, contact } from '../content/site'
import { useLanguage } from '../i18n/useLanguage'

const rowClasses =
  'grid grid-cols-[minmax(0,130px)_minmax(0,1fr)] gap-x-4 gap-y-1'
const termClasses =
  'pt-[5px] font-mono text-[10.5px] tracking-[.16em] text-ink/45 uppercase'
const linkClasses = 'transition-colors duration-200 hover:text-accent'

export function Contact() {
  const { t } = useLanguage()

  return (
    <Section id="contatti" className="py-[clamp(56px,8vw,112px)]" labelledBy="contatti-title">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,360px),1fr))] items-start gap-[clamp(40px,6vw,88px)]">
        <div>
          <h2
            id="contatti-title"
            className="max-w-[16ch] text-[clamp(30px,3.8vw,52px)] leading-none font-medium tracking-[-.035em]"
          >
            {t(contact.title)}
          </h2>
          <dl className="mt-[clamp(36px,4vw,56px)] grid gap-6">
            <div className={`${rowClasses} border-b border-ink/10 pb-5`}>
              <dt className={termClasses}>{t(contact.labels.phone)}</dt>
              <dd className="text-[21px] tracking-[-.01em]">
                <a href={company.phoneHref} className={linkClasses}>
                  {company.phone}
                </a>
              </dd>
            </div>
            <div className={`${rowClasses} border-b border-ink/10 pb-5`}>
              <dt className={termClasses}>{t(contact.labels.office)}</dt>
              <dd className="text-[17px] leading-[1.5]">
                {company.address[0]}
                <br />
                {company.address[1]}
              </dd>
            </div>
            <div className={rowClasses}>
              <dt className={termClasses}>{t(contact.labels.online)}</dt>
              <dd className="text-[17px] leading-[1.6]">
                <a href={company.website.href} className={linkClasses}>
                  {company.website.label}
                </a>
                <br />
                <a
                  href={company.facebook.href}
                  className={linkClasses}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {company.facebook.label}
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <ContactForm />
      </div>
    </Section>
  )
}
