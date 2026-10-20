import type { ReactNode } from 'react'

type SoftButtonProps = {
  onClick: () => void
  children: ReactNode
}

/** Secondary pill button: lighter than the gift button, same gentle glow language. */
export function SoftButton({ onClick, children }: SoftButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="soft-button inline-flex min-h-12 cursor-pointer touch-manipulation items-center gap-2 rounded-full border border-rose-300/80 bg-white/75 px-6 py-3 font-sans text-[15px] font-semibold text-rose-600"
    >
      {children}
    </button>
  )
}
