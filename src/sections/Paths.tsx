import { ArrowGlyph, ButtonLink } from '../components/Button'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { paths } from '../content/site'
import { useLanguage } from '../i18n/useLanguage'
import { useEnquiryType } from '../enquiry/useEnquiryType'

/* Both cards lift on hover; the ink one also warms up with an accent glow in the corner. */
const cardBase =
  'group relative flex h-full min-h-[300px] flex-col gap-5 overflow-hidden rounded-card p-[clamp(28px,3.5vw,48px)] ' +
  'transition-[translate,box-shadow,border-color] duration-400 ease-soft hover:-translate-y-1 hover:shadow-card'

export function Paths() {
  const { t } = useLanguage()
  const { selectType } = useEnquiryType()

  return (
    <Section id="percorsi" className="py-[clamp(56px,8vw,112px)]">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-6">
        <Reveal as="article">
          <div className={`${cardBase} bg-ink text-paper`}>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-40 -right-32 size-96 rounded-full bg-[radial-gradient(circle,rgb(11_142_207/0.38),transparent_58%)] opacity-0 transition-opacity duration-500 ease-soft group-hover:opacity-100"
            />
            <p className="relative font-mono text-[11px] tracking-[.18em] text-paper/50 uppercase">
              {t(paths.business.eyebrow)}
            </p>
            <h2 className="relative max-w-[20ch] text-[clamp(26px,3vw,38px)] leading-[1.05] font-medium tracking-[-.03em]">
              {t(paths.business.title)}
            </h2>
            <p className="relative max-w-[40ch] text-[16px] leading-[1.55] text-paper/72">
              {t(paths.business.body)}
            </p>
            <ButtonLink
              href="#contatti"
              onClick={() => selectType('business')}
              variant="primary"
              size="sm"
              className="relative mt-auto self-start"
            >
              <span>{t(paths.business.cta)}</span>
              <ArrowGlyph />
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal as="article" delay={80}>
          <div className={`${cardBase} border border-ink/12 bg-white hover:border-ink/25`}>
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
              variant="secondary"
              size="sm"
              className="mt-auto self-start"
            >
              <span>{t(paths.careers.cta)}</span>
              <ArrowGlyph />
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
