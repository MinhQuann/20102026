import { AnimatePresence, m } from 'motion/react'
import { COPY } from '../../content/copy'
import { TIMELINE } from '../../config/timeline'
import { HeartIcon } from '../icons/Icons'
import { SoftButton } from './SoftButton'

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0 },
  transition: { delay, duration: TIMELINE.ambient.hintDuration },
})

export function TapHint({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <m.p
          key="hint"
          {...fade(TIMELINE.ambient.hintDelay)}
          className="tap-hint pointer-events-none absolute inset-x-0 top-full mt-1 items-center justify-center gap-1.5 font-sans text-[13px] tracking-wide text-ink-soft/80"
        >
          {COPY.tapHint}
          <HeartIcon size={12} className="text-rose-300" />
        </m.p>
      )}
    </AnimatePresence>
  )
}

/** "There's one more gift" prompt, pinned to the bottom once the message has finished. */
export function MoreButton({ visible, onMore }: { visible: boolean; onMore: () => void }) {
  return (
    <AnimatePresence>
      {visible && (
        <m.div
          key="more"
          {...fade(TIMELINE.ambient.hintDelay + 0.6)}
          className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-0 right-0 z-30 flex justify-center"
        >
          <SoftButton onClick={onMore}>{COPY.morePrompt}</SoftButton>
        </m.div>
      )}
    </AnimatePresence>
  )
}

export function ReplayButton({ onReplay }: { onReplay: () => void }) {
  return (
    <button
      type="button"
      onClick={onReplay}
      className="min-h-11 cursor-pointer touch-manipulation rounded-full px-4 py-2 font-sans text-[13px] tracking-wide text-ink-soft/70 transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-gold-400"
    >
      {COPY.replay} ↺
    </button>
  )
}
