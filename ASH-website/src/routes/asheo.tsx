import { createFileRoute } from '@tanstack/react-router'
import { Reveal } from '#/components/Reveal'
import { Words } from '#/components/Words'
import { Topo } from '#/components/Topo'
import { Peel } from '#/components/Peel'
import { Marquee } from '#/components/Marquee'
import { Arrow } from '#/components/Icons'
import { StatsBand } from '#/components/StatsBand'
import { GateWall } from '#/components/GateWall'
import { Ledger } from '#/components/Ledger'
import { Steps } from '#/components/Steps'
import { DownloadCTA } from '#/components/DownloadCTA'
import { LINKS } from '#/data/site'
import { pageMeta } from '#/lib/meta'

export const Route = createFileRoute('/asheo')({
  component: Asheo,
  head: () => ({
    meta: pageMeta({
      title: 'Asheo — the build ASH engineered',
      description:
        'A 2 MB Chromium MV3 developer & QA tool for payment-gateway testing. 41 gateway handlers, 85 signed files, local card generation, zero telemetry.',
    }),
  }),
})

const FEATURES = [
  {
    n: '01',
    title: 'BIN engine',
    body: 'Generate algorithmically valid test numbers from a pattern like 424242xxxxxxxxxx, optionally pinning MM and YYYY. Every output satisfies Luhn and network length rules — a rejection is the gateway talking, not malformed data.',
  },
  {
    n: '02',
    title: 'Gateway detector',
    body: 'A live badge on any checkout it recognises, driven partly by real network signals rather than URL guesses — it says when a swap will actually fire.',
  },
  {
    n: '03',
    title: 'v3 request pipeline',
    body: 'declarativeNetRequest and webRequest interceptors, a gateway registry, request transformers and response hooks — ordered stages, per-gateway routing.',
  },
  {
    n: '04',
    title: 'Local by architecture',
    body: 'Generation runs entirely in the browser. Generated cards, BINs, gateway URLs and intercepted request bodies never leave the device.',
  },
  {
    n: '05',
    title: 'Signed manifest',
    body: '85 files, each pinned with a SHA-256 in build-hashes.json alongside build-hashes.sig. The extension verifies itself at startup; a tampered or superseded build refuses to run.',
  },
  {
    n: '06',
    title: 'Keyboard first',
    body: 'An omnibox keyword — type “asheo”, drive the flow. Popup UI set in IBM Plex and JetBrains Mono, no mouse required.',
  },
]

function Asheo() {
  return (
    <>
      <header className="phero phero--void" data-theme="dark">
        <Topo className="u-lime" />
        <div className="wrap" style={{ position: 'relative' }}>
          <Reveal>
            <span className="u-eyebrow fade" style={{ color: 'var(--lime)' }}>
              The flagship · Edition 01
            </span>
            <h1 className="fade" style={{ marginTop: '1.2rem' }}>
              <Words text="Asheo" step={40} />
              <br />
              <em>by ASH</em>
            </h1>
            <p className="u-body fade" style={{ maxWidth: '56ch', marginTop: '1.6rem', opacity: 0.75 }}>
              A developer &amp; QA tool for payment integrations. It generates
              algorithmically valid test cards from a BIN spec and substitutes them
              into outbound payment requests — so you can exercise a real checkout
              end to end without hand-entering card data.
            </p>
            <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', marginTop: '2rem' }}>
              <a
                className="btn btn--lime fade"
                href={LINKS.download}
                target="_blank"
                rel="noreferrer"
                data-cursor="Install"
              >
                <span>Download — free core</span>
                <Arrow />
              </a>
              <a
                className="btn btn--ghost fade"
                href={LINKS.docs}
                target="_blank"
                rel="noreferrer"
                data-cursor="Read"
              >
                <span>Read the docs</span>
              </a>
            </div>
          </Reveal>
        </div>
      </header>

      <Marquee
        big
        items={['41 handlers', '85 signed files', '2.0 MB', 'MV3', 'Zero telemetry', 'Free core']}
      />

      {/* features ---------------------------------------------------------- */}
      <section className="sec sec--void" data-theme="dark">
        <div className="wrap split-2">
          <Reveal>
            <h2 className="u-display fade" style={{ fontSize: 'clamp(2.2rem,5.6vw,5rem)' }}>
              Built the <span className="u-serif u-lime">stubborn</span> way
            </h2>
            <p className="u-body fade" style={{ opacity: 0.7, marginTop: '1.2rem' }}>
              No growth team, no telemetry dashboard, no roadmap by committee. The
              docs read like an engineering notebook because the build was written
              like one — every gateway has its own matcher, transform and validation
              path.
            </p>
            <p className="u-mono fade" style={{ marginTop: '1.6rem', opacity: 0.55 }}>
              Manifest V3 · minimum Chrome 116 · one build for every Chromium engine
            </p>
          </Reveal>

          <Reveal as="ul" className="feature-list" stagger={0.06}>
            {FEATURES.map((f) => (
              <li className="fade" key={f.n}>
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

      {/* product + ledger --------------------------------------------------- */}
      <section className="sec sec--bone" data-theme="light">
        <div className="wrap split-2" style={{ alignItems: 'center' }}>
          <Reveal className="popup-mock fade">
            <img src="/img/ui-popup.png" alt="The Asheo extension popup: BIN field, gateway checks and active toggle" />
          </Reveal>
          <div>
            <Reveal className="sec__head">
              <h2 className="u-display fade" style={{ fontSize: 'clamp(2rem,5vw,4.4rem)' }}>
                The <span className="u-serif">ledger</span>
              </h2>
            </Reveal>
            <Ledger />
          </div>
        </div>
      </section>

      {/* gateways ----------------------------------------------------------- */}
      <section className="sec sec--void" data-theme="dark" style={{ paddingBlock: 'clamp(4rem,8vw,8rem)' }}>
        <div className="wrap">
          <GateWall />
        </div>
      </section>

      {/* method ------------------------------------------------------------- */}
      <section className="sec sec--bone" data-theme="light">
        <div className="wrap">
          <Reveal className="sec__head">
            <h2 className="u-display sec__title fade">
              Three steps. <span className="u-serif">Twenty seconds.</span>
            </h2>
            <span className="sec__index u-mono fade">Exhibit III — the method</span>
          </Reveal>
          <Steps />
        </div>
      </section>

      {/* stats -------------------------------------------------------------- */}
      <section className="sec sec--bone" data-theme="light" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <StatsBand />
        </div>
      </section>

      {/* the person --------------------------------------------------------- */}
      <section className="sec sec--void" data-theme="dark">
        <div className="wrap split-2" style={{ alignItems: 'center' }}>
          <Reveal>
            <Peel
              className="fade"
              skin="/img/ash-visor-front.png"
              under="/img/ash-face.png"
              alt="Ash, headset on, over his revealed face"
            />
            <p className="u-mono fade" style={{ marginTop: '0.8rem', opacity: 0.55 }}>
              Move over the plate — the headset peels, the character looks back.
            </p>
          </Reveal>
          <Reveal>
            <span className="u-eyebrow fade" style={{ color: 'var(--lime)' }}>
              The person behind it
            </span>
            <h2 className="u-display fade" style={{ fontSize: 'clamp(2rem,5vw,4.2rem)', marginTop: '1rem' }}>
              Still no <span className="u-serif u-lime">face reveal</span>
            </h2>
            <p className="u-body fade" style={{ opacity: 0.75, marginTop: '1.2rem' }}>
              The mascot is Kalos Ash. The engineer behind the keyboard has never
              shown his face. You can verify every line, hash and permission
              instead — the repository is public, the manifest is signed, and the
              network disclosure names the only two things the build phones home
              for.
            </p>
            <a
              className="btn btn--ghost fade"
              href={LINKS.githubTree}
              target="_blank"
              rel="noreferrer"
              data-cursor="Open"
              style={{ marginTop: '1.6rem' }}
            >
              <span>Read the source on GitHub</span>
              <Arrow />
            </a>
          </Reveal>
        </div>
      </section>

      {/* download ----------------------------------------------------------- */}
      <section className="sec sec--bone" data-theme="light" style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <DownloadCTA />
        </div>
      </section>

      <section className="sec cta" data-theme="light">
        <div className="wrap cta__inner">
          <h2 className="u-display cta__big fade">
            <Words text="Two megabytes that *earn* their place." step={22} />
          </h2>
          <a
            className="btn btn--ink fade"
            href={LINKS.download}
            target="_blank"
            rel="noreferrer"
            data-cursor="Install"
          >
            <span>Get Asheo</span>
            <Arrow />
          </a>
        </div>
      </section>
    </>
  )
}
