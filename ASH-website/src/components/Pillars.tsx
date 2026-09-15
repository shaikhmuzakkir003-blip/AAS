import { useRef } from 'react'
import { Reveal } from './Reveal'
import { PILLARS } from '#/data/site'
import { playClick } from '#/lib/sound'

/** The Kit — four pillars of the build, with interactive spotlight physics. */
export function Pillars() {
  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    el.style.setProperty('--px', `${x}px`)
    el.style.setProperty('--py', `${y}px`)
  }

  return (
    <Reveal className="pillars" stagger={0.08}>
      {PILLARS.map((p) => (
        <article
          className="pillar fade"
          key={p.n}
          onPointerMove={handlePointerMove}
          onMouseEnter={() => playClick()}
          data-cursor="Inspect"
        >
          <div className="pillar__spotlight" aria-hidden="true" />
          <span className="pillar__n u-mono">
            {p.n} — {p.kicker}
          </span>
          <h3>{p.title}</h3>
          <p className="u-body">{p.body}</p>
          <div className="pillar__meta">
            {p.meta.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
        </article>
      ))}
    </Reveal>
  )
}
