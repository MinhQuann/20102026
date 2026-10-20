import { memo, useMemo, type CSSProperties } from 'react'
import { HEART_COLORS } from '../../config/particles'
import { createParticles } from '../../lib/particles'
import { HeartIcon, HeartOutlineIcon } from '../icons/Icons'

type FloatingHeartsProps = { count: number }

/** Small hearts that drift up now and then (long idle tail in the keyframes). */
export const FloatingHearts = memo(function FloatingHearts({ count }: FloatingHeartsProps) {
  const hearts = useMemo(
    () => createParticles(count, 101, { duration: [14, 22], scale: [0.7, 1.2], opacity: [0.45, 0.75], variants: 2 }),
    [count],
  )

  return (
    <div className="layer-fixed z-0 overflow-hidden" aria-hidden="true">
      {hearts.map((h) => {
        const Icon = h.variant === 0 ? HeartIcon : HeartOutlineIcon
        return (
          <div
            key={h.id}
            className="heart-rise"
            style={
              {
                '--left': `${h.left}%`,
                '--dur': `${h.duration}s`,
                '--delay': `${h.delay}s`,
                '--sway': `${(h.id % 2 === 0 ? 1 : -1) * h.sway}px`,
                '--opacity': h.opacity,
                color: HEART_COLORS[h.id % HEART_COLORS.length],
              } as CSSProperties
            }
          >
            <Icon size={12 + h.scale * 8} />
          </div>
        )
      })}
    </div>
  )
})
