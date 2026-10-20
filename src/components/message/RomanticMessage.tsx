import { m } from 'motion/react'
import type { Ref } from 'react'
import { EASE_OUT, TIMELINE } from '../../config/timeline'
import { MESSAGE_SCHEDULE as SCHEDULE, MESSAGE_SENTENCES as SENTENCES } from '../../lib/messageTimeline'
import { GlowHeartIcon } from '../icons/Icons'
import { Signature } from './Signature'

type RomanticMessageProps = {
  ref?: Ref<HTMLDivElement>
  reduced: boolean
  onDone: () => void
}

const LAST_SENTENCE = SENTENCES.length - 1
const EMPHASIS = 'text-gold-shimmer text-[1.08em] font-semibold italic'

/** The visual message is aria-hidden; screen readers get COPY.messageFull via the live region in App. */
export function RomanticMessage({ ref, reduced, onDone }: RomanticMessageProps) {
  return (
    <div ref={ref} tabIndex={-1} className="relative z-10 mx-auto w-full max-w-[34ch] text-center outline-none">
      <m.div
        aria-hidden="true"
        className="font-display text-[clamp(1.125rem,4.2vw,1.75rem)] leading-[1.55] font-medium text-ink [font-variant-numeric:lining-nums]"
        initial={reduced ? { opacity: 0 } : false}
        animate={reduced ? { opacity: 1 } : undefined}
        transition={{ duration: TIMELINE.reduced.fade, delay: 0.2 }}
      >
        {SENTENCES.map((words, s) => (
          <p key={s} className={`[text-wrap:balance] ${s === LAST_SENTENCE ? 'mt-2' : ''}`}>
            {words.map((word, w) => {
              const emphasised = s === LAST_SENTENCE
              const delay = SCHEDULE.wordDelays[s][w]
              const content = (
                <>
                  {word}
                  {emphasised && w === words.length - 1 && (
                    <GlowHeartIcon className="ml-1.5 inline-block align-[-0.12em]" size="0.95em" />
                  )}
                </>
              )
              return (
                <span key={w}>
                  {reduced ? (
                    <span className={emphasised ? EMPHASIS : undefined}>{content}</span>
                  ) : (
                    <m.span
                      className={`inline-block ${emphasised ? EMPHASIS : ''}`}
                      style={emphasised ? { animationDelay: `${delay + 0.4}s` } : undefined}
                      initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)', transitionEnd: { filter: 'none' } }}
                      transition={{ duration: TIMELINE.message.wordDuration, delay, ease: EASE_OUT }}
                    >
                      {content}
                    </m.span>
                  )}
                  {/* Real space text node between inline-block words keeps natural wrapping. */}
                  {w < words.length - 1 && ' '}
                </span>
              )
            })}
          </p>
        ))}
      </m.div>

      <Signature
        delay={reduced ? 0.2 + TIMELINE.reduced.fade : SCHEDULE.signatureDelay}
        reduced={reduced}
        onDone={onDone}
      />
    </div>
  )
}
