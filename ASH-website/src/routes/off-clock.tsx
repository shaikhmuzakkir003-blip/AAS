import { createFileRoute } from '@tanstack/react-router'
import { pageMeta } from '#/lib/meta'
import { Reveal } from '#/components/Reveal'
import { SplitReveal } from '#/components/SplitReveal'
import { Topo } from '#/components/Topo'
import { Statement } from '#/components/Statement'
import { SHOTS } from '#/data/site'

export const Route = createFileRoute('/off-clock')({
  component: OffClock,
  head: () => ({
    meta: pageMeta({
      title: 'Off clock — the other half of Ash',
      description:
        'Talks, side quests and the builds that never made it to main.',
    }),
  }),
})

const NOTES = [
  {
    n: '01',
    title: 'Talks, occasionally',
    body: 'One conference a year, always the same subject: shipping small things often, and why the boring release beats the big one.',
  },
  {
    n: '02',
    title: 'Reviews he did not have to do',
    body: 'Four hundred and some pull requests on other people\'s repos, most of them typo fixes nobody else could be bothered with.',
  },
  {
    n: '03',
    title: 'The 3AM habit',
    body: 'Asheo was written between midnight and four for eleven months. He does not recommend it and would do it again.',
  },
]

function OffClock() {
  return (
    <>
      <header className="phero">
        <Topo className="u-lime" />
        <div className="wrap" style={{ position: 'relative' }}>
          <Reveal>
            <SplitReveal as="span" className="u-eyebrow" color="lime">No changelog for this bit</SplitReveal>
            <SplitReveal as="h1" className="u-display" color="lime" style={{ marginTop: '1rem', fontSize: 'clamp(3rem, 13vw, 13rem)' }}>
              Off
              <br />
              <em>clock</em>
            </SplitReveal>
            <p
              className="u-body reveal"
              style={{ maxWidth: '52ch', marginTop: '1.6rem', opacity: 0.75 }}
            >
              What Ash is doing when nothing is deploying. Which, in fairness, is
              usually still building something.
            </p>
          </Reveal>
        </div>
      </header>

      <section className="sec sec--bone">
        <div className="wrap split-2">
          <Reveal as="ul" className="feature-list" stagger={0.06}>
            {NOTES.map((n) => (
              <li className="reveal" key={n.n}>
                <span className="u-mono">{n.n}</span>
                <div>
                  <b>{n.title}</b>
                  <p className="u-body">{n.body}</p>
                </div>
              </li>
            ))}
          </Reveal>

          <Reveal className="media-frame">
            <img className="reveal" src="/img/ash-stage.png" alt="Ash on stage" />
          </Reveal>
        </div>
      </section>

      <section className="sec sec--dark" style={{ position: 'relative', overflow: 'clip' }}>
        <Topo className="u-lime" />
        <div className="wrap" style={{ position: 'relative' }}>
          <Reveal>
            <SplitReveal as="h2" className="u-display" color="lime" style={{ fontSize: 'clamp(2rem, 6vw, 5.5rem)' }}>
              Frames from
              <span className="u-serif u-lime"> the year</span>
            </SplitReveal>
          </Reveal>
          <Reveal
            className="collage__grid"
            stagger={0.08}
            delay={0.05}
          >
            {SHOTS.map((s) => (
              <div
                className="shot reveal"
                key={s.src}
                data-cursor="View"
                style={{ ['--col' as string]: s.col, ['--ar' as string]: s.ar }}
              >
                <div className="shot__cap u-mono">{s.caption}</div>
                <figure>
                  <img src={s.src} alt={s.caption} loading="lazy" />
                </figure>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="sec cta">
        <div className="wrap">
          <Statement text="The *best* ideas arrive at *4AM* and are gone by breakfast. Write them down." />
        </div>
      </section>
    </>
  )
}
