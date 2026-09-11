import { Reveal } from '../components/Reveal'
import { Section, SectionBody, SectionSplit } from '../components/Section'
import { SectionLabel } from '../components/SectionLabel'
import { method } from '../content/site'
import { useLanguage } from '../i18n/useLanguage'

export function Method() {
  const { t } = useLanguage()

  return (
    <Section id="metodo" className="py-[clamp(56px,8vw,112px)]">
      <SectionSplit>
        <SectionLabel sticky as="h2">{t(method.index)}</SectionLabel>
        <SectionBody className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-x-10 gap-y-9">
          {method.steps.map((step, index) => (
            <Reveal key={step.letter} delay={index * 60}>
              <span aria-hidden="true" className="font-mono text-[11px] text-ink/45">
                {step.letter}
              </span>
              <h3 className="mt-3 mb-[10px] text-[22px] font-medium tracking-[-.02em]">
                {t(step.title)}
              </h3>
              <p className="text-[15.5px] leading-[1.55] text-ink/66">{t(step.body)}</p>
            </Reveal>
          ))}
        </SectionBody>
      </SectionSplit>
    </Section>
  )
}
