import { Reveal } from './Reveal'
import { PILLARS } from '#/data/site'

/** The Kit — four pillars of the build, with real spec facts. */
export function Pillars() {
  return (
    <Reveal className="pillars" stagger={0.1}>
      {PILLARS.map((p) => (
        <article className="pillar fade" key={p.n}>
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
