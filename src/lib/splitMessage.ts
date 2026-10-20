/** Splits a message into sentences of words. Words are never split further, so
 *  Vietnamese diacritics and tokens like "20/10" stay intact. */
export function splitMessage(message: string): string[][] {
  return message
    .trim()
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.split(/\s+/).filter(Boolean))
    .filter((words) => words.length > 0)
}
