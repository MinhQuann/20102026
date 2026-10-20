import { m } from 'motion/react'
import { COPY } from '../../content/copy'
import { EASE_OUT, TIMELINE } from '../../config/timeline'
import { GlowHeartIcon } from '../icons/Icons'
import { GiftButton } from '../ui/GiftButton'

type WelcomeSceneProps = {
  reduced: boolean
  onOpen: (origin: { x: number; y: number }) => void
}

const W = TIMELINE.welcome

export function WelcomeScene({ reduced, onOpen }: WelcomeSceneProps) {
  const enter = (delay: number, duration: number, y: number) =>
    reduced
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: TIMELINE.reduced.fade } }
      : { initial: { opacity: 0, y }, animate: { opacity: 1, y: 0 }, transition: { delay, duration, ease: EASE_OUT } }

  return (
    <m.section
      key="welcome"
      className="relative z-10 flex min-h-[calc(100svh-2.5rem)] flex-col items-center justify-center text-center"
      exit={
        reduced
          ? { opacity: 0, transition: { duration: TIMELINE.reduced.exit } }
          : { opacity: 0, y: -12, filter: 'blur(6px)', transition: { duration: W.exitDuration, delay: 0.08, ease: EASE_OUT } }
      }
    >
      <m.div {...enter(W.kickerDelay, W.kickerDuration, 0)} className="mb-5 flex items-center gap-3" aria-hidden="true">
        <span className="h-px w-8 bg-gradient-to-r from-transparent to-gold-400/70" />
        <span className="font-sans text-[12px] font-medium tracking-[0.32em] text-gold-500">{COPY.kicker}</span>
        <span className="h-px w-8 bg-gradient-to-l from-transparent to-gold-400/70" />
      </m.div>

      <m.h1
        {...enter(W.headingDelay, W.headingDuration, 16)}
        aria-label={COPY.welcomeHeadingFull}
        className="max-w-[18ch] font-display text-[clamp(1.875rem,7vw,3.25rem)] leading-[1.2] font-medium text-ink italic [text-wrap:balance]"
      >
        {COPY.welcomeHeading}
        <GlowHeartIcon className="ml-2 inline-block align-[-0.08em]" size="0.85em" />
      </m.h1>

      <m.div {...enter(W.buttonDelay, W.buttonDuration, 12)} className="mt-10">
        <GiftButton onOpen={onOpen} />
      </m.div>
    </m.section>
  )
}
