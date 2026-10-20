export type Phase = 'welcome' | 'opening' | 'revealing' | 'message' | 'ambient' | 'photo' | 'surprise'

export type ExperienceEvent =
  | 'GIFT_CLICKED'
  | 'BLOOM_PEAK'
  | 'BOUQUET_SETTLED'
  | 'MESSAGE_DONE'
  | 'MORE'
  | 'REPLAY'

/** Accepted source phases per event; anything else is ignored. */
const TRANSITIONS: Record<ExperienceEvent, Partial<Record<Phase, Phase>>> = {
  GIFT_CLICKED: { welcome: 'opening' },
  BLOOM_PEAK: { opening: 'revealing' },
  BOUQUET_SETTLED: { revealing: 'message' },
  MESSAGE_DONE: { message: 'ambient' },
  MORE: { ambient: 'photo', photo: 'surprise' },
  REPLAY: { ambient: 'welcome', photo: 'welcome', surprise: 'welcome' },
}

export function experienceReducer(phase: Phase, event: ExperienceEvent): Phase {
  return TRANSITIONS[event][phase] ?? phase
}

const PHASE_ORDER: Phase[] = ['welcome', 'opening', 'revealing', 'message', 'ambient', 'photo', 'surprise']

export function isPhaseAtLeast(phase: Phase, target: Phase): boolean {
  return PHASE_ORDER.indexOf(phase) >= PHASE_ORDER.indexOf(target)
}
