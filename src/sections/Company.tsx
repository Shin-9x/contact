import { Reveal } from '../components/Reveal'
import { Section, SectionBody, SectionSplit } from '../components/Section'
import { SectionLabel } from '../components/SectionLabel'
import { companySection } from '../content/site'
import { useLanguage } from '../i18n/useLanguage'

export function Company() {
  const { t } = useLanguage()

  return (
    <Section id="azienda" className="py-[clamp(56px,8vw,112px)]">
      <SectionSplit>
        <SectionLabel as="h2">{t(companySection.index)}</SectionLabel>
        <SectionBody>
          <Reveal>
            <blockquote className="max-w-[26ch] text-[clamp(24px,2.8vw,38px)] leading-[1.14] font-medium tracking-[-.025em] text-pretty">
              {t(companySection.quote)}
            </blockquote>
            <div className="mt-[clamp(40px,5vw,64px)] grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-8 border-t border-ink/10 pt-8">
              {companySection.points.map((point) => (
                <p key={point.it} className="text-[16px] leading-[1.55] text-ink/68">
                  {t(point)}
                </p>
              ))}
            </div>
          </Reveal>
        </SectionBody>
      </SectionSplit>
    </Section>
  )
}
