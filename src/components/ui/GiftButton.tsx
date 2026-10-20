import { useState, type MouseEvent } from 'react'
import { COPY } from '../../content/copy'
import { GiftIcon } from '../icons/Icons'

type GiftButtonProps = {
  onOpen: (origin: { x: number; y: number }) => void
}

export function GiftButton({ onOpen }: GiftButtonProps) {
  // Local latch: the exiting scene keeps its last props, so the parent's phase can't disable it.
  const [opened, setOpened] = useState(false)

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (opened) return
    setOpened(true)
    const rect = e.currentTarget.getBoundingClientRect()
    onOpen({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 })
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={opened}
      aria-label={COPY.giftButtonFull}
      className="gift-button inline-flex min-h-[52px] cursor-pointer items-center gap-2.5 rounded-full px-8 py-4 font-sans text-base font-semibold tracking-[0.01em] text-white disabled:pointer-events-none"
    >
      <span className="shimmer" aria-hidden="true" />
      <span className="relative [text-shadow:0_1px_2px_rgb(150_60_90/0.35)]">{COPY.giftButton}</span>
      <GiftIcon className="relative" size={20} />
    </button>
  )
}
