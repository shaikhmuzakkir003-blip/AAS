import { Reveal } from './Reveal'
import { Counter } from './Counter'
import { STATS } from '#/data/site'
import { playClick } from '#/lib/sound'

/** Animated counters for structural, verifiable build facts only. */
export function StatsBand() {
  return (
    <Reveal className="stats" stagger={0.06}>
      {STATS.map((s) => (
        <div
          className="stats__item fade"
          key={s.label}
          onMouseEnter={() => playClick()}
          data-cursor="Audit"
        >
          <div className="stats__corner-reticle" aria-hidden="true" />
          <b>
            <Counter value={s.value} suffix={s.suffix} />
          </b>
          <span className="u-mono">{s.label}</span>
        </div>
      ))}
    </Reveal>
  )
}
