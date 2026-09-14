import { createFileRoute } from '@tanstack/react-router'
import { pageMeta } from '#/lib/meta'
import { Reveal } from '#/components/Reveal'
import { SplitReveal } from '#/components/SplitReveal'
import { Topo } from '#/components/Topo'
import { HallOfFame } from '#/components/HallOfFame'
import { Statement } from '#/components/Statement'
import { STATS } from '#/data/site'

export const Route = createFileRoute('/in-prod')({
  component: InProd,
  head: () => ({
    meta: pageMeta({
      title: 'In prod — everything Ash has shipped',
      description:
        'Asheo, the tooling around it and nine years of builds that are still running.',
    }),
  }),
})

const LOG = [
  {
    v: 'v3.0.0',
    when: 'March 2026',
    what: 'Asheo rewritten on a Rust core. Cold start down from 340ms to 41ms.',
  },
  {
    v: 'v2.6.0',
    when: 'November 2025',
    what: 'Cross device sync, end to end encrypted, nothing stored on a server Ash owns.',
  },
  {
    v: 'v2.0.0',
    when: 'February 2025',
    what: 'The command palette. Two weeks later installs doubled.',
  },
  {
    v: 'v1.0.0',
    when: 'June 2023',
    what: 'Shipped on a Tuesday to fourteen users, eleven of whom were his group chat.',
  },
]

function InProd() {
  return (
    <>
      <header className="phero">
        <Topo className="u-lime" />
        <div className="wrap" style={{ position: 'relative' }}>
          <Reveal>
            <SplitReveal as="span" className="u-eyebrow" color="lime">Running right now</SplitReveal>
            <SplitReveal as="h1" className="u-display" color="lime" style={{ marginTop: '1rem', fontSize: 'clamp(3rem, 13vw, 13rem)' }}>
              In
              <br />
              <em>prod</em>
            </SplitReveal>
            <p
              className="u-body reveal"
              style={{ maxWidth: '52ch', marginTop: '1.6rem', opacity: 0.75 }}
            >
              Nine years of builds, every one of them still reachable, most of them
              still maintained. Ash does not do graveyards.
            </p>
          </Reveal>
        </div>
      </header>

      <section className="sec sec--bone">
        <div className="wrap">
          <div className="stats">
            {STATS.map((s) => (
              <div className="stats__item" key={s.label}>
                <b>{s.value}</b>
                <span className="u-mono">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec--dark" style={{ position: 'relative', overflow: 'clip' }}>
        <Topo className="u-lime" />
        <div className="wrap" style={{ position: 'relative' }}>
          <Reveal>
            <SplitReveal as="h2" className="u-display" color="lime" style={{ fontSize: 'clamp(2rem, 6vw, 5.5rem)' }}>
              The
              <span className="u-serif u-lime"> shelf</span>
            </SplitReveal>
          </Reveal>
          <HallOfFame />
        </div>
      </section>

      <section className="sec sec--bone">
        <div className="wrap">
          <Reveal>
            <SplitReveal as="h2" className="u-display" color="olive" style={{ fontSize: 'clamp(2rem, 6vw, 5.5rem)' }}>
              Selected
              <span className="u-serif"> releases</span>
            </SplitReveal>
          </Reveal>
          <Reveal as="ul" className="feature-list" stagger={0.06}>
            {LOG.map((l) => (
              <li className="reveal" key={l.v}>
                <span className="u-mono">{l.v}</span>
                <div>
                  <b>{l.when}</b>
                  <p className="u-body">{l.what}</p>
                </div>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="sec cta">
        <div className="wrap">
          <Statement text="Three hundred and twelve releases. *Zero* incidents anyone had to *find out* about on a status page." />
        </div>
      </section>
    </>
  )
}
