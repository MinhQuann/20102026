type PolaroidProps = {
  src: string
  alt: string
  width: number
  height: number
  caption: string
}

/** Instant-photo frame with a strip of washi tape and a handwritten caption. */
export function Polaroid({ src, alt, width, height, caption }: PolaroidProps) {
  return (
    <figure className="polaroid relative rounded-[6px] bg-[#FFFDFB] p-[5%] pb-0 [container-type:inline-size]">
      <span
        aria-hidden="true"
        className="absolute -top-[4%] left-1/2 h-[7%] w-[38%] -translate-x-1/2 -rotate-3 rounded-[2px] bg-rose-300/45"
      />
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        decoding="async"
        draggable={false}
        className="block h-auto w-full select-none rounded-[2px] bg-blush-100"
      />
      <figcaption
        className="py-[0.55em] text-center font-script [text-wrap:balance] leading-tight font-medium text-ink"
        style={{ fontSize: 'clamp(0.9rem, 6.8cqw, 1.5rem)' }}
      >
        {caption}
      </figcaption>
    </figure>
  )
}
