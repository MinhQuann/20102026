import { describe, expect, it } from 'vitest'
import { COPY } from '../content/copy'
import { splitMessage } from './splitMessage'

describe('splitMessage', () => {
  it('splits the gift message into three sentences', () => {
    const sentences = splitMessage(COPY.message)
    expect(sentences).toHaveLength(3)
    expect(sentences[0]).toContain('20/10')
    expect(sentences[2].at(-1)).toBe('nhiều!')
  })

  it('keeps Vietnamese words with diacritics whole', () => {
    const words = splitMessage(COPY.message).flat()
    expect(words).toContain('xuất')
    expect(words).toContain('hạnh')
    expect(words.join(' ')).toBe(COPY.message)
  })

  it('drops empty words from irregular whitespace', () => {
    expect(splitMessage('  Một  hai.\n\nBa   bốn!  ')).toEqual([['Một', 'hai.'], ['Ba', 'bốn!']])
  })

  it('returns nothing for empty input', () => {
    expect(splitMessage('   ')).toEqual([])
  })
})
