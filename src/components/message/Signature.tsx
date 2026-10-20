import { m } from 'motion/react'
import { COPY } from '../../content/copy'
import { EASE_OUT, TIMELINE } from '../../config/timeline'
import { GlowHeartIcon } from '../icons/Icons'

type SignatureProps = { delay: number; reduced: boolean; onDone: () => void }

export function Signature({ delay, reduced, onDone }: SignatureProps) {
  return (
    <m.p
      aria-hidden="true"
      className="mt-3 pr-2 text-right font-script text-[clamp(1.25rem,4.5vw,1.75rem)] font-medium text-rose-500"
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 6, rotate: 3 }}
      animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0, rotate: 0 }}
      transition={{ delay, duration: reduced ? TIMELINE.reduced.fade : TIMELINE.message.signatureDuration, ease: EASE_OUT }}
      onAnimationComplete={onDone}
    >
      {COPY.signature}
      <GlowHeartIcon className="ml-1.5 inline-block align-[-0.1em]" size="0.85em" />
    </m.p>
  )
}
