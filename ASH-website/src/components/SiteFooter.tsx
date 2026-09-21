import { Link } from '@tanstack/react-router'
import { NAV, SOCIALS, LINKS, BUILD } from '#/data/site'
import { Words } from './Words'
import { Topo } from './Topo'
import { Arrow } from './Icons'

export function SiteFooter() {
  return (
    <footer className="ftr" data-theme="dark">
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
            <h4 className="u-eyebrow">Channels</h4>
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" data-cursor="Open">
                {s.label}
              </a>
            ))}
          </div>

          <div className="ftr__col" style={{ gridColumn: 'span 2' }}>
            <h4 className="u-eyebrow">The build</h4>
            <p className="ftr__lead">
              Asheo {BUILD.version} — {BUILD.edition}. Two megabytes, signed
              manifest, no trackers. Free core, loaded unpacked.
            </p>
            <a
              className="btn btn--lime"
              href={LINKS.download}
              target="_blank"
              rel="noreferrer"
              data-cursor="Download"
            >
              <span>Download Asheo — free</span>
              <Arrow />
            </a>
            <p className="u-mono" style={{ marginTop: '1rem', opacity: 0.55 }}>
              Serial {BUILD.serial} · {BUILD.manifest}
            </p>
          </div>
        </div>

        <h2 className="ftr__big">
          <Words text="The work *is* the face." />
        </h2>

        <div className="ftr__bottom u-mono">
          <span>© {new Date().getFullYear()} ASH — built and run by one person.</span>
          <a href={LINKS.telegram} target="_blank" rel="noreferrer" data-cursor="Message">
            Message ASH — @moreash
          </a>
        </div>
      </div>
    </footer>
  )
}
