import { TIMELINE } from '../config/timeline'
import { COPY } from '../content/copy'
import { splitMessage } from './splitMessage'

type MessageTiming = { [K in keyof typeof TIMELINE.message]: number }

export type MessageTimeline = {
  /** Delay (s) for each word, grouped by sentence. */
  wordDelays: number[][]
  signatureDelay: number
  /** When (s) the signature has fully appeared. */
  totalDuration: number
}

/** Word-by-word schedule with a short "breath" between sentences (PLAN.md §6). */
export function computeMessageTimeline(sentences: string[][], t: MessageTiming = TIMELINE.message): MessageTimeline {
  let index = 0
  const wordDelays = sentences.map((words, sentenceIndex) =>
    words.map(() => t.startDelay + index++ * t.wordStagger + sentenceIndex * t.sentencePause),
  )
  const lastDelay = wordDelays.at(-1)?.at(-1) ?? t.startDelay
  const signatureDelay = lastDelay + t.wordDuration + t.signatureGap
  return { wordDelays, signatureDelay, totalDuration: signatureDelay + t.signatureDuration }
}

export const MESSAGE_SENTENCES = splitMessage(COPY.message)
export const MESSAGE_SCHEDULE = computeMessageTimeline(MESSAGE_SENTENCES)
