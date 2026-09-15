import { createFileRoute } from '@tanstack/react-router'
import { pageMeta } from '#/lib/meta'
import { Reveal } from '#/components/Reveal'
import { Topo } from '#/components/Topo'
import { StatsBand } from '#/components/StatsBand'
import { ModuleGrid } from '#/components/ModuleGrid'
import { Pipeline } from '#/components/Pipeline'
import { Permissions } from '#/components/Permissions'
import { Ledger } from '#/components/Ledger'
import { Words } from '#/components/Words'
import { Arrow } from '#/components/Icons'
import { IntegrityRunner } from '#/components/IntegrityRunner'
import { LINKS, BUILD } from '#/data/site'

export const Route = createFileRoute('/in-prod')({
  component: InProd,
  head: () => ({
    meta: pageMeta({
      title: 'In prod — the actual Asheo build',
      description:
        'The real file map of Asheo v1.6.1: v3 request router, BIN generation engine, gateway matchers, 85 SHA-256-signed files and every permission explained.',
    }),
  }),
})

function InProd() {
  return (
    <>
      <header className="phero" data-theme="dark">
        <Topo className="u-lime" />
        <div className="wrap" style={{ position: 'relative' }}>
          <Reveal>
            <span className="u-eyebrow fade" style={{ color: 'var(--lime)' }}>
              Running right now · {BUILD.version}
            </span>
            <h1 className="fade" style={{ marginTop: '1.1rem' }}>
              In
              <br />
              <em>prod</em>
            </h1>
            <p className="u-body fade" style={{ maxWidth: '56ch', marginTop: '1.6rem', opacity: 0.75 }}>
              Not a mockup deck — the actual build, open on GitHub. A v3 request
              router, a BIN generation engine, per-gateway matchers and transformers,
              an offscreen worker, and 85 files each pinned by hash. Read it line by
              line.
            </p>
            <a
              className="btn btn--lime fade"
              href={LINKS.githubTree}
              target="_blank"
              rel="noreferrer"
              data-cursor="Open"
              style={{ marginTop: '2rem' }}
            >
              <span>Open the repository</span>
              <Arrow />
            </a>
          </Reveal>
        </div>
      </header>

      <section className="sec sec--bone" data-theme="light" style={{ paddingBlock: 'clamp(3rem,6vw,6rem)' }}>
        <div className="wrap">
          <StatsBand />
        </div>
      </section>

      {/* live integrity auditor ------------------------------------------ */}
      <section className="sec sec--void" data-theme="dark" style={{ position: 'relative', overflow: 'clip' }}>
        <Topo className="u-lime" />
        <div className="wrap" style={{ position: 'relative' }}>
          <Reveal className="sec__head">
            <h2 className="u-display sec__title fade">
              Attest the <span className="u-serif u-lime">hashes</span>
            </h2>
            <span className="sec__index u-mono fade">SHA-256 build verification</span>
          </Reveal>
          <Reveal>
            <IntegrityRunner />
          </Reveal>
        </div>
      </section>

      {/* request lifecycle */}
      <section className="sec sec--void" data-theme="dark" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal className="sec__head">
            <h2 className="u-display sec__title fade">
              One request, <span className="u-serif u-lime">eight stages</span>
            </h2>
            <span className="sec__index u-mono fade">Traced through real files</span>
          </Reveal>
          <Pipeline />
        </div>
      </section>

      {/* module index */}
      <section className="sec sec--dark" data-theme="dark" style={{ position: 'relative', overflow: 'clip' }}>
        <Topo className="u-lime" />
        <div className="wrap" style={{ position: 'relative' }}>
          <Reveal className="sec__head">
            <h2 className="u-display sec__title fade">
              The file <span className="u-serif u-lime">index</span>
            </h2>
            <span className="sec__index u-mono fade">85 signed files · the ones worth naming</span>
          </Reveal>
          <ModuleGrid />
        </div>
      </section>

      {/* permissions */}
      <section className="sec sec--void" data-theme="dark">
        <div className="wrap">
          <Reveal className="sec__head">
            <h2 className="u-display sec__title fade">
              Every <span className="u-serif u-lime">permission</span>
            </h2>
            <span className="sec__index u-mono fade">manifest.json · nothing unexplained</span>
          </Reveal>
          <Permissions />
          <p className="u-mono fade" style={{ marginTop: '1.6rem', opacity: 0.55 }}>
            Host permissions are &lt;all_urls&gt; because checkouts live on any domain
            — Cloudflare Turnstile, hCaptcha and reCAPTCHA hosts are hard-excluded.
          </p>
        </div>
      </section>

      {/* ledger */}
      <section className="sec sec--bone" data-theme="light">
        <div className="wrap split-2" style={{ alignItems: 'start' }}>
          <Reveal>
            <h2 className="u-display fade" style={{ fontSize: 'clamp(2rem,5.4vw,4.8rem)' }}>
              The signed <span className="u-serif">ledger</span>
            </h2>
            <p className="u-body fade" style={{ opacity: 0.7, marginTop: '1.2rem' }}>
              build-hashes.json pins every file’s SHA-256; build-hashes.sig signs the
              set. At startup the extension attests the files on disk against that
              manifest, and only the current release is authorised. A tampered or
              superseded build fails closed.
            </p>
          </Reveal>
          <Ledger />
        </div>
      </section>

      <section className="sec cta" data-theme="light">
        <div className="wrap cta__inner">
          <h2 className="u-display cta__big fade">
            <Words text="Trust the *hash*, not the slogan." step={22} />
          </h2>
          <a
            className="btn btn--ink fade"
            href={LINKS.github}
            target="_blank"
            rel="noreferrer"
            data-cursor="Audit"
          >
            <span>Audit it yourself on GitHub</span>
            <Arrow />
          </a>
        </div>
      </section>
    </>
  )
}
