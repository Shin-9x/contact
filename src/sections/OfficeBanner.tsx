import bannerUrl from '../assets/images/sede-operativa.jpg'
import bannerSmallUrl from '../assets/images/sede-operativa-1200.jpg'
import { bannerAlt } from '../content/site'
import { useLanguage } from '../i18n/useLanguage'
import { useReveal } from '../hooks/useReveal'
import { useParallax } from '../hooks/useParallax'

export function OfficeBanner() {
  const { t } = useLanguage()
  const { ref, isVisible } = useReveal<HTMLDivElement>()
  // The image is kept slightly larger than its frame so the parallax shift never
  // uncovers an edge.
  const imageRef = useParallax<HTMLImageElement>(20)

  return (
    <section className="pb-[clamp(48px,7vw,104px)]">
      {/* The diagonal weave is the design's frame texture; it also covers the image while it loads. */}
      <div
        ref={ref}
        className={`relative aspect-[21/8] overflow-hidden rounded-frame bg-[repeating-linear-gradient(115deg,#eceae4_0_12px,#f6f5f1_12px_24px)] transition-opacity duration-500 ease-reveal ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <img
          ref={imageRef}
          src={bannerUrl}
          srcSet={`${bannerSmallUrl} 1200w, ${bannerUrl} 2400w`}
          sizes="(max-width: 1440px) 100vw, 1312px"
          alt={t(bannerAlt)}
          width={2400}
          height={914}
          loading="lazy"
          decoding="async"
          className={`size-full object-cover transition-[scale] duration-[1100ms] ease-reveal ${
            isVisible ? 'scale-[1.12]' : 'scale-[1.22]'
          }`}
        />
        {/* A whisper of paper at the bottom edge, so the photo sits on the page instead of ending. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgb(18_22_26/0.15),transparent_40%)]"
        />
      </div>
    </section>
  )
}
