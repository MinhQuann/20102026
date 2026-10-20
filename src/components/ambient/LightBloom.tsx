import { AnimatePresence, m } from 'motion/react'
import { EASE_IN_OUT, EASE_OUT, TIMELINE } from '../../config/timeline'

type LightBloomProps = {
  /** True while the gift is opening; the bloom holds at its peak until this turns false. */
  active: boolean
  origin: { x: number; y: number }
  reduced: boolean
}

const { bloomDelay, bloomDuration, bloomPeakAt } = TIMELINE.reveal

/** Full-screen soft light that hides the scene swap, like a lid being lifted. */
export function LightBloom({ active, origin, reduced }: LightBloomProps) {
  return (
    <AnimatePresence>
      {active && (
        <m.div
          key="bloom"
          aria-hidden="true"
          className="pointer-events-none fixed z-40 rounded-full"
          style={{
            left: origin.x,
            top: origin.y,
            width: '220vmax',
            height: '220vmax',
            marginLeft: '-110vmax',
            marginTop: '-110vmax',
            background:
              'radial-gradient(closest-side, rgb(255 255 255 / 0.98) 0%, rgb(255 238 244 / 0.95) 35%, rgb(255 228 238 / 0.7) 60%, transparent 100%)',
            willChange: 'transform, opacity',
          }}
          initial={{ opacity: 0, scale: reduced ? 1 : 0.05 }}
          animate={{
            opacity: reduced ? 0.6 : 0.95,
            scale: 1,
            transition: {
              delay: reduced ? 0 : bloomDelay,
              duration: reduced ? TIMELINE.reduced.exit : bloomDuration * bloomPeakAt,
              ease: EASE_OUT,
            },
          }}
          exit={{
            opacity: 0,
            scale: reduced ? 1 : 1.25,
            transition: { duration: reduced ? TIMELINE.reduced.fade : bloomDuration * (1 - bloomPeakAt) + 0.4, ease: EASE_IN_OUT },
          }}
        />
      )}
    </AnimatePresence>
  )
}
