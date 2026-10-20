export type Particle = {
  id: number
  /** Horizontal position, % of viewport width. */
  left: number
  /** Negative delay (s) so particles are already mid-flight on first paint. */
  delay: number
  duration: number
  /** Horizontal sway amplitude, px. */
  sway: number
  swayDuration: number
  rotate: number
  scale: number
  opacity: number
  variant: number
}

/** mulberry32: tiny deterministic PRNG so particle layouts are stable across renders. */
export function createRandom(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

type ParticleRange = {
  duration: [number, number]
  scale: [number, number]
  opacity: [number, number]
  variants: number
}

const DEFAULT_RANGE: ParticleRange = {
  duration: [12, 22],
  scale: [0.6, 1.1],
  opacity: [0.55, 0.9],
  variants: 3,
}

export function createParticles(
  count: number,
  seed: number,
  range: Partial<ParticleRange> = {},
): Particle[] {
  const r = { ...DEFAULT_RANGE, ...range }
  const random = createRandom(seed)
  const between = ([min, max]: [number, number]) => min + random() * (max - min)

  return Array.from({ length: count }, (_, id) => {
    const duration = between(r.duration)
    return {
      id,
      // Spread evenly across the width, with jitter, to avoid clumps.
      left: ((id + 0.15 + random() * 0.7) / count) * 100,
      delay: -random() * duration,
      duration,
      sway: 18 + random() * 36,
      swayDuration: 3 + random() * 3,
      rotate: 180 + random() * 360,
      scale: between(r.scale),
      opacity: between(r.opacity),
      variant: Math.floor(random() * r.variants),
    }
  })
}
