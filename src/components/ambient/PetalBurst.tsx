import { m } from 'motion/react'
import { useEffect, useMemo, useState } from 'react'
import { HEART_COLORS, PETAL_COLORS } from '../../config/particles'
import { EASE_OUT, TIMELINE } from '../../config/timeline'
import { createRandom } from '../../lib/particles'
import { HeartIcon, PetalShape } from '../icons/Icons'

const { petalBurstDelay, petalBurstDuration } = TIMELINE.reveal

type PetalBurstProps = {
  count: number
  shape?: 'petal' | 'heart'
  delay?: number
  className?: string
}

/** One-shot radial burst of petals (or hearts) from a point; unmounts when done. */
export function PetalBurst({
  count,
  shape = 'petal',
  delay = petalBurstDelay,
  className = 'left-1/2 top-[42%] z-0',
}: PetalBurstProps) {
  const [done, setDone] = useState(false)

  const petals = useMemo(() => {
    const random = createRandom(2010)
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2 + (random() - 0.5) * 0.5
      const distance = 110 + random() * 120
      return {
        dx: Math.cos(angle) * distance,
        dy: Math.sin(angle) * distance * 0.8,
        fall: 40 + random() * 60,
        rotate: (random() - 0.5) * 540,
        size: 12 + random() * 10,
        delay: delay + random() * 0.15,
        variant: i % 3,
      }
    })
  }, [count, delay])

  useEffect(() => {
    const timer = setTimeout(() => setDone(true), (delay + petalBurstDuration + 0.4) * 1000)
    return () => clearTimeout(timer)
  }, [delay])

  if (done) return null

  return (
    <div className={`pointer-events-none absolute ${className}`} aria-hidden="true">
      {petals.map((p, i) => (
        <m.div
          key={i}
          className="absolute"
          initial={{ x: 0, y: 0, opacity: 0, rotate: 0, scale: 0.4 }}
          animate={{
            x: [0, p.dx * 0.85, p.dx],
            y: [0, p.dy * 0.85, p.dy + p.fall],
            opacity: [0, 1, 0],
            rotate: p.rotate,
            scale: [0.4, 1, 0.8],
          }}
          transition={{ duration: petalBurstDuration, delay: p.delay, ease: EASE_OUT, times: [0, 0.45, 1] }}
        >
          {shape === 'heart' ? (
            <HeartIcon size={p.size} style={{ color: HEART_COLORS[i % HEART_COLORS.length] }} />
          ) : (
            <PetalShape variant={p.variant} color={PETAL_COLORS[i % PETAL_COLORS.length]} size={p.size} />
          )}
        </m.div>
      ))}
    </div>
  )
}
