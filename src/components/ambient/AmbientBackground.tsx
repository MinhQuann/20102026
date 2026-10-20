import { memo, type CSSProperties } from 'react'

const BOKEH = [
  { top: '8%', left: '-6%', size: 'clamp(160px, 38vw, 420px)', dur: '52s', dx: '50px', dy: '30px' },
  { top: '58%', left: '70%', size: 'clamp(180px, 42vw, 480px)', dur: '60s', dx: '-40px', dy: '-50px' },
  { top: '70%', left: '-10%', size: 'clamp(120px, 28vw, 300px)', dur: '44s', dx: '30px', dy: '-30px' },
  { top: '-8%', left: '62%', size: 'clamp(140px, 30vw, 340px)', dur: '48s', dx: '-30px', dy: '40px' },
]

/** Static gradients, film grain and slow bokeh drift. Never re-renders. */
export const AmbientBackground = memo(function AmbientBackground() {
  return (
    <div className="layer-fixed -z-10" aria-hidden="true">
      <div className="bg-romance absolute inset-0" />
      <div className="bokeh-layer absolute inset-0 overflow-hidden">
        {BOKEH.map((b, i) => (
          <div
            key={i}
            className="bokeh"
            style={
              {
                top: b.top,
                left: b.left,
                width: b.size,
                height: b.size,
                '--dur': b.dur,
                '--dx': b.dx,
                '--dy': b.dy,
              } as CSSProperties
            }
          />
        ))}
      </div>
      <div className="bg-vignette absolute inset-0" />
      <div className="bg-grain absolute inset-0" />
    </div>
  )
})
