import bofrostUrl from '../assets/logo/bofrost.svg'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { SectionLabel } from '../components/SectionLabel'
import { contact, partner } from '../content/site'
import { useLanguage } from '../i18n/useLanguage'

/**
 * Label, logo and text on one centre line, so the short label no longer floats above
 * the rest. Stacked on phones; on tablets the label sits beside the logo with the
 * text underneath; from desktop all three share a row. The 216px + 40px first column
 * keeps the logo on the same 256px line as the other sections' content.
 */
export function Partner() {
  const { t } = useLanguage()

  return (
    <Section className="py-[clamp(48px,7vw,96px)]">
      <Reveal>
        <div className="grid gap-y-5 md:grid-cols-[200px_minmax(0,1fr)] md:items-center md:gap-x-[56px] md:gap-y-6 lg:grid-cols-[216px_200px_minmax(0,1fr)] lg:gap-x-10">
          <SectionLabel as="h2">{t(partner.index)}</SectionLabel>
          {/* Vector tracing of the bofrost* wordmark, in its own navy on the site's white,
              linking to the partner's own site. */}
          <a
            href={partner.href}
            target="_blank"
            rel="noreferrer noopener"
            className="group relative flex h-[72px] w-[200px] items-center justify-center rounded-[4px] border border-ink/14 bg-white px-7 transition-[translate,box-shadow,border-color] duration-400 ease-soft hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-lift"
          >
            <img
              src={bofrostUrl}
              alt={partner.name}
              width={144}
              height={35}
              loading="lazy"
              className="block h-auto w-full transition-transform duration-400 ease-soft group-hover:scale-[1.03]"
            />
            {/* The same external-link mark the contact links use. */}
            <span
              aria-hidden="true"
              className="absolute top-[6px] right-[8px] font-mono text-[12px] text-ink/35 opacity-0 transition-[opacity,translate] duration-300 ease-soft group-hover:-translate-y-px group-hover:opacity-100 group-focus-visible:opacity-100"
            >
              ↗
            </span>
            <span className="sr-only"> {t(contact.online.newTab)}</span>
          </a>
          <p className="max-w-[62ch] text-[16.5px] leading-[1.55] text-ink/70 md:col-start-2 lg:col-start-auto">
            {t(partner.body)}
          </p>
        </div>
      </Reveal>
    </Section>
  )
}
