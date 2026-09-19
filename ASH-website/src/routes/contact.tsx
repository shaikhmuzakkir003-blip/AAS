import { createFileRoute } from '@tanstack/react-router'
import { pageMeta } from '#/lib/meta'
import { Reveal } from '#/components/Reveal'
import { Topo } from '#/components/Topo'
import { Peel } from '#/components/Peel'
import { Arrow, ExternalIcon } from '#/components/Icons'
import { Words } from '#/components/Words'
import { LINKS } from '#/data/site'

export const Route = createFileRoute('/contact')({
  component: Contact,
  head: () => ({
    meta: pageMeta({
      title: 'Contact ASH',
      description:
        'One inbox, answered by the person who wrote the code. Keys and support on Telegram @moreash; authorise an install with @AsheoPremiumBot.',
    }),
  }),
})

const CHANNELS = [
  {
    name: 'Telegram — @moreash',
    note: 'Keys & support · bugs looked at here',
    href: LINKS.telegram,
  },
  {
    name: '@AsheoPremiumBot',
    note: 'Authorise a Premium install',
    href: LINKS.premiumBot,
  },
  {
    name: 'GitHub',
    note: 'The whole build, hashes and all',
    href: LINKS.github,
  },
  {
    name: 'asheobypasser.net',
    note: 'Official site, docs & tutorials',
    href: LINKS.site,
  },
]

function Contact() {
  return (
    <>
      <header className="phero" data-theme="dark">
        <Topo className="u-lime" />
        <div className="wrap" style={{ position: 'relative' }}>
          <Reveal>
            <span className="u-eyebrow fade" style={{ color: 'var(--lime)' }}>
              One inbox · no assistant
            </span>
            <h1 className="fade" style={{ marginTop: '1.1rem' }}>
              Talk to
              <br />
              <em>ASH</em>
            </h1>
          </Reveal>
        </div>
      </header>

      <section className="sec sec--bone" data-theme="light">
        <div className="wrap split-2" style={{ alignItems: 'center' }}>
          <Reveal>
            <h2 className="u-display fade" style={{ fontSize: 'clamp(1.9rem,4.4vw,3.6rem)' }}>
              Bug, BIN or <span className="u-serif">build question</span>
            </h2>
            <p className="u-body fade" style={{ opacity: 0.72, marginTop: '1.2rem' }}>
              Asheo bug reports get looked at first. Premium keys and install
              authorisation run through the bot below — both are ASH, not a support
              desk.
            </p>

            <div className="channels" style={{ marginTop: '2rem' }}>
              {CHANNELS.map((c) => (
                <a
                  className="channel fade"
                  key={c.name}
                  href={c.href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="Open"
                >
                  <span className="channel__text">
                    <b>{c.name}</b>
                    <small>{c.note}</small>
                  </span>
                  <i>
                    <Arrow size={18} />
                  </i>
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <Peel
              className="fade"
              skin="/img/ash-visor-side.png"
              under="/img/ash-face.png"
              alt="Ash, headset on, over his revealed face"
            />
            <p className="u-mono fade" style={{ marginTop: '0.9rem', opacity: 0.55, textAlign: 'center' }}>
              Move over the plate · the headset peels, the character looks back
            </p>
          </Reveal>
        </div>
      </section>

      <section className="sec cta" data-theme="light">
        <div className="wrap cta__inner">
          <h2 className="u-display cta__big fade">
            <Words text="Need the build? *Go get it.*" step={22} />
          </h2>
          <a
            className="btn btn--ink fade"
            href={LINKS.download}
            target="_blank"
            rel="noreferrer"
            data-cursor="Download"
          >
            <span>Download Asheo — free core</span>
            <ExternalIcon size={16} />
          </a>
        </div>
      </section>
    </>
  )
}
