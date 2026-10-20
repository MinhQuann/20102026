import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement> & { size?: number | string }

export function HeartIcon({ size = '1em', ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M12 21s-8.5-5.3-8.5-11.3C3.5 6.5 5.9 4 8.7 4c1.5 0 2.7.8 3.3 2 .6-1.2 1.8-2 3.3-2 2.8 0 5.2 2.5 5.2 5.7C20.5 15.7 12 21 12 21z"
      />
    </svg>
  )
}

export function HeartOutlineIcon({ size = '1em', ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        d="M12 20s-7.7-4.8-7.7-10.3C4.3 6.8 6.4 4.8 8.8 4.8c1.4 0 2.6.8 3.2 1.9.6-1.1 1.8-1.9 3.2-1.9 2.4 0 4.5 2 4.5 4.9C19.7 15.2 12 20 12 20z"
      />
    </svg>
  )
}

/** Gradient heart used inline with text (replaces 💗 / ❤️, Decision D4). */
export function GlowHeartIcon({ size = '1em', ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...props}>
      <defs>
        <linearGradient id="glow-heart" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F8C8DC" />
          <stop offset="0.55" stopColor="#E88AA6" />
          <stop offset="1" stopColor="#C25A7A" />
        </linearGradient>
      </defs>
      <path
        fill="url(#glow-heart)"
        d="M12 21s-8.5-5.3-8.5-11.3C3.5 6.5 5.9 4 8.7 4c1.5 0 2.7.8 3.3 2 .6-1.2 1.8-2 3.3-2 2.8 0 5.2 2.5 5.2 5.7C20.5 15.7 12 21 12 21z"
      />
      <path fill="#fff" opacity=".55" d="M7.4 7.2c-1.3.4-2 1.6-2 2.8 0 .4.5.5.6.1.3-1 1-1.8 1.9-2.1.5-.2.1-1-.5-.8z" />
    </svg>
  )
}

export function SparkleIcon({ size = '1em', ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M12 1.5c.5 4.8 1.9 8.2 4.1 9.6 1.5 1 3.7 1.3 6.4.9-2.7.4-4.9 1.2-6.4 2.6-2.2 2-3.6 5.2-4.1 8.9-.5-3.7-1.9-6.9-4.1-8.9C6.4 13.2 4.2 12.4 1.5 12c2.7.4 4.9.1 6.4-.9 2.2-1.4 3.6-4.8 4.1-9.6z"
      />
    </svg>
  )
}

export function GiftIcon({ size = '1em', ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" fill="none" {...props}>
      <path stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" d="M4 11h16v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9z" />
      <path stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" d="M3 7.5h18V11H3z" />
      <path stroke="currentColor" strokeWidth="1.6" d="M12 7.5V21" />
      <path
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        d="M12 7.5C10.5 4 7 3.6 6.6 5.6 6.2 7.4 9.5 7.5 12 7.5zm0 0c1.5-3.5 5-3.9 5.4-1.9.4 1.8-2.9 1.9-5.4 1.9z"
      />
    </svg>
  )
}

const PETAL_PATHS = [
  'M12 2C17 6 19 12 16 18c-1.5 3-6.5 3-8 0C5 12 7 6 12 2z',
  'M12 2c4 2 8 7 6 13-1 3-4 6-7 5-4-1.5-6-6-4-11 1-3 3-6 5-7z',
  'M12 3c5 1 8 6 7 11-.8 4-4 7-8 6-3.5-1-5-5-4-9 .7-4 2.5-7 5-8z',
]

export function PetalShape({ variant = 0, color, size = 18 }: { variant?: number; color: string; size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <path fill={color} d={PETAL_PATHS[variant % PETAL_PATHS.length]} />
      <path fill="#fff" opacity=".35" d="M11.5 5c-2 3-2.5 7-1 11 .2.5-.6.7-.8.2-1.4-4-1-8.3 1.1-11.5.3-.4 1 0 .7.3z" />
    </svg>
  )
}
