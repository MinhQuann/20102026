/** Every duration/delay (seconds) and easing for the choreography. See PLAN.md §6. */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const
export const EASE_SILK = [0.16, 1, 0.3, 1] as const
export const EASE_IN_OUT = [0.45, 0, 0.55, 1] as const

export const TIMELINE = {
  welcome: {
    kickerDelay: 0.15,
    kickerDuration: 0.6,
    headingDelay: 0.3,
    headingDuration: 0.9,
    buttonDelay: 0.9,
    buttonDuration: 0.7,
    exitDuration: 0.6,
  },
  reveal: {
    bloomDelay: 0.35,
    bloomDuration: 1.4,
    /** Fraction of bloom at which it peaks and the scene swaps underneath. */
    bloomPeakAt: 0.45,
    /** Max time (ms) to hold the bloom at peak waiting for the bouquet asset. */
    assetWaitMaxMs: 1200,
    bouquetDuration: 1.4,
    haloDelay: 0.2,
    haloDuration: 1.2,
    petalBurstDelay: 0.6,
    petalBurstDuration: 1.6,
    sparklesDelay: 0.9,
    sparkleStagger: 0.08,
    /** Safety net (ms) beyond the entrance in case onAnimationComplete never fires. */
    settleFallbackMs: 300,
  },
  message: {
    startDelay: 0.2,
    wordDuration: 0.6,
    wordStagger: 0.07,
    sentencePause: 0.25,
    signatureDuration: 0.9,
    signatureGap: 0.3,
  },
  ambient: {
    hintDelay: 1.5,
    hintDuration: 0.6,
    burstDuration: 1.1,
  },
  surprise: {
    headingDelay: 0.1,
    polaroidDelay: 0.35,
    /** Second polaroid pops in, then the heart burst. */
    faceDelay: 0.25,
    burstDelay: 0.55,
    footerDelay: 1.3,
  },
  reduced: {
    fade: 0.6,
    exit: 0.3,
  },
} as const

/** Bloom peak time (ms) measured from the gift click. */
export const BLOOM_PEAK_MS =
  (TIMELINE.reveal.bloomDelay + TIMELINE.reveal.bloomDuration * TIMELINE.reveal.bloomPeakAt) * 1000
