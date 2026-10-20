import { m } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import type { PerformanceTier } from '../../config/particles'
import { TIMELINE } from '../../config/timeline'
import type { PreloadStatus } from '../../hooks/useBouquetPreload'
import { usePointerParallax } from '../../hooks/usePointerParallax'
import { isPhaseAtLeast, type Phase } from '../../state/experience'
import { Bouquet } from '../bouquet/Bouquet'
import { RomanticMessage } from '../message/RomanticMessage'
import { TapHint } from '../ui/AmbientControls'

const noop = () => {}

type RevealSceneProps = {
  phase: Phase
  status: PreloadStatus
  tier: PerformanceTier
  reduced: boolean
  onSettled: () => void
  onMessageDone: () => void
}

export function RevealScene({ phase, status, tier, reduced, onSettled, onMessageDone }: RevealSceneProps) {
  const messageRef = useRef<HTMLDivElement>(null)
  const [tapped, setTapped] = useState(false)
  const parallax = usePointerParallax(!reduced)
  const showMessage = isPhaseAtLeast(phase, 'message')

  useEffect(() => {
    // Move focus to the message for keyboard/screen-reader users once it starts.
    if (showMessage) messageRef.current?.focus({ preventScroll: true })
  }, [showMessage])

  return (
    <m.section
      key="reveal"
      className="reveal-grid relative z-10"
      exit={{ opacity: 0, transition: { duration: TIMELINE.reduced.fade } }}
    >
      <Bouquet
        status={status}
        tier={tier}
        reduced={reduced}
        parallax={parallax}
        onSettled={onSettled}
        onTap={() => setTapped(true)}
      />

      {/* Reserved slot: an invisible copy sizes the cell from the start, so the bouquet never shifts. */}
      <div className="relative w-full pb-6">
        <div className="invisible" aria-hidden="true">
          <RomanticMessage reduced onDone={noop} />
        </div>
        <div className="absolute inset-x-0 top-0">
          {showMessage && <RomanticMessage ref={messageRef} reduced={reduced} onDone={onMessageDone} />}
          <TapHint visible={phase === 'ambient' && !tapped} />
        </div>
      </div>
    </m.section>
  )
}
