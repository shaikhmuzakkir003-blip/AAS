import { useEffect, useRef } from 'react'
import type { CSSProperties, ElementType, ReactNode, Ref } from 'react'
import { highlineReveal, type HlColor } from '#/lib/reveal'

type Props = {
  as?: ElementType
  className?: string
  style?: CSSProperties
  color?: HlColor
  direction?: 'right' | 'left'
  delay?: number
  stagger?: number
  on?: 'scroll' | 'load'
  children?: ReactNode
}

/**
 * Splits its text into masked lines and reveals them with the Lando-style
 * accent-bar wipe when the block crosses into the viewport.
 */
export function SplitReveal({
  as: Tag = 'div',
  className = '',
  style,
  color = 'lime',
  direction = 'right',
  delay = 0,
  stagger = 0.15,
  on = 'scroll',
  children,
}: Props) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const el = ref.current
    if (!el) return
    return highlineReveal(el, { color, direction, delay, stagger, on })
  }, [color, direction, delay, stagger, on])

  return (
    <Tag ref={ref as Ref<never>} className={className} style={style}>
      {children}
    </Tag>
  )
}