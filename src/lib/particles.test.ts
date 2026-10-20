import { describe, expect, it } from 'vitest'
import { createParticles } from './particles'

describe('createParticles', () => {
  it('is deterministic for the same seed', () => {
    expect(createParticles(10, 42)).toEqual(createParticles(10, 42))
  })

  it('differs between seeds', () => {
    expect(createParticles(10, 1)).not.toEqual(createParticles(10, 2))
  })

  it('returns an empty list for zero particles', () => {
    expect(createParticles(0, 1)).toEqual([])
  })

  it('keeps values inside their ranges', () => {
    for (const p of createParticles(50, 7, { variants: 2 })) {
      expect(p.left).toBeGreaterThanOrEqual(0)
      expect(p.left).toBeLessThanOrEqual(100)
      expect(p.delay).toBeLessThanOrEqual(0)
      expect(-p.delay).toBeLessThanOrEqual(p.duration)
      expect([0, 1]).toContain(p.variant)
    }
  })
})
