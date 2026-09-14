import { createFileRoute, Link } from '@tanstack/react-router'
import { Hero } from '#/components/Hero'
import { Statement } from '#/components/Statement'
import { Terminal } from '#/components/Terminal'
import { Collage } from '#/components/Collage'
import { FaceSplit } from '#/components/FaceSplit'
import { Marquee } from '#/components/Marquee'
import { Reveal } from '#/components/Reveal'
import { Words } from '#/components/Words'
import { Topo } from '#/components/Topo'
import { AshMark } from '#/components/SiteHeader'
import { Arrow } from '#/components/Icons'
import { Pillars } from '#/components/Pillars'
import { StatsBand } from '#/components/StatsBand'
import { Pipeline } from '#/components/Pipeline'
import { GateWall } from '#/components/GateWall'
import { Claims } from '#/components/Claims'
import { Principles } from '#/components/Principles'
import { DownloadCTA } from '#/components/DownloadCTA'
import { STACK, LINKS } from '#/data/site'
import { pageMeta } from '#/lib/meta'

export const Route = createFileRoute('/')({
  component: Home,
  head: () => ({
    meta: pageMeta({
      title: 'ASH — independent engineer, architect of Asheo',
      description:
        'Asheo: a 2 MB Chromium MV3 extension for testing payment gateways. 41 gateway handlers, 85 integrity-signed files, zero trackers. No face reveal — the work is the face.',
    }),
  }),
})

function Home() {
  return (
    <>
      <Hero />

      <Marquee
        big={false}
        items={[
          'Two megabytes',
          '41 gateway handlers',
          '85 SHA-256-signed files',
          'Zero telemetry',
          'Chromium MV3',
          'Free core',
          'Loaded unpacked',
        ]}
      />

      {/* message from ash ------------------------------------------------ */}
      <section className="sec sec--dark" data-theme="dark" style={{ position: 'relative', overflow: 'clip' }}>
        <Topo className="u-lime" />
        <div className="wrap" style={{ position: 'relative' }}>
          <Reveal className="crest">
            <span className="fade" style={{ color: 'var(--lime)' }}>
              <AshMark />
            </span>
            <span className="u-eyebrow fade">Message from ASH — verify it yourself</span>
          </Reveal>
          <Terminal />
        </div>
      </section>

      {/* statement -------------------------------------------------------- */}
      <section className="sec sec--dark" data-theme="dark" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal className="crest">
            <span className="u-eyebrow fade" style={{ opacity: 0.55 }}>
              One engineer · no team · no funding
            </span>
          </Reveal>
          <Statement text="Shipped *small*. Break *nothing*. Let the build do the *talking*." />
        </div>
      </section>

      {/* four pillars ------------------------------------------------------ */}
      <section className="sec sec--dark" data-theme="dark" style={{ position: 'relative', overflow: 'clip' }}>
        <Topo className="u-lime" />
        <div className="wrap" style={{ position: 'relative' }}>
          <Reveal className="sec__head">
            <h2 className="u-display sec__title fade">
              The <span className="u-serif u-lime">kit</span>
            </h2>
            <span className="sec__index u-mono fade">Exhibit II — four pillars</span>
          </Reveal>
          <Pillars />
        </div>
      </section>

      {/* real counters ----------------------------------------------------- */}
      <section className="sec sec--bone" data-theme="light" style={{ paddingBlock: 'clamp(3rem,6vw,6rem)' }}>
        <div className="wrap">
          <StatsBand />
        </div>
      </section>

      {/* split doors ------------------------------------------------------- */}
      <FaceSplit />

      {/* pipeline ---------------------------------------------------------- */}
      <section className="sec sec--void" data-theme="dark" style={{ overflow: 'clip' }}>
        <div className="wrap">
          <Reveal className="sec__head">
            <h2 className="u-display sec__title fade">
              Under the <span className="u-serif u-lime">hood</span>
            </h2>
            <span className="sec__index u-mono fade">One request, eight real files</span>
          </Reveal>
          <Pipeline />
          <Reveal className="crest">
            <Link className="btn btn--ghost fade" to="/in-prod" data-cursor="Open">
              <span>Open the full module index</span>
              <Arrow />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* gateways ---------------------------------------------------------- */}
      <section className="sec sec--void" data-theme="dark" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <GateWall />
        </div>
      </section>

      {/* cinematic b-roll -------------------------------------------------- */}
      <Collage />

      {/* engineering claims ------------------------------------------------ */}
      <section className="sec sec--dark" data-theme="dark">
        <div className="wrap">
          <Reveal className="sec__head">
            <h2 className="u-display sec__title fade">
              Why it reads <span className="u-serif u-lime">expensive</span>
            </h2>
            <span className="sec__index u-mono fade">Evidence, not adjectives</span>
          </Reveal>
          <Claims />
        </div>
      </section>

      {/* on-the-record lines ------------------------------------------------ */}
      <section className="sec sec--bone" data-theme="light">
        <div className="wrap">
          <Reveal className="sec__head">
            <h2 className="u-display sec__title fade">
              On the <span className="u-serif">record</span>
            </h2>
            <span className="sec__index u-mono fade">Verbatim from docs &amp; build copy</span>
          </Reveal>
          <Principles />
        </div>
      </section>

      {/* download ----------------------------------------------------------- */}
      <section className="sec sec--bone" data-theme="light" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal className="sec__head">
            <h2 className="u-display sec__title fade">
              Ready to <span className="u-serif">go OG?</span>
            </h2>
            <span className="sec__index u-mono fade">Access — Exhibit V</span>
          </Reveal>
          <DownloadCTA />
        </div>
      </section>

      {/* cta ---------------------------------------------------------------- */}
      <section className="sec cta" data-theme="light">
        <div className="wrap cta__inner">
          <span className="u-eyebrow fade">The flagship · Edition 01</span>
          <h2 className="u-display cta__big fade">
            <Words text="Install once. *Forget* it's there." step={22} />
          </h2>
          <a
            className="btn btn--ink fade"
            href={LINKS.download}
            target="_blank"
            rel="noreferrer"
            data-cursor="Install"
          >
            <span>Get Asheo — free</span>
            <Arrow />
          </a>
        </div>
      </section>

      {/* stack --------------------------------------------------------------- */}
      <section className="stacksec" data-theme="dark" style={{ paddingInline: 0 }}>
        <div className="wrap" style={{ marginBottom: 'clamp(1.5rem,3vw,3rem)' }}>
          <Reveal>
            <h2 className="u-display fade" style={{ fontSize: 'clamp(2rem,6vw,5rem)' }}>
              What it’s <span className="u-serif u-lime">actually</span> built from
            </h2>
          </Reveal>
        </div>
        <Marquee items={STACK} big className="ticker--void" />
        <Marquee items={[...STACK].reverse()} reverse className="ticker--void" />
      </section>
    </>
  )
}
