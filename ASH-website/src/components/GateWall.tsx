import { Reveal } from './Reveal'
import { Words } from './Words'
import { GATEWAYS } from '#/data/site'

/** 41 handlers ship; these are the gateways the official docs name. */
export function GateWall() {
  return (
    <div className="gatewall">
      <Reveal className="gatewall__big">
        <Words text="*41* gateway handlers" step={36} />
      </Reveal>
      <Reveal className="gatechips" stagger={0.03}>
        {GATEWAYS.map((g) => (
          <span className="gatechip fade" key={g}>
            {g}
          </span>
        ))}
        <span className="gatechip gatechip--more fade">+ 23 more in the registry</span>
      </Reveal>
      <p className="u-mono fade" style={{ textAlign: 'center', marginTop: '1.6rem', opacity: 0.55 }}>
        Hosted &amp; custom checkouts · detection badge driven by real network signals
      </p>
    </div>
  )
}
