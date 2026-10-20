import { describe, expect, it } from 'vitest'
import { getPerformanceTier } from './performanceTier'

describe('getPerformanceTier', () => {
  it('returns low when data saver is on', () => {
    expect(getPerformanceTier({ saveData: true, deviceMemory: 8, hardwareConcurrency: 8, screenWidth: 1440 })).toBe('low')
  })

  it('returns low for low-memory or few-core devices', () => {
    expect(getPerformanceTier({ deviceMemory: 2, hardwareConcurrency: 8, screenWidth: 1440 })).toBe('low')
    expect(getPerformanceTier({ deviceMemory: 8, hardwareConcurrency: 4, screenWidth: 1440 })).toBe('low')
  })

  it('returns mid for 4GB devices or narrow screens', () => {
    expect(getPerformanceTier({ deviceMemory: 4, hardwareConcurrency: 8, screenWidth: 1440 })).toBe('mid')
    expect(getPerformanceTier({ hardwareConcurrency: 6, screenWidth: 390 })).toBe('mid')
  })

  it('does not penalise missing signals (Safari)', () => {
    expect(getPerformanceTier({ screenWidth: 1280 })).toBe('high')
  })
})
