import { memo, useMemo, type CSSProperties } from 'react'
import { PETAL_COLORS } from '../../config/particles'
import { createParticles, type Particle } from '../../lib/particles'
import { PetalShape } from '../icons/Icons'

type FloatingPetalsProps = {
  /** Petals always visible (welcome density). */
  baseCount: number
  /** Total petals once the gift is open; extras fade in. */
  fullCount: number
  full: boolean
}

function PetalLayer({ particles, visible }: { particles: Particle[]; visible: boolean }) {
  return (
    <div className="absolute inset-0 transition-opacity duration-[1500ms]" style={{ opacity: visible ? 1 : 0 }}>
      {particles.map((p) => (
        <div
          key={p.id}
          className="petal"
          style={
            {
              '--left': `${p.left}%`,
              '--dur': `${p.duration}s`,
              '--delay': `${p.delay}s`,
              '--opacity': p.opacity,
            } as CSSProperties
          }
        >
          <div
            className="petal-sway"
            style={{ '--sway': `${p.sway}px`, '--sway-dur': `${p.swayDuration}s` } as CSSProperties}
          >
            <div
              className="petal-spin"
              style={{ '--spin-dur': `${p.duration * 0.6}s`, '--rot': `${p.rotate}deg` } as CSSProperties}
            >
              <PetalShape variant={p.variant} color={PETAL_COLORS[p.id % PETAL_COLORS.length]} size={14 + p.scale * 10} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

/** CSS-keyframe petals: compositor-only, no per-frame JS, nothing to clean up. */
export const FloatingPetals = memo(function FloatingPetals({ baseCount, fullCount, full }: FloatingPetalsProps) {
  const base = useMemo(() => createParticles(baseCount, 7), [baseCount])
  const extra = useMemo(
    () => createParticles(Math.max(0, fullCount - baseCount), 19, { duration: [14, 24] }),
    [baseCount, fullCount],
  )

  return (
    <div className="layer-fixed z-0 overflow-hidden" aria-hidden="true">
      <PetalLayer particles={base} visible />
      {extra.length > 0 && <PetalLayer particles={extra} visible={full} />}
    </div>
  )
})
