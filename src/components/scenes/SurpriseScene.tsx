import { AnimatePresence, m } from 'motion/react'
import { useRef, type PointerEvent } from 'react'
import facePhoto from '../../assets/photos/face-bouquet.webp'
import rosePhoto from '../../assets/photos/rose.webp'
import { PARTICLE_COUNTS, type PerformanceTier } from '../../config/particles'
import { EASE_OUT, TIMELINE } from '../../config/timeline'
import { COPY } from '../../content/copy'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { useTapBursts } from '../../hooks/useTapBursts'
import { PetalBurst } from '../ambient/PetalBurst'
import { TapBurstLayer } from '../bouquet/TapBurstLayer'
import { GlowHeartIcon } from '../icons/Icons'
import { ReplayButton } from '../ui/AmbientControls'
import { Polaroid } from '../ui/Polaroid'
import { SoftButton } from '../ui/SoftButton'

type SurpriseSceneProps = {
  /** false = the rose photo alone; true = the face bouquet has joined it. */
  showFaces: boolean
  tier: PerformanceTier
  reduced: boolean
  onMore: () => void
  onReplay: () => void
}

const S = TIMELINE.surprise
const DROP = { type: 'spring', stiffness: 120, damping: 16, mass: 0.9 } as const
const POP = { type: 'spring', stiffness: 260, damping: 14 } as const

export function SurpriseScene({ showFaces, tier, reduced, onMore, onReplay }: SurpriseSceneProps) {
  const stageRef = useRef<HTMLDivElement>(null)
  const wide = useMediaQuery('(min-width: 768px)')
  const short = useMediaQuery('(max-height: 520px)')
  const { bursts, add, remove } = useTapBursts()

  // Narrow screens overlap the two photos; wide screens lay them side by side.
  const roseWithFaces = short
    ? { x: '-50%', y: '-2%', rotate: -6, scale: 0.86 }
    : wide
    ? { x: '-62%', y: '-2%', rotate: -6, scale: 0.92 }
    : { x: '-25%', y: '-8%', rotate: -8, scale: 0.74 }
  const faceTarget = short
    ? { x: '52%', y: '2%', rotate: 4 }
    : wide
    ? { x: '58%', y: '2%', rotate: 4 } : { x: '21%', y: '4%', rotate: 5 }

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    const rect = stageRef.current?.getBoundingClientRect()
    if (rect) add(e.clientX - rect.left, e.clientY - rect.top)
  }

  const heading = showFaces ? COPY.surpriseHeading : COPY.photoHeading

  return (
    <m.section
      key="surprise"
      className="surprise-layout relative z-10 flex min-h-[calc(100svh-2.5rem)] flex-col items-center justify-center gap-[clamp(0.5rem,2.2svh,1.5rem)] text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: TIMELINE.reduced.fade } }}
    >
      <div className="surprise-heading">
      <AnimatePresence mode="wait">
        <m.h2
          key={heading}
          className="max-w-[20ch] font-display text-[clamp(1.5rem,5.6vw,2.25rem)] leading-[1.2] font-medium text-ink italic [text-wrap:balance]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0, transition: { delay: S.headingDelay, duration: 0.7, ease: EASE_OUT } }}
          exit={{ opacity: 0, y: -8, transition: { duration: 0.3 } }}
        >
          {heading}
        </m.h2>
      </AnimatePresence>
      </div>

      <div ref={stageRef} className="polaroid-stage relative w-full max-w-[760px]" onPointerDown={handlePointerDown}>
        <m.div
          className="polaroid-a absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: '-30%', rotate: -16, scale: 0.9 }}
          animate={
            showFaces
              ? { opacity: 1, ...roseWithFaces, transition: { ...DROP, delay: 0 } }
              : { opacity: 1, x: '0%', y: '0%', rotate: -3, scale: 1, transition: { ...DROP, delay: S.polaroidDelay } }
          }
        >
          <Polaroid src={rosePhoto} alt={COPY.roseAlt} width={614} height={768} caption={COPY.roseCaption} />
        </m.div>

        <AnimatePresence>
          {showFaces && (
            <m.div
              key="faces"
              className="polaroid-b absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
              initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.3, rotate: 18, y: '20%', x: faceTarget.x }}
              animate={{ opacity: 1, scale: 1, ...faceTarget, transition: { ...POP, delay: S.faceDelay } }}
            >
              <Polaroid src={facePhoto} alt={COPY.faceAlt} width={640} height={1102} caption={COPY.faceCaption} />
            </m.div>
          )}
        </AnimatePresence>

        {showFaces && !reduced && (
          <PetalBurst
            shape="heart"
            count={PARTICLE_COUNTS.petalBurst[tier] + 4}
            delay={S.burstDelay}
            className={`${wide ? 'left-[72%]' : 'left-[62%]'} top-[40%] z-30`}
          />
        )}

        <TapBurstLayer bursts={bursts} particleCount={PARTICLE_COUNTS.tapBurst[tier]} reduced={reduced} onDone={remove} />
      </div>

      <div className="surprise-footer flex min-h-12 flex-col items-center">
        <AnimatePresence mode="wait">
          {showFaces ? (
            <m.div
              key="ending"
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0, transition: { delay: S.footerDelay, duration: 0.8, ease: EASE_OUT } }}
            >
              <p className="max-w-[30ch] font-display text-[clamp(1.0625rem,4vw,1.5rem)] leading-snug font-medium text-ink [text-wrap:balance]">
                {COPY.surpriseLine}
                <GlowHeartIcon className="ml-1.5 inline-block align-[-0.1em]" size="0.9em" />
              </p>
              <ReplayButton onReplay={onReplay} />
            </m.div>
          ) : (
            <m.div
              key="next"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0, transition: { delay: S.footerDelay, duration: 0.6, ease: EASE_OUT } }}
              exit={{ opacity: 0, transition: { duration: 0.25 } }}
            >
              <SoftButton onClick={onMore}>{COPY.notDoneYet}</SoftButton>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </m.section>
  )
}
