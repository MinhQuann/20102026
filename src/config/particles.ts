export type PerformanceTier = 'high' | 'mid' | 'low'

/** Particle counts per tier. Reduced motion bypasses these entirely. */
export const PARTICLE_COUNTS = {
  welcomePetals: { high: 10, mid: 7, low: 4 },
  ambientPetals: { high: 16, mid: 10, low: 6 },
  welcomeHearts: { high: 4, mid: 3, low: 2 },
  ambientHearts: { high: 5, mid: 3, low: 2 },
  sparkles: { high: 8, mid: 6, low: 4 },
  petalBurst: { high: 14, mid: 10, low: 6 },
  tapBurst: { high: 8, mid: 6, low: 4 },
} as const satisfies Record<string, Record<PerformanceTier, number>>

export const MAX_CONCURRENT_BURSTS = 3

export const PETAL_COLORS = ['#F8C8DC', '#F4A6BC', '#FBD9E5', '#EFB3C6'] as const
export const HEART_COLORS = ['#F4A6BC', '#E88AA6', '#F8C8DC', '#D4AF7A'] as const
