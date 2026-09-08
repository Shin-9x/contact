import bannerUrl from '../assets/images/sede-operativa.jpg'
import bannerSmallUrl from '../assets/images/sede-operativa-1200.jpg'
import { bannerAlt } from '../content/site'
import { useLanguage } from '../i18n/useLanguage'

export function OfficeBanner() {
  const { t } = useLanguage()

  return (
    <section className="pb-[clamp(48px,7vw,104px)]">
      {/* The diagonal weave is the design's frame texture; it also covers the image while it loads. */}
      <div className="relative aspect-[21/8] overflow-hidden rounded-frame bg-[repeating-linear-gradient(115deg,#eceae4_0_12px,#f6f5f1_12px_24px)]">
        <img
          src={bannerUrl}
          srcSet={`${bannerSmallUrl} 1200w, ${bannerUrl} 2400w`}
          sizes="(max-width: 1440px) 100vw, 1312px"
          alt={t(bannerAlt)}
          width={2400}
          height={914}
          loading="lazy"
          decoding="async"
          className="size-full object-cover"
        />
      </div>
    </section>
  )
}
