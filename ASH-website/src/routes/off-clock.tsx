import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { pageMeta } from '#/lib/meta'
import { Reveal } from '#/components/Reveal'
import { Topo } from '#/components/Topo'
import { Statement } from '#/components/Statement'
import { Reel } from '#/components/Reel'
import { Shot } from '#/components/Shot'
import { Marquee } from '#/components/Marquee'
import { Claims } from '#/components/Claims'
import { ShotLightbox } from '#/components/ShotLightbox'
import { SHOTS, LINKS } from '#/data/site'
import { playClick } from '#/lib/sound'
import { asset } from '#/lib/asset'

export const Route = createFileRoute('/off-clock')({
  component: OffClock,
  head: () => ({
    meta: pageMeta({
      title: 'Off clock — the person behind ASHEO, still unnamed',
      description:
        'No team, no funding, no shortcuts. The half of the story with no changelog — handcrafted in the dark, built solo, early to it always.',
    }),
  }),
})

/** Lines ASH published himself on asheobypasser.net — not invented testimonials. */
const OWN_LINES = [
  'No team. No funding. No shortcuts.',
  'Handcrafted in the dark.',
  'Built for the ones who ship.',
  'Early to it. Always.',
  'Faster. Cleaner. Unstoppable.',
  'Obsessed beyond reason.',
  'Your data stays yours.',
  'Two megabytes of intent.',
]

const DEV_MILESTONES = [
  { date: '2024 · Q1', title: 'The First Luhn Engine', note: 'Single-file vanilla JS script replacing 16-digit form fields in Chrome DevTools.' },
  { date: '2024 · Q3', title: 'Chromium MV3 Rewrite', note: 'Migrated entirely to declarativeNetRequest rules with offscreen document crypto.' },
  { date: '2025 · Q2', title: '41 Gateway Matrix', note: 'Expanded coverage from 4 major processors to 41 distinct checkout handlers.' },
  { date: '2026 · Current', title: 'Edition 01 Release', note: 'Asheo v1.6.1: 85 SHA-256-signed files, zero trackers, fail-closed startup lock.' },
]

function OffClock() {
  const [activeShot, setActiveShot] = useState<{ src: string; caption: string } | null>(null)

  return (
    <>
      <header className="phero" data-theme="dark">
        <div className="phero__bg">
          <Reel src={asset('/video/rooftop.mp4')} poster={asset('/img/ash-stage.jpg')} alt="" />
        </div>
        <Topo className="u-lime" />
        <div className="wrap" style={{ position: 'relative' }}>
          <Reveal>
            <span className="u-eyebrow fade" style={{ color: 'var(--lime)' }}>
              No changelog for this bit
            </span>
            <h1 className="fade" style={{ marginTop: '1.1rem' }}>
              Off
              <br />
              <em>clock</em>
            </h1>
            <p className="u-body fade" style={{ maxWidth: '52ch', marginTop: '1.6rem', opacity: 0.8 }}>
              The half with no release notes. The mascot travels a Kalos-inspired
              world of glass stations and blue-hour rooftops. The architect stays
              faceless — and keeps building.
            </p>
          </Reveal>
        </div>
      </header>

      <Marquee
        big
        reverse
        items={['Built solo', 'Handcrafted in the dark', 'No shortcuts', 'Early to it, always']}
        className="ticker--void"
      />

      {/* gallery */}
      <section className="sec sec--dark" data-theme="dark" style={{ position: 'relative', overflow: 'clip' }}>
        <Topo className="u-lime" />
        <div className="wrap" style={{ position: 'relative' }}>
          <Reveal className="sec__head">
            <h2 className="u-display sec__title fade">
              Frames from <span className="u-serif u-lime">the world</span>
            </h2>
            <span className="sec__index u-mono fade">Click to inspect still frame</span>
          </Reveal>

          <Reveal className="gallery" stagger={0.08}>
            {SHOTS.map((s) => {
              const video = 'video' in s ? s.video : undefined
              return (
                <div
                  key={s.src}
                  onClick={() => {
                    playClick()
                    setActiveShot({ src: s.src, caption: s.caption })
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <Shot
                    src={s.src}
                    video={video}
                    caption={s.caption}
                    ar={s.ar}
                    speed={s.speed}
                    className="fade"
                  />
                </div>
              )
            })}
          </Reveal>
        </div>
      </section>

      {/* dev milestones timeline */}
      <section className="sec sec--void" data-theme="dark">
        <div className="wrap">
          <Reveal className="sec__head">
            <h2 className="u-display sec__title fade">
              The solo <span className="u-serif u-lime">timeline</span>
            </h2>
            <span className="sec__index u-mono fade">Handcrafted from commit 001</span>
          </Reveal>
          <Reveal className="timeline-grid" stagger={0.08}>
            {DEV_MILESTONES.map((m) => (
              <div className="timeline-card fade" key={m.date}>
                <span className="u-mono u-lime">{m.date}</span>
                <h3>{m.title}</h3>
                <p>{m.note}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* his own lines */}
      <section className="sec sec--dark" data-theme="dark">
        <div className="wrap">
          <Reveal className="sec__head">
            <h2 className="u-display sec__title fade">
              In his <span className="u-serif u-lime">own words</span>
            </h2>
            <span className="sec__index u-mono fade">From asheobypasser.net, verbatim</span>
          </Reveal>
          <Reveal className="cards" stagger={0.07}>
            {OWN_LINES.map((line) => (
              <blockquote className="cardq fade" key={line}>
                <span className="cardq__mk" aria-hidden="true">
                  “
                </span>
                <p>{line}</p>
                <footer>ASH — Edition 01 copy</footer>
              </blockquote>
            ))}
          </Reveal>
        </div>
      </section>

      {/* solo build claims */}
      <section className="sec sec--void" data-theme="dark">
        <div className="wrap">
          <Reveal className="sec__head">
            <h2 className="u-display sec__title fade">
              Built solo, <span className="u-serif u-lime">not outsourced</span>
            </h2>
          </Reveal>
          <Claims />
        </div>
      </section>

      <section className="sec cta" data-theme="light">
        <div className="wrap cta__inner">
          <Statement text="Not for *everyone*. For the ones who *ship*." />
          <a
            className="btn btn--ink"
            href={LINKS.telegram}
            target="_blank"
            rel="noreferrer"
            data-cursor="Message"
          >
            <span>Message ASH — @moreash</span>
          </a>
        </div>
      </section>

      {/* Lightbox Modal */}
      {activeShot && (
        <ShotLightbox
          src={activeShot.src}
          caption={activeShot.caption}
          onClose={() => setActiveShot(null)}
        />
      )}
    </>
  )
}
