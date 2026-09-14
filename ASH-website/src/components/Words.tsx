import { useRef } from 'react'
import type { CSSProperties, ElementType } from 'react'
import { useInView } from '#/lib/inview'

type Props = {
  /** Wrap words in *asterisks* to render them as italic serif lime accents. */
  text: string
  as?: ElementType
  className?: string
  style?: CSSProperties
  /** per-word stagger, in ms */
  step?: number
  delay?: number
}

/**
 * Layout-safe masked word reveal. Words are real inline content (never DOM
 * destroyed or line-grouped), so wrapping can never break into one-word rows.
 */
export function Words({
  text,
  as: Tag = 'span',
  className = '',
  style,
  step = 30,
  delay = 0,
}: Props) {
  const ref = useRef<HTMLElement>(null)
  useInView(ref, { stagger: 0 })

  const tokens = text.split(/(\s+)/)

  return (
    <Tag ref={ref as never} className={className} style={style}>
      {tokens.map((tok, i) => {
        if (/^\s+$/.test(tok)) return tok
        const accent = tok.startsWith('*') && tok.endsWith('*')
        const clean = tok.replace(/\*/g, '')
        const wordStyle = {
          ['--i' as string]: String(i),
          ['--d' as string]: `${delay}s`,
        } as CSSProperties
        return (
          <span
            className="word"
            key={`${clean}-${i}`}
            style={{ ...wordStyle, ['transition-duration' as string]: undefined }}
          >
            <i
              className={accent ? 'u-serif u-lime' : undefined}
              style={{ transitionDelay: `calc(${i * step}ms + ${delay}s)` }}
            >
              {clean}
            </i>
          </span>
        )
      })}
    </Tag>
  )
}
