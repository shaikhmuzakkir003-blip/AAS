import { createFileRoute } from '@tanstack/react-router'
import { Reveal } from '#/components/Reveal'
import { SplitReveal } from '#/components/SplitReveal'
import { Topo } from '#/components/Topo'
import { Unwrap } from '#/components/Unwrap'
import { Marquee } from '#/components/Marquee'
import { Arrow } from '#/components/Collide'
import { Statement } from '#/components/Statement'
import { ASHEO_FEATURES, STATS } from '#/data/site'
import { pageMeta } from '#/lib/meta'

export const Route = createFileRoute('/asheo')({
  component: Asheo,
  head: () => ({
    meta: pageMeta({
      title: 'Asheo — the extension Ash built',
      description:
        '1.2M installs, 4.9 stars, 312 releases. Local first, keyboard driven, instant.',
    }),
  }),
})

function Asheo() {
  return (
    <>
      <header className="phero">
        <Topo className="u-lime" />
        <div className="wrap" style={{ position: 'relative' }}>
          <Reveal>
            <SplitReveal as="span" className="u-eyebrow" color="lime" style={{ color: 'var(--lime)' }}>
              The flagship · v3.0
            </SplitReveal>
            <SplitReveal as="h1" className="u-display" color="lime" style={{ marginTop: '1rem', fontSize: 'clamp(3rem, 13vw, 13rem)' }}>
              Asheo
              <br />
              <em>by Ash</em>
            </SplitReveal>
            <p
              className="u-body reveal"
              style={{ maxWidth: '52ch', marginTop: '1.6rem', opacity: 0.75 }}
            >
              One developer, one extension, a million and a bit browsers. Asheo does
              the small thing you do forty times a day and gets out of the way.
            </p>
            <a
              className="btn-line btn-line--light reveal"
              href="https://chromewebstore.google.com"
              target="_blank"
              rel="noreferrer"
              data-cursor="Install"
              style={{ marginTop: '1.8rem' }}
              onClick={() =>
                window.whop?.track('view_content', { item: 'asheo_install' })
              }
            >
              <span>Add to browser</span>
              <Arrow />
            </a>
          </Reveal>
        </div>
      </header>

      <Marquee
        items={['1.2M installs', '4.9★ rating', '312 releases', 'Local first', 'Free']}
        big
      />

      <section className="sec sec--bone">
        <div className="wrap split-2">
          <Reveal>
            <SplitReveal as="h2" className="u-display" color="olive" style={{ fontSize: 'clamp(2rem, 5.5vw, 4.5rem)' }}>
              Built the
              <span className="u-serif"> stubborn</span> way
            </SplitReveal>
            <p className="u-body reveal" style={{ opacity: 0.7, marginTop: '1rem' }}>
              No growth team, no telemetry dashboard, no roadmap written by committee.
              Ash reads every review, fixes the thing, ships it, and writes the
              changelog himself.
            </p>
          </Reveal>

          <Reveal as="ul" className="feature-list" stagger={0.06}>
            {ASHEO_FEATURES.map((f) => (
              <li className="reveal" key={f.n}>
                <span className="u-mono">{f.n}</span>
                <div>
                  <b>{f.title}</b>
                  <p className="u-body">{f.body}</p>
                </div>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="sec sec--dark" style={{ position: 'relative', overflow: 'clip' }}>
        <Topo className="u-lime" />
        <div className="wrap split-2" style={{ position: 'relative', alignItems: 'center' }}>
          <Reveal>
            <Unwrap
              className="reveal"
              skin="/img/ash-model.png"
              under="/img/ash-anon.png"
              alt="Ash as his character model"
            />
          </Reveal>
          <Reveal>
            <SplitReveal as="span" className="u-eyebrow" color="lime">The person behind it</SplitReveal>
            <SplitReveal
              as="h2"
              className="u-display"
              color="lime"
              style={{ fontSize: 'clamp(2rem, 5vw, 4.2rem)', marginTop: '1rem' }}
            >
              Still no
              <span className="u-serif u-lime"> face reveal</span>
            </SplitReveal>
            <p className="u-body reveal" style={{ opacity: 0.75, marginTop: '1rem' }}>
              Hover him. The model comes apart and there is nobody underneath, which
              is exactly how Ash likes it. He would rather you judged the release
              notes.
            </p>
          </Reveal>
        </div>
      </section>

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

      <section className="sec cta">
        <div className="wrap">
          <Statement text="Install it once. *Forget* you installed it. That is the whole *pitch*." />
        </div>
      </section>
    </>
  )
}
