import { useRef } from 'react'
import { useReveal } from '#/lib/inview'

type Props = {
  /** words wrapped in * render in the serif, lime accent */
  text: string
  className?: string
}

/** The big mixed serif / grotesk statement that rises word by word. */
export function Statement({ text, className = '' }: Props) {
  const el = useRef<HTMLHeadingElement>(null)
  useReveal(el, { stagger: 0.035 })

  return (
    <h2 className={`u-display statement ${className}`} ref={el}>
      {text.split(' ').map((raw, i) => {
        const accent = raw.startsWith('*')
        const word = raw.replace(/\*/g, '')
        return (
          <span className="w" key={`${word}-${i}`}>
            <span className={`reveal ${accent ? 'u-serif u-lime' : ''}`}>{word}</span>
            &nbsp;
          </span>
        )
      })}
    </h2>
  )
}
