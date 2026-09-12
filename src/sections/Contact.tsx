import type { ReactNode } from 'react'
import { ContactForm } from '../components/ContactForm'
import { Reveal } from '../components/Reveal'
import { FacebookIcon, GlobeIcon, MailIcon, PecIcon, WhatsAppIcon } from '../components/Icons'
import { Section } from '../components/Section'
import { company, contact } from '../content/site'
import { useLanguage } from '../i18n/useLanguage'

const rowClasses =
  'grid grid-cols-[minmax(0,130px)_minmax(0,1fr)] gap-x-4 gap-y-1'
const termBase = 'font-mono text-[10.5px] tracking-[.16em] text-ink/45 uppercase'
const termClasses = `pt-[5px] ${termBase}`
const linkClasses = 'transition-colors duration-200 hover:text-accent-deep'

const chipClasses =
  'flex size-9 shrink-0 items-center justify-center rounded-full border border-ink/15 transition-colors duration-200 group-hover:border-accent-deep group-hover:bg-accent-deep group-hover:text-white'

interface OnlineLinkProps {
  href: string
  icon: ReactNode
  children: ReactNode
  external?: boolean
  newTabNote?: string
}

function OnlineLink({ href, icon, children, external = false, newTabNote }: OnlineLinkProps) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
      className="group inline-flex max-w-full items-center gap-3 text-[17px] leading-[1.3]"
    >
      {icon}
      <span className="min-w-0 [overflow-wrap:anywhere]">
        <span className="underline decoration-ink/25 underline-offset-4 transition-colors duration-200 group-hover:text-accent-deep group-hover:decoration-accent-deep">
          {children}
        </span>
        {external && (
          <>
            <span
              aria-hidden="true"
              className="ml-2 inline-block font-mono text-[14px] text-ink/40 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-deep"
            >
              ↗
            </span>
            {newTabNote && <span className="sr-only"> {newTabNote}</span>}
          </>
        )}
      </span>
    </a>
  )
}

export function Contact() {
  const { t } = useLanguage()

  return (
    <Section id="contatti" className="py-[clamp(56px,8vw,112px)]" labelledBy="contatti-title">
      {/* Second anchor of the same section: opens the form on the application tab. */}
      <span id="candidatura" aria-hidden="true" className="block" />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,360px),1fr))] items-start gap-[clamp(40px,6vw,88px)]">
        <Reveal>
          <h2
            id="contatti-title"
            className="text-[clamp(30px,3.8vw,52px)] leading-none font-medium tracking-[-.035em] whitespace-pre-line text-balance"
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
              <dt className={termClasses}>{t(contact.labels.mobile)}</dt>
              <dd className="text-[21px] tracking-[-.01em]">
                <a href={company.mobileHref} className={linkClasses}>
                  {company.mobile}
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
              <dt className={`pt-[12px] ${termBase}`}>{t(contact.labels.online)}</dt>
              <dd>
                <ul className="grid gap-3">
                  <li>
                    <OnlineLink
                      href={company.website.href}
                      icon={
                        <span className={chipClasses}>
                          <GlobeIcon className="size-[18px]" />
                        </span>
                      }
                    >
                      <span className="sr-only">{t(contact.online.website)}: </span>
                      {company.website.label}
                    </OnlineLink>
                  </li>
                  {company.email && (
                    <li>
                      <OnlineLink
                        href={`mailto:${company.email}`}
                        icon={
                          <span className={chipClasses}>
                            <MailIcon className="size-[18px]" />
                          </span>
                        }
                      >
                        <span className="sr-only">{t(contact.online.email)}: </span>
                        {company.email}
                      </OnlineLink>
                    </li>
                  )}
                  {company.pec && (
                    <li>
                      <OnlineLink
                        href={`mailto:${company.pec}`}
                        icon={
                          <span className={chipClasses}>
                            <PecIcon className="size-[18px]" />
                          </span>
                        }
                      >
                        <span className="sr-only">{t(contact.online.pec)}: </span>
                        {company.pec}
                      </OnlineLink>
                    </li>
                  )}
                  <li>
                    <OnlineLink
                      href={company.facebook.href}
                      external
                      newTabNote={t(contact.online.newTab)}
                      icon={
                        // A filled disc reads larger than an outlined one of the same size, so the
                        // logo is drawn a little smaller inside the same 36px slot as the other chips.
                        <span className="flex size-9 shrink-0 items-center justify-center">
                          <FacebookIcon className="size-[30px] transition-transform duration-200 group-hover:scale-110" />
                        </span>
                      }
                    >
                      {t(contact.online.facebook)}
                    </OnlineLink>
                  </li>
                  {company.whatsapp && (
                    <li>
                      <OnlineLink
                        href={company.whatsappHref}
                        external
                        newTabNote={t(contact.online.newTab)}
                        icon={
                          // Same optical sizing as the Facebook logo above.
                          <span className="flex size-9 shrink-0 items-center justify-center">
                            <WhatsAppIcon className="size-[30px] transition-transform duration-200 group-hover:scale-110" />
                          </span>
                        }
                      >
                        {t(contact.online.whatsapp)}
                      </OnlineLink>
                    </li>
                  )}
                </ul>
              </dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={100}>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  )
}
