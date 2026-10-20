import { useState } from 'react'
import type { PerformanceTier } from '../config/particles'
import { getPerformanceTier, readDeviceSignals } from '../lib/performanceTier'

/** Computed once per visit; device capability does not change mid-session. */
export function usePerformanceTier(): PerformanceTier {
  const [tier] = useState(() => getPerformanceTier(readDeviceSignals()))
  return tier
}
