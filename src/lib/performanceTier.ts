import type { PerformanceTier } from '../config/particles'

export type DeviceSignals = {
  saveData?: boolean
  deviceMemory?: number
  hardwareConcurrency?: number
  screenWidth: number
}

/** Heuristic tiering from cheap, synchronous signals. Missing signals (e.g. Safari
 *  has no deviceMemory) are treated as "unknown", never as "low". */
export function getPerformanceTier(s: DeviceSignals): PerformanceTier {
  if (s.saveData) return 'low'
  if (s.deviceMemory !== undefined && s.deviceMemory <= 2) return 'low'
  if (s.hardwareConcurrency !== undefined && s.hardwareConcurrency <= 4) return 'low'
  if (s.deviceMemory !== undefined && s.deviceMemory <= 4) return 'mid'
  if (s.screenWidth <= 400) return 'mid'
  return 'high'
}

type NavigatorWithHints = Navigator & {
  deviceMemory?: number
  connection?: { saveData?: boolean }
}

export function readDeviceSignals(): DeviceSignals {
  const nav = navigator as NavigatorWithHints
  return {
    saveData: nav.connection?.saveData,
    deviceMemory: nav.deviceMemory,
    hardwareConcurrency: nav.hardwareConcurrency || undefined,
    screenWidth: window.innerWidth,
  }
}
