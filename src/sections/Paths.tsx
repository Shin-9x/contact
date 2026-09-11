import { ArrowGlyph, ButtonLink } from '../components/Button'
import { Section } from '../components/Section'
import { paths } from '../content/site'
import { useLanguage } from '../i18n/useLanguage'
import { useEnquiryType } from '../enquiry/useEnquiryType'

export function Paths() {
  const { t } = useLanguage()
  const { selectType } = useEnquiryType()

  return (
    <Section id="percorsi" className="py-[clamp(56px,8vw,112px)]">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-6">
        <article className="flex min-h-[300px] flex-col gap-5 rounded-card bg-ink p-[clamp(28px,3.5vw,48px)] text-paper">
          <p className="font-mono text-[11px] tracking-[.18em] text-paper/50 uppercase">
            {t(paths.business.eyebrow)}
          </p>
          <h2 className="max-w-[20ch] text-[clamp(26px,3vw,38px)] leading-[1.05] font-medium tracking-[-.03em]">
            {t(paths.business.title)}
          </h2>
          <p className="max-w-[40ch] text-[16px] leading-[1.55] text-paper/72">
            {t(paths.business.body)}
          </p>
          <ButtonLink
            href="#contatti"
            onClick={() => selectType('business')}
            variant="paper"
            size="sm"
            className="mt-auto self-start"
          >
            <span>{t(paths.business.cta)}</span>
            <ArrowGlyph />
          </ButtonLink>
        </article>

        <article className="flex min-h-[300px] flex-col gap-5 rounded-card border border-ink/12 bg-white p-[clamp(28px,3.5vw,48px)]">
          <p className="font-mono text-[11px] tracking-[.18em] text-ink/45 uppercase">
            {t(paths.careers.eyebrow)}
          </p>
          <h2 className="max-w-[20ch] text-[clamp(26px,3vw,38px)] leading-[1.05] font-medium tracking-[-.03em]">
            {t(paths.careers.title)}
          </h2>
          <p className="max-w-[40ch] text-[16px] leading-[1.55] text-ink/68">
            {t(paths.careers.body)}
          </p>
          <ButtonLink
            href="#candidatura"
            onClick={() => selectType('candidate')}
            variant="outlineOnWhite"
            size="sm"
            className="mt-auto self-start"
          >
            <span>{t(paths.careers.cta)}</span>
            <ArrowGlyph />
          </ButtonLink>
        </article>
      </div>
    </Section>
  )
}
