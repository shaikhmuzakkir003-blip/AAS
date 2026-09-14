import { createFileRoute, Link } from '@tanstack/react-router'
import { Hero } from '#/components/Hero'
import { Statement } from '#/components/Statement'
import { Terminal } from '#/components/Terminal'
import { Collage } from '#/components/Collage'
import { Collide } from '#/components/Collide'
import { HallOfFame } from '#/components/HallOfFame'
import { Marquee } from '#/components/Marquee'
import { Reveal } from '#/components/Reveal'
import { RevealGrid } from '#/components/RevealGrid'
import { SplitReveal } from '#/components/SplitReveal'
import { Topo } from '#/components/Topo'
import { AshMark } from '#/components/SiteHeader'
import { Arrow } from '#/components/Collide'
import { PRAISE, STACK, STATS } from '#/data/site'
import { pageMeta } from '#/lib/meta'

export const Route = createFileRoute('/')({
  component: Home,
  head: () => ({
    meta: pageMeta({
      title: 'Ash — developer, builder of Asheo',
      description:
        'Nine years of shipped work, 1.2M Asheo installs, and still no face reveal. Hover the model and see who is underneath.',
    }),
  }),
})

function Home() {
  return (
    <>
      <Hero />

      {/* message from ash ------------------------------------------------ */}
      <section className="sec sec--dark" style={{ position: 'relative', overflow: 'clip' }}>
        <Topo className="u-lime" />
        <div className="wrap" style={{ position: 'relative' }}>
          <Reveal className="crest">
            <span className="reveal u-lime">
              <AshMark />
            </span>
            <SplitReveal as="span" className="u-eyebrow" color="lime">
              Message from Ash
            </SplitReveal>
          </Reveal>
          <Terminal />
        </div>
      </section>

      {/* the statement ---------------------------------------------------- */}
      <section className="sec sec--dark" style={{ paddingTop: 0 }}>
        <div className="wrap">
            <SplitReveal as="div" className="crest u-eyebrow" color="lime" style={{ opacity: 0.6 }}>
              Independent since 2019
            </SplitReveal>
          <Statement text="*Shipping* small, breaking nothing, carrying it all on one pair of hands. Defining a *craft* in software on and off the clock." />
        </div>
      </section>

      <Collage />

      {/* numbers ---------------------------------------------------------- */}
      <section className="sec sec--bone">
        <div className="wrap">
          <RevealGrid className="stats" color="lime">
            {STATS.map((s) => (
              <div className="stats__item" key={s.label}>
                <b>{s.value}</b>
                <span className="u-mono">{s.label}</span>
              </div>
            ))}
          </RevealGrid>
        </div>
      </section>

      <Collide />

      {/* hall of fame ------------------------------------------------------ */}
      <section className="sec sec--dark" style={{ position: 'relative', overflow: 'clip' }}>
        <Topo className="u-lime" />
        <div className="wrap" style={{ position: 'relative' }}>
          <Reveal>
            <SplitReveal as="h2" className="u-display" color="lime" style={{ fontSize: 'clamp(2.4rem, 8vw, 8rem)' }}>
                Builds
                <br />
                <span className="u-serif u-lime">Hall of fame</span>
              </SplitReveal>
            <SplitReveal
              as="p"
              className="u-body"
              color="lime"
              style={{ maxWidth: '46ch', marginTop: '1.4rem', opacity: 0.72 }}
            >
              From a one file fix for an annoying tab to an extension a million
              people open every morning, Ash has never shipped a build he would not
              put his name on.
            </SplitReveal>
          </Reveal>

          <HallOfFame />

          <Reveal className="crest" delay={0.1}>
            <p className="u-body reveal" style={{ marginBottom: 0, opacity: 0.72 }}>
              See the whole shelf, releases and all
            </p>
            <Link to="/in-prod" className="btn-line btn-line--light reveal" data-cursor="Open">
              <span>View in prod</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* praise ------------------------------------------------------------ */}
      <section className="sec sec--bone">
        <div className="wrap">
          <Reveal>
            <SplitReveal
              as="h2"
              className="u-display"
              color="olive"
              style={{ fontSize: 'clamp(2.2rem, 7vw, 6.5rem)', marginBottom: '0.6rem' }}
            >
              What they
              <span className="u-serif" style={{ color: 'var(--olive)' }}>
                {' '}
                say
              </span>
            </SplitReveal>
            <SplitReveal as="p" className="u-body" color="olive" style={{ maxWidth: '44ch', opacity: 0.7 }}>
              Eighteen thousand reviews, a support inbox he answers himself, and the
              same line coming back over and over: it just works.
            </SplitReveal>
          </Reveal>

          <Reveal className="praise" stagger={0.07} delay={0.05}>
            {PRAISE.map((p) => (
              <blockquote className="praise__card reveal" key={p.by}>
                <div className="stars" aria-hidden="true">
                  ★★★★★
                </div>
                <p>{p.quote}</p>
                <footer className="praise__by u-mono">{p.by}</footer>
              </blockquote>
            ))}
          </Reveal>
        </div>
      </section>

      {/* asheo cta --------------------------------------------------------- */}
      <section className="sec cta">
        <div className="wrap">
          <Reveal className="cta__inner" stagger={0.06}>
            <span className="u-eyebrow reveal">The flagship</span>
            <h2
              className="u-display reveal"
              style={{ fontSize: 'clamp(3rem, 12vw, 12rem)', lineHeight: 0.82 }}
            >
              Asheo
            </h2>
            <p className="u-body reveal" style={{ maxWidth: '48ch', margin: 0 }}>
              The extension that made his name. Local first, keyboard driven, under
              sixteen milliseconds to anything. Free, and quietly the best thing in
              your browser.
            </p>
            <Link to="/asheo" className="btn-line btn-line--dark reveal" data-cursor="Install">
              <span>Get Asheo</span>
              <Arrow />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* stack marquee ------------------------------------------------------ */}
      <section className="sec sec--ink" style={{ paddingInline: 0 }}>
        <div className="wrap" style={{ marginBottom: 'clamp(1.5rem, 3vw, 3rem)' }}>
          <Reveal>
            <h2
              className="u-display reveal"
              style={{ fontSize: 'clamp(2rem, 6vw, 5rem)' }}
            >
              The stack he
              <span className="u-serif u-lime"> trusts</span>
            </h2>
          </Reveal>
        </div>
        <Marquee items={STACK} big />
        <Marquee items={[...STACK].reverse()} reverse />
      </section>
    </>
  )
}
