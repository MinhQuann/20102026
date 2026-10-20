import { useEffect } from 'react'
import { useMotionValue, useSpring, type MotionValue } from 'motion/react'

const FINE_POINTER = '(hover: hover) and (pointer: fine)'

/** Normalised pointer position (-1..1 on each axis), smoothed with a spring.
 *  Only active on mouse/trackpad devices; touch devices stay at 0. */
export function usePointerParallax(enabled: boolean): { x: MotionValue<number>; y: MotionValue<number> } {
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 60, damping: 20 })
  const y = useSpring(rawY, { stiffness: 60, damping: 20 })

  useEffect(() => {
    if (!enabled || !window.matchMedia(FINE_POINTER).matches) return
    const onMove = (e: PointerEvent) => {
      rawX.set((e.clientX / window.innerWidth) * 2 - 1)
      rawY.set((e.clientY / window.innerHeight) * 2 - 1)
    }
    const onLeave = () => {
      rawX.set(0)
      rawY.set(0)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      rawX.set(0)
      rawY.set(0)
    }
  }, [enabled, rawX, rawY])

  return { x, y }
}
