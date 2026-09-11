import bofrostUrl from '../assets/logo/bofrost.svg'
import { Section } from '../components/Section'
import { SectionLabel } from '../components/SectionLabel'
import { partner } from '../content/site'
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
      <div className="grid gap-y-5 md:grid-cols-[200px_minmax(0,1fr)] md:items-center md:gap-x-[56px] md:gap-y-6 lg:grid-cols-[216px_200px_minmax(0,1fr)] lg:gap-x-10">
        <SectionLabel as="h2">{t(partner.index)}</SectionLabel>
        {/* Vector tracing of the bofrost* wordmark, in its own navy on the site's white. */}
        <div className="flex h-[72px] w-[200px] items-center justify-center rounded-[4px] border border-ink/14 bg-white px-7">
          <img
            src={bofrostUrl}
            alt={partner.name}
            width={144}
            height={35}
            loading="lazy"
            className="block h-auto w-full"
          />
        </div>
        <p className="max-w-[62ch] text-[16.5px] leading-[1.55] text-ink/70 md:col-start-2 lg:col-start-auto">
          {t(partner.body)}
        </p>
      </div>
    </Section>
  )
}
