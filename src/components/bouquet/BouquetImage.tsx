import { useState } from 'react'
import { COPY } from '../../content/copy'
import type { PreloadStatus } from '../../hooks/useBouquetPreload'
import { BOUQUET_ASSET, BOUQUET_SIZES } from '../../lib/bouquetAsset'
import { BouquetSvg } from './BouquetSvg'

/** Raster bouquet when available and loaded; otherwise the SVG bouquet. Never a broken image. */
export function BouquetImage({ status }: { status: PreloadStatus }) {
  const [failed, setFailed] = useState(false)

  if (!BOUQUET_ASSET || status === 'error' || failed) return <BouquetSvg />

  return (
    <picture>
      {BOUQUET_ASSET.sources.map((s) => (
        <source key={s.type} type={s.type} srcSet={s.srcSet} sizes={BOUQUET_SIZES} />
      ))}
      <img
        src={BOUQUET_ASSET.fallbackSrc}
        alt={COPY.bouquetAlt}
        width={400}
        height={520}
        decoding="async"
        fetchPriority="high"
        draggable={false}
        onError={() => setFailed(true)}
        className="h-full w-full select-none object-contain"
      />
    </picture>
  )
}
