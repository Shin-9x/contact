import { Reveal } from '../components/Reveal'
import { privacy, type PrivacyBlock } from '../content/privacy'
import { useLanguage } from '../i18n/useLanguage'

function Blocks({ blocks }: { blocks: PrivacyBlock[] }) {
  const { t } = useLanguage()

  return (
    <div className="grid gap-4 text-[16.5px] leading-[1.65] text-ink/80">
      {blocks.map((block, index) =>
        block.kind === 'paragraph' ? (
          <p key={index}>{t(block.text)}</p>
        ) : (
          <ul key={index} className="grid gap-3">
            {block.items.map((item, itemIndex) => (
              <li key={itemIndex} className="relative pl-6">
                <span aria-hidden="true" className="absolute top-[9px] left-0 block size-[6px] rounded-full bg-accent" />
                {t(item)}
              </li>
            ))}
          </ul>
        ),
      )}
    </div>
  )
}

export function PrivacyPage() {
  const { t } = useLanguage()

  return (
    <article className="pb-[clamp(56px,8vw,112px)]">
      <header className="py-[clamp(48px,7vw,96px)]">
        <p className="font-mono text-[11px] tracking-[.16em] text-ink/45 uppercase">
          {t(privacy.eyebrow)}
        </p>
        <h1 className="mt-5 max-w-[18ch] text-[clamp(34px,5vw,64px)] leading-[1.02] font-medium tracking-[-.035em]">
          {t(privacy.title)}
        </h1>
        <p className="mt-8 max-w-[62ch] text-[17.5px] leading-[1.65] text-ink/70">
          {t(privacy.intro)}
        </p>
        <p className="mt-6 font-mono text-[11px] tracking-[.14em] text-ink/40 uppercase">
          {t(privacy.updated)}
        </p>
      </header>

      {privacy.sections.map((section) => (
        <Reveal key={section.number}>
          <section
            aria-labelledby={`privacy-${section.number}`}
            className="border-t border-ink/10 py-[clamp(32px,4vw,56px)]"
          >
            <div className="flex flex-wrap gap-x-[56px] gap-y-5">
              <p className="w-[120px] shrink-0 pt-[5px] font-mono text-[11px] tracking-[.16em] text-ink/45 uppercase">
                {section.number}
              </p>
              {/* Capped for readability: legal text is unpleasant in very long lines. */}
              <div className="min-w-0 max-w-[70ch] flex-[1_1_min(100%,420px)]">
                <h2
                  id={`privacy-${section.number}`}
                  className="mb-5 text-[clamp(22px,2.4vw,30px)] leading-[1.2] font-medium tracking-[-.02em]"
                >
                  {t(section.heading)}
                </h2>
                <Blocks blocks={section.blocks} />
              </div>
            </div>
          </section>
        </Reveal>
      ))}
    </article>
  )
}
