type Props = {
  items: readonly string[]
  big?: boolean
  reverse?: boolean
  className?: string
}

/** An endless strip of words. Two copies, so the loop never shows a seam. */
export function Marquee({ items, big = false, reverse = false, className = '' }: Props) {
  const row = (dup: number) => (
    <div className="ticker__track" key={dup} aria-hidden={dup === 1}>
      {items.map((item, i) => (
        <span key={`${dup}-${item}-${i}`} className={big ? undefined : 'u-eyebrow'}>
          {item}
        </span>
      ))}
    </div>
  )

  return (
    <div
      className={`ticker ${big ? 'ticker--big' : ''} ${reverse ? 'ticker--rev' : ''} ${className}`}
    >
      {row(0)}
      {row(1)}
    </div>
  )
}
