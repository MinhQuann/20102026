import { memo, type ReactNode } from 'react'
import { createRandom } from '../../lib/particles'

/** Procedurally drawn bouquet: peonies, garden roses, cream ranunculus, baby's breath
 *  and eucalyptus in blush paper with a champagne ribbon. Seeded randomness keeps
 *  petals organic but identical on every render. viewBox 400×520. */

type Ring = { count: number; len: number; half: number; fill: string; twist: number }

/** Petal pointing up (-y) with its base at the origin and a broad, rounded tip. */
function petalPath(l: number, w: number): string {
  return `M0,0 C${-w * 0.9},${-l * 0.22} ${-w * 1.05},${-l * 0.82} ${-w * 0.38},${-l} Q0,${-l * 1.07} ${w * 0.38},${-l} C${w * 1.05},${-l * 0.82} ${w * 0.9},${-l * 0.22} 0,0Z`
}

type BloomProps = { x: number; y: number; r: number; seed: number; rotate?: number }

function Bloom({ x, y, r, seed, rotate = 0, rings, stroke, center }: BloomProps & {
  rings: Ring[]
  stroke: string
  center?: ReactNode
}) {
  const random = createRandom(seed)
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`}>
      <circle r={r * 0.95} fill="#C25A7A" opacity="0.10" transform="translate(2 5)" />
      {rings.map((ring, i) => (
        <g key={i}>
          {Array.from({ length: ring.count }, (_, j) => {
            const angle = (j * 360) / ring.count + i * ring.twist + (random() - 0.5) * 12
            const l = r * ring.len * (0.9 + random() * 0.18)
            return (
              <path
                key={j}
                d={petalPath(l, l * ring.half)}
                transform={`rotate(${angle.toFixed(1)})`}
                fill={ring.fill}
                stroke={stroke}
                strokeOpacity="0.45"
                strokeWidth="0.6"
              />
            )
          })}
        </g>
      ))}
      {center}
    </g>
  )
}

const PEONY_RINGS: Ring[] = [
  { count: 11, len: 1, half: 0.42, fill: 'url(#peony-outer)', twist: 0 },
  { count: 10, len: 0.8, half: 0.4, fill: 'url(#peony-outer)', twist: 17 },
  { count: 9, len: 0.62, half: 0.4, fill: 'url(#peony-mid)', twist: 23 },
  { count: 8, len: 0.45, half: 0.42, fill: 'url(#peony-mid)', twist: 29 },
  { count: 7, len: 0.3, half: 0.45, fill: 'url(#peony-inner)', twist: 31 },
  { count: 5, len: 0.17, half: 0.5, fill: 'url(#peony-inner)', twist: 37 },
]

function Peony(props: BloomProps) {
  return <Bloom {...props} rings={PEONY_RINGS} stroke="#E39AB2" />
}

const ROSE_RINGS: Ring[] = [
  { count: 6, len: 1, half: 0.6, fill: 'url(#rose-outer)', twist: 0 },
  { count: 5, len: 0.78, half: 0.62, fill: 'url(#rose-outer)', twist: 33 },
  { count: 5, len: 0.58, half: 0.62, fill: 'url(#rose-mid)', twist: 21 },
  { count: 4, len: 0.4, half: 0.66, fill: 'url(#rose-inner)', twist: 47 },
]

function roseSpiral(r: number): string {
  const points: string[] = []
  for (let t = 0; t <= 2.6 * Math.PI; t += 0.25) {
    const radius = r * 0.03 + (t / (2.6 * Math.PI)) * r * 0.24
    points.push(`${(Math.cos(t) * radius).toFixed(1)},${(Math.sin(t) * radius).toFixed(1)}`)
  }
  return `M${points.join(' L')}`
}

function Rose(props: BloomProps) {
  const center = (
    <>
      <circle r={props.r * 0.27} fill="url(#rose-heart)" />
      <path d={roseSpiral(props.r)} fill="none" stroke="#A84C6C" strokeOpacity="0.55" strokeWidth="1.1" strokeLinecap="round" />
    </>
  )
  return <Bloom {...props} rings={ROSE_RINGS} stroke="#B9587A" center={center} />
}

const RANUNCULUS_RINGS: Ring[] = [
  { count: 12, len: 1, half: 0.38, fill: 'url(#cream-outer)', twist: 0 },
  { count: 11, len: 0.78, half: 0.38, fill: 'url(#cream-outer)', twist: 15 },
  { count: 10, len: 0.58, half: 0.4, fill: 'url(#cream-mid)', twist: 19 },
  { count: 8, len: 0.38, half: 0.42, fill: 'url(#cream-mid)', twist: 23 },
]

function Ranunculus(props: BloomProps) {
  const center = <circle r={props.r * 0.16} fill="#C9B07E" opacity="0.85" />
  return <Bloom {...props} rings={RANUNCULUS_RINGS} stroke="#DCC3AA" center={center} />
}

function BabysBreath({ x, y, spread, seed }: { x: number; y: number; spread: number; seed: number }) {
  const random = createRandom(seed)
  const florets = Array.from({ length: 9 }, () => ({
    dx: (random() - 0.5) * spread * 2,
    dy: (random() - 0.5) * spread * 1.4,
    r: 2.2 + random() * 2,
  }))
  return (
    <g transform={`translate(${x} ${y})`}>
      {florets.map((f, i) => (
        <line key={`s${i}`} x1="0" y1={spread} x2={f.dx} y2={f.dy} stroke="#A9BFA6" strokeWidth="0.7" opacity="0.6" />
      ))}
      {florets.map((f, i) => (
        <g key={i} transform={`translate(${f.dx.toFixed(1)} ${f.dy.toFixed(1)})`}>
          <circle r={f.r} fill="#FFFDFB" stroke="#EADAD2" strokeWidth="0.6" />
          <circle r={f.r * 0.35} fill="#F3E3D3" />
        </g>
      ))}
    </g>
  )
}

function Eucalyptus({ x, y, angle, length, seed }: { x: number; y: number; angle: number; length: number; seed: number }) {
  const random = createRandom(seed)
  const leaves = Array.from({ length: Math.round(length / 22) }, (_, i) => {
    const t = (i + 1) / (length / 22 + 0.5)
    const side = i % 2 === 0 ? 1 : -1
    const size = 11 - t * 4 + random() * 2
    return { y: -t * length, x: side * (5 + random() * 3), size }
  })
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle})`}>
      <path d={`M0,0 Q${length * 0.08},${-length * 0.5} 0,${-length}`} stroke="#8DA894" strokeWidth="1.6" fill="none" />
      {leaves.map((leaf, i) => (
        <ellipse
          key={i}
          cx={leaf.x}
          cy={leaf.y}
          rx={leaf.size}
          ry={leaf.size * 0.82}
          fill="url(#leaf)"
          stroke="#7E9A86"
          strokeOpacity="0.35"
          strokeWidth="0.6"
        />
      ))}
    </g>
  )
}

function Defs() {
  const petalGradient = (id: string, base: string, tip: string) => (
    <linearGradient id={id} x1="0" y1="1" x2="0" y2="0">
      <stop offset="0" stopColor={base} />
      <stop offset="1" stopColor={tip} />
    </linearGradient>
  )
  return (
    <defs>
      {petalGradient('peony-outer', '#F2A9C0', '#FFEAF1')}
      {petalGradient('peony-mid', '#EC9AB4', '#FDDCE7')}
      {petalGradient('peony-inner', '#E28AA6', '#F9CADB')}
      {petalGradient('rose-outer', '#D46F8D', '#F7B9CB')}
      {petalGradient('rose-mid', '#CB6384', '#F2A6BC')}
      {petalGradient('rose-inner', '#BD5778', '#EE97B0')}
      {petalGradient('cream-outer', '#EFD9C6', '#FFFBF6')}
      {petalGradient('cream-mid', '#E9CDB4', '#FFF5EA')}
      <radialGradient id="rose-heart">
        <stop offset="0" stopColor="#B65274" />
        <stop offset="1" stopColor="#DA7A98" />
      </radialGradient>
      <linearGradient id="leaf" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#C5D6C2" />
        <stop offset="1" stopColor="#93AE99" />
      </linearGradient>
      <linearGradient id="paper-back" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#FCE9EF" />
        <stop offset="1" stopColor="#F3D3DD" />
      </linearGradient>
      <linearGradient id="paper-left" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#FFF9F7" />
        <stop offset="0.6" stopColor="#F9E6E8" />
        <stop offset="1" stopColor="#EFCFD8" />
      </linearGradient>
      <linearGradient id="paper-right" x1="1" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#FCEEF0" />
        <stop offset="0.55" stopColor="#F6DCE2" />
        <stop offset="1" stopColor="#E9C3CF" />
      </linearGradient>
      <linearGradient id="ribbon" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#F3E2C4" />
        <stop offset="0.5" stopColor="#D4AF7A" />
        <stop offset="1" stopColor="#B8925C" />
      </linearGradient>
      <radialGradient id="ground-shadow">
        <stop offset="0" stopColor="#C25A7A" stopOpacity="0.22" />
        <stop offset="1" stopColor="#C25A7A" stopOpacity="0" />
      </radialGradient>
    </defs>
  )
}

export const BouquetSvg = memo(function BouquetSvg() {
  return (
    <svg viewBox="0 0 400 520" className="h-full w-full overflow-visible" aria-hidden="true">
      <Defs />

      <ellipse cx="200" cy="500" rx="120" ry="16" fill="url(#ground-shadow)" />

      {/* Stems below the wrap */}
      <g stroke="#8DA894" strokeWidth="3" strokeLinecap="round">
        <path d="M192,440 L186,500" />
        <path d="M200,440 L200,505" />
        <path d="M208,440 L214,498" />
      </g>

      {/* Back paper */}
      <path
        d="M38,196 C52,120 118,66 200,58 C282,66 348,118 364,190 C340,200 330,214 322,232 L250,446 L150,446 L78,236 C70,216 58,202 38,196Z"
        fill="url(#paper-back)"
        stroke="#E7BFCB"
        strokeWidth="1"
      />

      {/* Greenery */}
      <Eucalyptus x={110} y={200} angle={-58} length={120} seed={11} />
      <Eucalyptus x={292} y={196} angle={56} length={118} seed={12} />
      <Eucalyptus x={185} y={130} angle={-14} length={92} seed={13} />
      <Eucalyptus x={232} y={140} angle={20} length={84} seed={14} />
      <Eucalyptus x={90} y={250} angle={-82} length={70} seed={15} />
      <Eucalyptus x={312} y={246} angle={80} length={70} seed={16} />

      <BabysBreath x={84} y={150} spread={22} seed={21} />
      <BabysBreath x={318} y={142} spread={22} seed={22} />
      <BabysBreath x={150} y={86} spread={18} seed={23} />
      <BabysBreath x={258} y={84} spread={18} seed={24} />

      {/* Back row */}
      <Rose x={104} y={182} r={36} seed={31} rotate={10} />
      <Ranunculus x={158} y={124} r={28} seed={32} />
      <Peony x={206} y={118} r={50} seed={33} rotate={8} />
      <Ranunculus x={260} y={130} r={27} seed={34} rotate={20} />
      <Rose x={298} y={176} r={37} seed={35} rotate={-12} />

      {/* Middle row */}
      <Peony x={140} y={222} r={55} seed={41} rotate={-6} />
      <Peony x={268} y={218} r={56} seed={42} rotate={14} />
      <Rose x={204} y={190} r={42} seed={43} />

      {/* Front row */}
      <Ranunculus x={88} y={262} r={26} seed={51} />
      <Rose x={204} y={262} r={36} seed={52} rotate={22} />
      <Ranunculus x={318} y={258} r={25} seed={53} rotate={-10} />

      <BabysBreath x={168} y={164} spread={14} seed={61} />
      <BabysBreath x={244} y={164} spread={14} seed={62} />
      <BabysBreath x={64} y={222} spread={14} seed={63} />
      <BabysBreath x={338} y={216} spread={14} seed={64} />

      {/* Front wrap: two overlapping flaps */}
      <path
        d="M44,240 C80,262 120,276 166,282 C190,286 214,284 238,276 L214,456 C206,466 194,466 186,456Z"
        fill="url(#paper-left)"
        stroke="#E7BFCB"
        strokeWidth="1"
      />
      <path
        d="M356,232 C322,258 280,276 236,284 C212,288 188,288 164,282 L186,456 C194,466 206,466 214,456Z"
        fill="url(#paper-right)"
        stroke="#E3B6C4"
        strokeWidth="1"
      />
      <path d="M164,282 L186,456" stroke="#D9A6B7" strokeOpacity="0.6" strokeWidth="1.4" fill="none" />
      <path d="M60,250 C110,272 160,286 214,282" stroke="#fff" strokeOpacity="0.6" strokeWidth="1.2" fill="none" />

      {/* Ribbon */}
      <path d="M151,394 Q200,404 249,392 L246,410 Q200,420 154,410Z" fill="url(#ribbon)" />
      <path d="M200,402 C186,428 176,452 162,484 L176,480 L182,494 C194,462 202,434 204,404Z" fill="url(#ribbon)" />
      <path d="M202,402 C214,428 226,450 242,478 L229,476 L224,489 C212,460 204,434 200,404Z" fill="url(#ribbon)" opacity="0.92" />
      <path d="M200,402 C176,376 142,374 146,398 C150,420 180,414 200,402Z" fill="url(#ribbon)" />
      <path d="M200,402 C224,376 258,374 254,398 C250,420 220,414 200,402Z" fill="url(#ribbon)" />
      <path d="M200,402 C184,388 162,384 158,396" stroke="#fff" strokeOpacity="0.5" strokeWidth="1.2" fill="none" />
      <ellipse cx="200" cy="403" rx="10" ry="9" fill="#C9A26C" />
      <ellipse cx="197" cy="400" rx="4" ry="3" fill="#F3E2C4" opacity="0.7" />
    </svg>
  )
})
