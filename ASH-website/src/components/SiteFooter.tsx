import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { NAV, SOCIALS } from '#/data/site'
import { SplitReveal } from './SplitReveal'
import { Topo } from './Topo'

declare global {
  interface Window {
    whop?: { track: (event: string, data?: Record<string, unknown>) => void }
  }
}

export function SiteFooter() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.includes('@')) return
    window.whop?.track('identify', { email })
    window.whop?.track('lead', { source: 'footer_release_notes' })
    setDone(true)
    setEmail('')
  }

  return (
    <footer className="ftr">
      <Topo className="u-lime" />
      <div className="wrap" style={{ position: 'relative' }}>
        <div className="ftr__grid">
          <div className="ftr__col">
            <h4 className="u-eyebrow">Pages</h4>
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} data-cursor="Go">
                {n.label}
              </Link>
            ))}
          </div>

          <div className="ftr__col">
            <h4 className="u-eyebrow">Follow</h4>
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" data-cursor="Open">
                {s.label}
              </a>
            ))}
          </div>

          <div className="ftr__col" style={{ gridColumn: 'span 2' }}>
            <h4 className="u-eyebrow">Release notes</h4>
            <p className="u-body" style={{ margin: 0, opacity: 0.7, maxWidth: '32ch' }}>
              Every Asheo release, written by Ash, sent the day it ships. No other
              email, ever.
            </p>
            <form className="ftr__form" onSubmit={submit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={done ? 'You are on the list' : 'you@domain.com'}
                aria-label="Email address"
                required
              />
              <button type="submit" data-cursor="Send">
                {done ? 'Done' : 'Sign up'}
              </button>
            </form>
          </div>
        </div>

        <SplitReveal as="p" className="ftr__big" color="olive" style={{ color: 'var(--bone)' }}>
          Always
          <br />
          shipping.
        </SplitReveal>

        <div className="ftr__bottom u-mono">
          <span>© {new Date().getFullYear()} Ash. Built and run by one person.</span>
          <a href="mailto:hello@ash.dev" data-cursor="Email">
            Business enquiries
          </a>
        </div>
      </div>
    </footer>
  )
}
