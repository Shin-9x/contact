import { Fragment } from 'react'
import { ArrowGlyph, ButtonLink } from '../components/Button'
import { Reveal } from '../components/Reveal'
import { hero } from '../content/site'
import { useLanguage } from '../i18n/useLanguage'
import { useEnquiryType } from '../enquiry/useEnquiryType'

export function Hero() {
  const { t } = useLanguage()
  const { selectType } = useEnquiryType()

  return (
    <section id="top" className="pt-[clamp(56px,9vw,128px)] pb-[clamp(40px,6vw,88px)]">
      <div className="scroll-exit-drift flex flex-wrap items-end gap-x-[56px] gap-y-10">
        <div className="min-w-0 flex-[1_1_min(100%,480px)]">
          {/* Above the fold, so these reveal on load: same transition, staggered by 80ms. */}
          <Reveal>
            {/* Each "—" segment is kept whole and the lines are balanced, so on phones the line
                breaks at a separator instead of stranding "2010" on its own. */}
            <p className="mb-[clamp(20px,3vw,36px)] font-mono text-[clamp(10px,1.1vw,11.5px)] tracking-[.18em] text-balance text-ink/45 uppercase">
              {t(hero.eyebrow)
                .split(' — ')
                .map((segment, index, segments) => (
                  <Fragment key={segment}>
                    <span className="whitespace-nowrap">
                      {segment}
                      {index < segments.length - 1 && ' —'}
                    </span>
                    {/* The breakable space lives outside the nowrap span. */}
                    {index < segments.length - 1 && ' '}
                  </Fragment>
                ))}
            </p>
          </Reveal>
          <Reveal delay={60} duration={560}>
            <h1 className="max-w-[17ch] text-[clamp(34px,5.4vw,76px)] leading-none font-medium tracking-[-.03em] text-balance">
              {t(hero.title)}
            </h1>
          </Reveal>
          <Reveal delay={130}>
            <p className="mt-[clamp(28px,4vw,44px)] max-w-[52ch] text-[clamp(16.5px,1.2vw,19px)] leading-[1.5] text-ink/68 text-pretty">
              {t(hero.body)}
            </p>
          </Reveal>
          <Reveal delay={190}>
            <div className="mt-[clamp(32px,4vw,48px)] flex flex-wrap gap-3">
              <ButtonLink
                href="#contatti"
                onClick={() => selectType('business')}
                variant="primary"
                size="lg"
              >
                <span>{t(hero.primaryCta)}</span>
                <ArrowGlyph />
              </ButtonLink>
              <ButtonLink
                href="#candidatura"
                onClick={() => selectType('candidate')}
                variant="secondary"
                size="lg"
                className="font-normal"
              >
                <span>{t(hero.secondaryCta)}</span>
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        <dl className="flex max-w-[320px] flex-[1_1_220px] flex-col gap-[26px] border-l border-ink/12 pl-[26px]">
          {hero.facts.map((fact, index) => (
            <Reveal key={fact.value} delay={240 + index * 70}>
              <dt className="font-mono text-[10.5px] tracking-[.16em] text-ink/45 uppercase">
                {t(fact.term)}
              </dt>
              <dd
                className={
                  fact.lead
                    ? 'mt-2 text-[30px] tracking-[-.02em]'
                    : 'mt-2 text-[19px] leading-[1.3]'
                }
              >
                {fact.value}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}
