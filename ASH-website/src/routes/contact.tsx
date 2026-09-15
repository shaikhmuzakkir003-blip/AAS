import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { pageMeta } from '#/lib/meta'
import { Reveal } from '#/components/Reveal'
import { Topo } from '#/components/Topo'
import { Peel } from '#/components/Peel'
import { Arrow, ExternalIcon } from '#/components/Icons'
import { Words } from '#/components/Words'
import { LINKS } from '#/data/site'
import { playChime, playClick } from '#/lib/sound'
import { asset } from '#/lib/asset'

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

const FAQS = [
  {
    q: 'Why load unpacked instead of Chrome Web Store?',
    a: 'Because declarativeNetRequest rules with dynamic pattern generation and local manifest attestation give you complete control. You can audit every single line in your own local filesystem.',
  },
  {
    q: 'Does Asheo collect payment data or telemetry?',
    a: 'Zero telemetry. No analytics SDK, no tracking pixels, no telemetry endpoints. Generated cards and request swaps occur 100% locally in the browser runtime.',
  },
  {
    q: 'How do I authorize a Premium license key?',
    a: 'Open Telegram and send /start to @AsheoPremiumBot. The bot issues your cryptographically signed license token, which is stored in chrome.storage.local.',
  },
  {
    q: 'Which browsers are supported?',
    a: 'Any Chromium 116+ engine: Google Chrome, Microsoft Edge, Brave, Arc, and Opera. A single build works across all five.',
  },
]

function Contact() {
  const [topic, setTopic] = useState<'bug' | 'bin' | 'key'>('bug')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<string | null>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return
    playChime()
    setStatus('Ready to send! Redirecting to Telegram @moreash...')
    const encoded = encodeURIComponent(`[${topic.toUpperCase()}] ${message}`)
    setTimeout(() => {
      window.open(`https://t.me/moreash?text=${encoded}`, '_blank')
      setStatus('Message payload opened in Telegram client.')
    }, 600)
  }

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

      {/* Main contact section */}
      <section className="sec sec--bone" data-theme="light">
        <div className="wrap split-2" style={{ alignItems: 'start' }}>
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

            {/* Direct message composer */}
            <form className="contact-form fade" onSubmit={handleSubmit} style={{ marginTop: '2.5rem' }}>
              <div className="sim-section-label u-mono">COMPOSE DIRECT DISPATCH</div>
              <div className="contact-topic-tabs">
                {(['bug', 'bin', 'key'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    className={`topic-pill ${topic === t ? 'is-active' : ''}`}
                    onClick={() => {
                      playClick()
                      setTopic(t)
                    }}
                  >
                    <span>{t === 'bug' ? 'BUG REPORT' : t === 'bin' ? 'BIN SPEC REQUEST' : 'LICENSE / KEY'}</span>
                  </button>
                ))}
              </div>

              <textarea
                className="contact-textarea u-code"
                placeholder={
                  topic === 'bug'
                    ? 'Describe checkout URL, gateway detected, and observed error...'
                    : topic === 'bin'
                    ? 'Specify target card network (Visa/MC) and required length...'
                    : 'Enter device serial or license query...'
                }
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                required
              />

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '1rem' }}>
                <button type="submit" className="btn btn--ink" data-cursor="Send">
                  <span>DISPATCH TO TELEGRAM</span>
                  <Arrow />
                </button>
                {status && <span className="u-mono" style={{ fontSize: '0.75rem', opacity: 0.7 }}>{status}</span>}
              </div>
            </form>
          </Reveal>

          <Reveal>
            <Peel
              className="fade"
              skin={asset('/img/hero-cap-dark.jpg')}
              under={asset('/img/anon-void.jpg')}
              alt="Kalos Ash over the anonymous figure"
            />
            <p className="u-mono fade" style={{ marginTop: '0.9rem', opacity: 0.55, textAlign: 'center' }}>
              Move over the plate · the architect stays anonymous
            </p>

            {/* Verified FAQ Section */}
            <div className="faq-box" style={{ marginTop: '2.4rem' }}>
              <h3 className="u-eyebrow" style={{ marginBottom: '1rem' }}>FREQUENTLY AUDITED QUESTIONS</h3>
              {FAQS.map((faq, idx) => (
                <div className="faq-item" key={faq.q}>
                  <button
                    type="button"
                    className="faq-question"
                    onClick={() => {
                      playClick()
                      setOpenFaq(openFaq === idx ? null : idx)
                    }}
                  >
                    <span>{faq.q}</span>
                    <i>{openFaq === idx ? '−' : '+'}</i>
                  </button>
                  {openFaq === idx && (
                    <div className="faq-answer">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
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
