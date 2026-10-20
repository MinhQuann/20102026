import { m, useTransform, type MotionValue } from 'motion/react'
import { useRef, useState, type MouseEvent, type PointerEvent } from 'react'
import { PARTICLE_COUNTS, type PerformanceTier } from '../../config/particles'
import { COPY } from '../../content/copy'
import { EASE_SILK, TIMELINE } from '../../config/timeline'
import type { PreloadStatus } from '../../hooks/useBouquetPreload'
import { useTapBursts } from '../../hooks/useTapBursts'
import { PetalBurst } from '../ambient/PetalBurst'
import { BouquetImage } from './BouquetImage'
import { Sparkles } from './Sparkles'
import { TapBurstLayer } from './TapBurstLayer'

type BouquetProps = {
  status: PreloadStatus
  tier: PerformanceTier
  reduced: boolean
  parallax: { x: MotionValue<number>; y: MotionValue<number> }
  onSettled: () => void
  onTap: () => void
}

const { bouquetDuration, haloDelay, haloDuration } = TIMELINE.reveal

export function Bouquet({ status, tier, reduced, parallax, onSettled, onTap }: BouquetProps) {
  const slotRef = useRef<HTMLDivElement>(null)
  const [settled, setSettled] = useState(false)
  const { bursts, add, remove } = useTapBursts()

  // Depth: halo drifts against the pointer, bouquet and sparkles with it.
  const haloX = useTransform(parallax.x, (v) => v * -6)
  const haloY = useTransform(parallax.y, (v) => v * -6)
  const bouquetX = useTransform(parallax.x, (v) => v * 4)
  const bouquetY = useTransform(parallax.y, (v) => v * 3)
  const sparkleX = useTransform(parallax.x, (v) => v * 10)
  const sparkleY = useTransform(parallax.y, (v) => v * 8)

  // Blur is skipped on low-end devices: it is the most expensive part of the entrance.
  const useBlur = !reduced && tier !== 'low'

  const burstAt = (clientX: number, clientY: number) => {
    const rect = slotRef.current?.getBoundingClientRect()
    if (!rect) return
    add(clientX - rect.left, clientY - rect.top)
    onTap()
  }

  const handlePointerDown = (e: PointerEvent<HTMLButtonElement>) => burstAt(e.clientX, e.clientY)

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    // Keyboard activation (Enter/Space) has no pointer position: burst from the centre.
    if (e.detail !== 0) return
    const rect = slotRef.current?.getBoundingClientRect()
    if (rect) burstAt(rect.left + rect.width / 2, rect.top + rect.height * 0.4)
  }

  return (
    <div ref={slotRef} className="bouquet-slot relative">
      <m.div
        className="halo pointer-events-none absolute -inset-[22%] z-0 rounded-full"
        style={{ x: haloX, y: haloY }}
        initial={{ opacity: 0, scale: reduced ? 1 : 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: reduced ? 0 : haloDelay, duration: reduced ? TIMELINE.reduced.fade : haloDuration }}
      >
        <div className={`h-full w-full rounded-full ${tier === 'low' ? '' : 'halo-breathe'}`} />
      </m.div>

      {!reduced && <PetalBurst count={PARTICLE_COUNTS.petalBurst[tier]} />}

      <m.div
        className="relative z-10 h-full w-full"
        initial={
          reduced
            ? { opacity: 0 }
            : { opacity: 0, scale: 0.86, y: 48, filter: useBlur ? 'blur(8px)' : 'blur(0px)' }
        }
        animate={
          reduced
            ? { opacity: 1 }
            : { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)', transitionEnd: { filter: 'none' } }
        }
        transition={{ duration: reduced ? TIMELINE.reduced.fade : bouquetDuration, ease: EASE_SILK }}
        onAnimationComplete={() => {
          setSettled(true)
          onSettled()
        }}
      >
        <m.div className="h-full w-full" style={{ x: bouquetX, y: bouquetY }}>
          <div className={`h-full w-full ${settled && !reduced ? 'bouquet-float' : ''}`}>
            <m.button
              type="button"
              aria-label={COPY.bouquetLabel}
              className="block h-full w-full cursor-pointer touch-manipulation rounded-[40%] outline-none focus-visible:ring-4 focus-visible:ring-gold-400/60"
              whileTap={reduced ? undefined : { scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 18 }}
              onPointerDown={handlePointerDown}
              onClick={handleClick}
            >
              <BouquetImage status={status} />
            </m.button>
          </div>
        </m.div>
      </m.div>

      <m.div className="pointer-events-none absolute inset-0 z-20" style={{ x: sparkleX, y: sparkleY }}>
        <Sparkles count={reduced ? 3 : PARTICLE_COUNTS.sparkles[tier]} />
      </m.div>

      <TapBurstLayer
        bursts={bursts}
        particleCount={PARTICLE_COUNTS.tapBurst[tier]}
        reduced={reduced}
        onDone={remove}
      />
    </div>
  )
}
