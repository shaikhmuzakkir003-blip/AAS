import { useRef } from 'react'
import type { ReactNode } from 'react'
import { useReveal } from '#/lib/inview'

type Props = {
  children: ReactNode
  className?: string
  delay?: number
  stagger?: number
  as?: 'div' | 'section' | 'header' | 'ul' | 'p'
}

/** Lifts its children in as they cross into view. */
export function Reveal({
  children,
  className = '',
  delay = 0,
  stagger = 0.08,
  as = 'div',
}: Props) {
  const el = useRef<HTMLDivElement>(null)
  useReveal(el, { stagger, delay })
  const Tag = as as 'div'

  return (
    <Tag className={className} ref={el}>
      {children}
    </Tag>
  )
}
