import { Reveal } from '../components/Reveal'
import { Section, SectionBody, SectionSplit } from '../components/Section'
import { SectionLabel } from '../components/SectionLabel'
import { solutions } from '../content/site'
import { useLanguage } from '../i18n/useLanguage'

export function Solutions() {
  const { t } = useLanguage()

  return (
    <Section id="soluzioni" className="py-[clamp(56px,8vw,112px)]" labelledBy="soluzioni-title">
      <SectionSplit>
        <SectionLabel sticky>{t(solutions.index)}</SectionLabel>
        <SectionBody>
          <Reveal>
            <h2
              id="soluzioni-title"
              className="mb-[clamp(36px,5vw,60px)] max-w-[22ch] text-[clamp(28px,3.4vw,46px)] leading-[1.02] font-medium tracking-[-.03em]"
            >
              {t(solutions.title)}
            </h2>
          </Reveal>
          <ul className="flex list-none flex-col">
            {solutions.items.map((item, index) => (
              <Reveal as="li" key={item.number} delay={index * 50}>
                {/* Hover: the hairline above the row is redrawn in accent, the row lifts
                    off the paper and the title steps aside. */}
                <div
                  className={`group relative grid grid-cols-[40px_minmax(0,1.1fr)] items-start gap-x-6 gap-y-[10px] border-t border-ink/10 py-[26px] transition-[background-color,box-shadow] duration-300 ease-soft hover:bg-white hover:shadow-lift ${
                    index === solutions.items.length - 1 ? 'border-b border-ink/10' : ''
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-[-1px] h-px origin-left scale-x-0 bg-accent transition-transform duration-500 ease-soft group-hover:scale-x-100"
                  />
                  <span aria-hidden="true" className="font-mono text-[12px] text-accent">
                    {item.number}
                  </span>
                  <h3 className="text-[clamp(20px,2.1vw,27px)] font-medium tracking-[-.02em] transition-transform duration-300 ease-soft group-hover:translate-x-[5px]">
                    {t(item.title)}
                  </h3>
                  <p className="col-start-2 col-end-[-1] text-[16px] leading-[1.55] text-ink/68">
                    {t(item.body)}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </SectionBody>
      </SectionSplit>
    </Section>
  )
}
