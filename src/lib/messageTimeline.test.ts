import { describe, expect, it } from 'vitest'
import { computeMessageTimeline } from './messageTimeline'

const t = {
  startDelay: 0.2,
  wordDuration: 0.6,
  wordStagger: 0.1,
  sentencePause: 0.5,
  signatureDuration: 1,
  signatureGap: 0.3,
}

describe('computeMessageTimeline', () => {
  it('staggers words and pauses between sentences', () => {
    const { wordDelays } = computeMessageTimeline([['a', 'b'], ['c']], t)
    expect(wordDelays[0][0]).toBeCloseTo(0.2)
    expect(wordDelays[0][1]).toBeCloseTo(0.3)
    expect(wordDelays[1][0]).toBeCloseTo(0.2 + 0.2 + 0.5)
  })

  it('schedules the signature after the last word', () => {
    const { signatureDelay, totalDuration } = computeMessageTimeline([['a', 'b'], ['c']], t)
    expect(signatureDelay).toBeCloseTo(0.9 + 0.6 + 0.3)
    expect(totalDuration).toBeCloseTo(signatureDelay + 1)
  })

  it('handles an empty message', () => {
    expect(computeMessageTimeline([], t).wordDelays).toEqual([])
  })
})
