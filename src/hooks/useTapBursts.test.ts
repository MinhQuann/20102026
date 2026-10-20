import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { useTapBursts } from './useTapBursts'

describe('useTapBursts', () => {
  it('caps concurrent bursts, dropping the oldest', () => {
    const { result } = renderHook(() => useTapBursts(3))
    act(() => {
      for (let i = 0; i < 10; i++) result.current.add(i, i)
    })
    expect(result.current.bursts.map((b) => b.x)).toEqual([7, 8, 9])
  })

  it('removes a finished burst by id', () => {
    const { result } = renderHook(() => useTapBursts(3))
    act(() => result.current.add(1, 1))
    const id = result.current.bursts[0].id
    act(() => result.current.remove(id))
    expect(result.current.bursts).toEqual([])
  })
})
