type Props = {
  items: readonly string[]
  big?: boolean
  reverse?: boolean
}

/** An endless strip of words. Two copies, so the loop never shows a seam. */
export function Marquee({ items, big = false, reverse = false }: Props) {
  const row = (
    <div className="ticker__track">
      {items.map((item, i) => (
        <span key={`${item}-${i}`} className={big ? undefined : 'u-eyebrow'}>
          {item}
        </span>
      ))}
    </div>
  )
  return (
    <div
      className={`ticker ${big ? 'ticker--big' : ''} ${reverse ? 'ticker--rev' : ''}`}
      aria-hidden="true"
    >
      {row}
      {row}
    </div>
  )
}
