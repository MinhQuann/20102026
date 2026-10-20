/** Optional raster bouquet (Decision D1). Drop files named `bouquet-<width>.avif|webp|png`
 *  into src/assets/bouquet/ and rebuild; until then the SVG bouquet is the hero. */
const files = import.meta.glob<string>('../assets/bouquet/*.{avif,webp,png}', {
  eager: true,
  query: '?url',
  import: 'default',
})

export type BouquetSource = { type: string; srcSet: string }
export type BouquetAsset = { sources: BouquetSource[]; fallbackSrc: string }

type Entry = { width: number; ext: string; url: string }

const MIME: Record<string, string> = { avif: 'image/avif', webp: 'image/webp', png: 'image/png' }

function buildAsset(): BouquetAsset | null {
  const entries = Object.entries(files)
    .map(([path, url]): Entry | null => {
      const match = /bouquet-(\d+)\.(avif|webp|png)$/.exec(path)
      return match ? { width: Number(match[1]), ext: match[2], url } : null
    })
    .filter((e): e is Entry => e !== null)
  if (entries.length === 0) return null

  const byExt = (ext: string) => entries.filter((e) => e.ext === ext).sort((a, b) => a.width - b.width)
  const sources = ['avif', 'webp']
    .map((ext) => byExt(ext))
    .filter((list) => list.length > 0)
    .map((list) => ({
      type: MIME[list[0].ext],
      srcSet: list.map((e) => `${e.url} ${e.width}w`).join(', '),
    }))
  const fallback = [...byExt('avif'), ...byExt('png'), ...byExt('webp')].at(-1)
  return fallback ? { sources, fallbackSrc: fallback.url } : null
}

export const BOUQUET_ASSET = buildAsset()

export const BOUQUET_SIZES = '(max-width: 640px) 90vw, 600px'
