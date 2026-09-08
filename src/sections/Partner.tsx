import { Section, SectionBody, SectionSplit } from '../components/Section'
import { SectionLabel } from '../components/SectionLabel'
import { partner } from '../content/site'
import { useLanguage } from '../i18n/useLanguage'

export function Partner() {
  const { t } = useLanguage()

  return (
    <Section className="py-[clamp(48px,7vw,96px)]">
      <SectionSplit align="start">
        <SectionLabel as="h2">{t(partner.index)}</SectionLabel>
        <SectionBody className="flex flex-wrap items-center gap-x-10 gap-y-6">
          <p className="flex h-[72px] w-[200px] flex-[0_0_200px] items-center justify-center rounded-[4px] border border-ink/14 text-[18px] font-medium tracking-[-.01em] text-ink/70">
            {partner.name}
          </p>
          <p className="max-w-[62ch] text-[16.5px] leading-[1.55] text-ink/70">{t(partner.body)}</p>
        </SectionBody>
      </SectionSplit>
    </Section>
  )
}
