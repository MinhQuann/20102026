import { useCallback, useRef, useState } from 'react'
import { MAX_CONCURRENT_BURSTS } from '../config/particles'

export type TapBurst = { id: number; x: number; y: number }

/** Bounded list of in-flight tap bursts; the oldest is dropped past the cap. */
export function useTapBursts(max: number = MAX_CONCURRENT_BURSTS) {
  const [bursts, setBursts] = useState<TapBurst[]>([])
  const nextId = useRef(0)

  const add = useCallback(
    (x: number, y: number) => {
      const id = nextId.current++
      setBursts((prev) => [...prev, { id, x, y }].slice(-max))
    },
    [max],
  )

  const remove = useCallback((id: number) => {
    setBursts((prev) => prev.filter((b) => b.id !== id))
  }, [])

  return { bursts, add, remove }
}
