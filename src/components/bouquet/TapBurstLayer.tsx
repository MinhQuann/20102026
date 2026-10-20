import { m } from 'motion/react'
import { useMemo } from 'react'
import { HEART_COLORS } from '../../config/particles'
import { EASE_OUT, TIMELINE } from '../../config/timeline'
import type { TapBurst } from '../../hooks/useTapBursts'
import { createRandom } from '../../lib/particles'
import { HeartIcon, SparkleIcon } from '../icons/Icons'

type TapBurstLayerProps = {
  bursts: TapBurst[]
  particleCount: number
  reduced: boolean
  onDone: (id: number) => void
}

function Burst({ burst, particleCount, reduced, onDone }: { burst: TapBurst } & Omit<TapBurstLayerProps, 'bursts'>) {
  const particles = useMemo(() => {
    const random = createRandom(burst.id + 1)
    const count = reduced ? 1 : particleCount
    return Array.from({ length: count }, (_, i) => {
      // Fan upwards: -150°..-30°
      const angle = (-150 + (120 * (i + 0.5)) / count + (random() - 0.5) * 16) * (Math.PI / 180)
      const distance = reduced ? 0 : 50 + random() * 60
      return {
        dx: Math.cos(angle) * distance,
        dy: Math.sin(angle) * distance - (reduced ? 0 : 20),
        size: 12 + random() * 10,
        sparkle: i % 3 === 2,
        color: HEART_COLORS[i % HEART_COLORS.length],
        rotate: (random() - 0.5) * 50,
      }
    })
  }, [burst.id, particleCount, reduced])

  return (
    <div className="absolute" style={{ left: burst.x, top: burst.y }}>
      {particles.map((p, i) => (
        <m.div
          key={i}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ color: p.color }}
          initial={{ x: 0, y: 0, opacity: 0, scale: 0.4, rotate: 0 }}
          animate={{ x: p.dx, y: p.dy, opacity: [0, 1, 0], scale: [0.4, 1.1, 0.8], rotate: p.rotate }}
          transition={{ duration: TIMELINE.ambient.burstDuration, ease: EASE_OUT }}
          onAnimationComplete={i === 0 ? () => onDone(burst.id) : undefined}
        >
          {p.sparkle ? <SparkleIcon size={p.size} /> : <HeartIcon size={p.size} />}
        </m.div>
      ))}
    </div>
  )
}

/** Hearts and sparkles that fly up from the tap point; each burst removes itself. */
export function TapBurstLayer({ bursts, ...rest }: TapBurstLayerProps) {
  return (
    <div className="pointer-events-none absolute inset-0 z-30" aria-hidden="true">
      {bursts.map((burst) => (
        <Burst key={burst.id} burst={burst} {...rest} />
      ))}
    </div>
  )
}
