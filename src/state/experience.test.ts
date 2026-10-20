import { describe, expect, it } from 'vitest'
import { experienceReducer, isPhaseAtLeast } from './experience'

describe('experienceReducer', () => {
  it('opens the gift from welcome', () => {
    expect(experienceReducer('welcome', 'GIFT_CLICKED')).toBe('opening')
  })

  it('ignores a repeated gift click while opening', () => {
    expect(experienceReducer('opening', 'GIFT_CLICKED')).toBe('opening')
  })

  it('ignores out-of-order events', () => {
    expect(experienceReducer('welcome', 'BOUQUET_SETTLED')).toBe('welcome')
    expect(experienceReducer('welcome', 'BLOOM_PEAK')).toBe('welcome')
  })

  it('ignores a duplicate settle (animation callback + timer fallback)', () => {
    expect(experienceReducer('message', 'BOUQUET_SETTLED')).toBe('message')
  })

  it('walks the full happy path', () => {
    const events = ['GIFT_CLICKED', 'BLOOM_PEAK', 'BOUQUET_SETTLED', 'MESSAGE_DONE'] as const
    expect(events.reduce(experienceReducer, 'welcome' as const)).toBe('ambient')
  })

  it('replays from ambient and the photo surprises, never mid-reveal', () => {
    expect(experienceReducer('ambient', 'REPLAY')).toBe('welcome')
    expect(experienceReducer('photo', 'REPLAY')).toBe('welcome')
    expect(experienceReducer('surprise', 'REPLAY')).toBe('welcome')
    expect(experienceReducer('message', 'REPLAY')).toBe('message')
  })

  it('steps through the photo surprises with MORE', () => {
    expect(experienceReducer('ambient', 'MORE')).toBe('photo')
    expect(experienceReducer('photo', 'MORE')).toBe('surprise')
    expect(experienceReducer('surprise', 'MORE')).toBe('surprise')
    expect(experienceReducer('message', 'MORE')).toBe('message')
  })
})

describe('isPhaseAtLeast', () => {
  it('compares phase order', () => {
    expect(isPhaseAtLeast('message', 'revealing')).toBe(true)
    expect(isPhaseAtLeast('opening', 'revealing')).toBe(false)
  })
})
