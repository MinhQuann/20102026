import { m } from 'motion/react'
import { memo, type CSSProperties } from 'react'
import { TIMELINE } from '../../config/timeline'
import { SparkleIcon } from '../icons/Icons'

/** Hand-placed around the bouquet silhouette (percent of the bouquet slot). */
const SPOTS = [
  { top: 6, left: 18, size: 16, dur: 4.2, delay: 0.2, color: '#D4AF7A' },
  { top: 2, left: 74, size: 12, dur: 3.6, delay: 1.4, color: '#FFFFFF' },
  { top: 30, left: -4, size: 14, dur: 5.1, delay: 0.8, color: '#E9D2AE' },
  { top: 26, left: 98, size: 18, dur: 4.6, delay: 2.1, color: '#D4AF7A' },
  { top: 55, left: 6, size: 11, dur: 3.9, delay: 2.8, color: '#FFFFFF' },
  { top: 52, left: 92, size: 12, dur: 4.4, delay: 0.5, color: '#E9D2AE' },
  { top: -4, left: 46, size: 13, dur: 5.4, delay: 3.2, color: '#E9D2AE' },
  { top: 76, left: 84, size: 10, dur: 3.7, delay: 1.9, color: '#D4AF7A' },
]

type SparklesProps = { count: number }

export const Sparkles = memo(function Sparkles({ count }: SparklesProps) {
  const { sparklesDelay, sparkleStagger } = TIMELINE.reveal
  return (
    <div className="pointer-events-none absolute inset-0 z-20" aria-hidden="true">
      {SPOTS.slice(0, count).map((s, i) => (
        <m.div
          key={i}
          className="absolute"
          style={{ top: `${s.top}%`, left: `${s.left}%` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: sparklesDelay + i * sparkleStagger, duration: 0.6 }}
        >
          <div
            className="sparkle"
            style={
              {
                '--dur': `${s.dur}s`,
                '--delay': `${s.delay}s`,
                color: s.color,
                filter: 'drop-shadow(0 0 4px rgb(255 255 255 / 0.9))',
              } as CSSProperties
            }
          >
            <SparkleIcon size={s.size} />
          </div>
        </m.div>
      ))}
    </div>
  )
})
