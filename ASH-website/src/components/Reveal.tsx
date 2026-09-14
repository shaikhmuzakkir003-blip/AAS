import { useRef } from 'react'
import type { ReactNode } from 'react'
import { useInView } from '#/lib/inview'

type Props = {
  children: ReactNode
  className?: string
  delay?: number
  stagger?: number
  as?: 'div' | 'section' | 'header' | 'ul' | 'p' | 'span' | 'h2' | 'h3'
}

/** Adds `.is-in` when scrolled into view, driving `.fade` / `.word` motion. */
export function Reveal({
  children,
  className = '',
  delay = 0,
  stagger = 0.08,
  as = 'div',
}: Props) {
  const el = useRef<HTMLElement>(null)
  useInView(el, { stagger, delay })
  const Tag = as as 'div'

  return (
    <Tag className={className} ref={el as never}>
      {children}
    </Tag>
  )
}

/** Convenience: a single rising block. */
export function Fade({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  return (
    <span className={`fade ${className}`} style={{ ['--d' as string]: `${delay}s` }}>
      {children}
    </span>
  )
}
