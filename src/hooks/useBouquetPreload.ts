import { useEffect, useState } from 'react'
import { BOUQUET_ASSET, BOUQUET_SIZES } from '../lib/bouquetAsset'

export type PreloadStatus = 'loading' | 'ready' | 'error'

/** Downloads and decodes the raster bouquet before the gift is opened. With no
 *  raster asset present the SVG bouquet is used, reported as 'error'. */
export function useBouquetPreload(): PreloadStatus {
  const [status, setStatus] = useState<PreloadStatus>(BOUQUET_ASSET ? 'loading' : 'error')

  useEffect(() => {
    if (!BOUQUET_ASSET) return
    let cancelled = false
    const img = new Image()
    const settle = (next: PreloadStatus) => {
      if (!cancelled) setStatus(next)
    }
    img.onload = () => {
      // decode() can reject for cached images in some WebViews; a fired onload is enough.
      img.decode().then(
        () => settle('ready'),
        () => settle('ready'),
      )
    }
    img.onerror = () => settle('error')
    // Let the browser pick the same candidate the <picture> will use.
    const preferred = BOUQUET_ASSET.sources.find((s) => s.type === 'image/webp') ?? BOUQUET_ASSET.sources[0]
    if (preferred) {
      img.sizes = BOUQUET_SIZES
      img.srcset = preferred.srcSet
    }
    img.src = BOUQUET_ASSET.fallbackSrc
    return () => {
      cancelled = true
      img.onload = null
      img.onerror = null
    }
  }, [])

  return status
}
