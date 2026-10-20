import { AnimatePresence, LazyMotion, MotionConfig, domAnimation, useReducedMotion } from 'motion/react'
import { useCallback, useEffect, useReducer, useRef, useState } from 'react'
import { AmbientBackground } from './components/ambient/AmbientBackground'
import { FloatingHearts } from './components/ambient/FloatingHearts'
import { FloatingPetals } from './components/ambient/FloatingPetals'
import { LightBloom } from './components/ambient/LightBloom'
import { RevealScene } from './components/scenes/RevealScene'
import { SurpriseScene } from './components/scenes/SurpriseScene'
import { WelcomeScene } from './components/scenes/WelcomeScene'
import { MoreButton } from './components/ui/AmbientControls'
import { PARTICLE_COUNTS } from './config/particles'
import { BLOOM_PEAK_MS, TIMELINE } from './config/timeline'
import { COPY } from './content/copy'
import { useBouquetPreload } from './hooks/useBouquetPreload'
import { usePerformanceTier } from './hooks/usePerformanceTier'
import { MESSAGE_SCHEDULE } from './lib/messageTimeline'
import facePhoto from './assets/photos/face-bouquet.webp'
import rosePhoto from './assets/photos/rose.webp'
import { experienceReducer, isPhaseAtLeast } from './state/experience'

export function App() {
  const [phase, dispatch] = useReducer(experienceReducer, 'welcome')
  const [bloomOrigin, setBloomOrigin] = useState({ x: 0, y: 0 })
  const openedAt = useRef(0)
  const reduced = useReducedMotion() ?? false
  const tier = usePerformanceTier()
  const assetStatus = useBouquetPreload()

  const handleOpen = useCallback((origin: { x: number; y: number }) => {
    openedAt.current = performance.now()
    setBloomOrigin(origin)
    dispatch('GIFT_CLICKED')
  }, [])

  // Opening → revealing at the bloom peak; hold the peak (bounded) while the bouquet asset loads.
  useEffect(() => {
    if (phase !== 'opening') return
    const peakMs = reduced ? TIMELINE.reduced.exit * 1000 : BLOOM_PEAK_MS
    const targetMs = assetStatus === 'loading' ? peakMs + TIMELINE.reveal.assetWaitMaxMs : peakMs
    const elapsed = performance.now() - openedAt.current
    const timer = setTimeout(() => dispatch('BLOOM_PEAK'), Math.max(0, targetMs - elapsed))
    return () => clearTimeout(timer)
  }, [phase, reduced, assetStatus])

  // Safety nets: onAnimationComplete may never fire in a throttled background tab.
  useEffect(() => {
    if (phase === 'revealing') {
      const ms = (reduced ? TIMELINE.reduced.fade : TIMELINE.reveal.bouquetDuration) * 1000 + TIMELINE.reveal.settleFallbackMs
      const timer = setTimeout(() => dispatch('BOUQUET_SETTLED'), ms)
      return () => clearTimeout(timer)
    }
    if (phase === 'message') {
      const timer = setTimeout(() => dispatch('MESSAGE_DONE'), MESSAGE_SCHEDULE.totalDuration * 1000 + 1000)
      return () => clearTimeout(timer)
    }
  }, [phase, reduced])

  // Warm the photo cache while the message plays, so the surprises appear instantly.
  const messageStarted = isPhaseAtLeast(phase, 'message')
  useEffect(() => {
    if (!messageStarted) return
    for (const src of [rosePhoto, facePhoto]) new Image().src = src
  }, [messageStarted])

  const revealed = isPhaseAtLeast(phase, 'revealing')
  const inSurprise = isPhaseAtLeast(phase, 'photo')

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <main className="stage">
          <AmbientBackground />
          {!reduced && (
            <>
              <FloatingPetals
                baseCount={PARTICLE_COUNTS.welcomePetals[tier]}
                fullCount={PARTICLE_COUNTS.ambientPetals[tier]}
                full={revealed}
              />
              <FloatingHearts count={(revealed ? PARTICLE_COUNTS.ambientHearts : PARTICLE_COUNTS.welcomeHearts)[tier]} />
            </>
          )}

          <AnimatePresence mode="wait">
            {phase === 'welcome' && <WelcomeScene key="welcome" reduced={reduced} onOpen={handleOpen} />}
            {revealed && !inSurprise && (
              <RevealScene
                key="reveal"
                phase={phase}
                status={assetStatus}
                tier={tier}
                reduced={reduced}
                onSettled={() => dispatch('BOUQUET_SETTLED')}
                onMessageDone={() => dispatch('MESSAGE_DONE')}
              />
            )}
            {inSurprise && (
              <SurpriseScene
                key="surprise"
                showFaces={phase === 'surprise'}
                tier={tier}
                reduced={reduced}
                onMore={() => dispatch('MORE')}
                onReplay={() => dispatch('REPLAY')}
              />
            )}
          </AnimatePresence>

          <LightBloom active={phase === 'opening'} origin={bloomOrigin} reduced={reduced} />
          <MoreButton visible={phase === 'ambient'} onMore={() => dispatch('MORE')} />

          <div className="sr-only-text" aria-live="polite">
            {isPhaseAtLeast(phase, 'message') && (
              <p>
                {COPY.messageFull} {COPY.signatureFull}
              </p>
            )}
          </div>
        </main>
      </MotionConfig>
    </LazyMotion>
  )
}
