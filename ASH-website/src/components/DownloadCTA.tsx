import { Reveal } from './Reveal'
import { BUILD, LINKS } from '#/data/site'
import { Arrow, DownloadIcon, ExternalIcon } from './Icons'

/** The honest acquisition card: direct zip, load unpacked, real links only. */
export function DownloadCTA() {
  return (
    <Reveal className="dl-card" stagger={0.08}>
      <div className="dl-card__row">
        <span className="u-mono fade" style={{ letterSpacing: '0.14em' }}>
          {BUILD.edition} · {BUILD.serial}
        </span>
        <span className="u-mono fade" style={{ opacity: 0.6 }}>
          {BUILD.version} · {BUILD.manifest} · {BUILD.size}
        </span>
      </div>

      <h3 className="fade">
        Two megabytes.
        <br />
        Zero sign-up.
      </h3>

      <p className="u-body fade" style={{ margin: 0, maxWidth: '52ch' }}>
        Asheo ships as a verified .zip you load unpacked — it is not on the Chrome
        Web Store. Free core, no account, nothing phoning home but the licence and
        update check.
      </p>

      <div className="engines fade" aria-label="Supported engines">
        {BUILD.engines.map((e) => (
          <span key={e}>{e}</span>
        ))}
        <span>{BUILD.chromeMin}</span>
      </div>

      <div className="dl-card__row">
        <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
          <a
            className="btn btn--ink"
            href={LINKS.download}
            target="_blank"
            rel="noreferrer"
            data-cursor="Download"
          >
            <DownloadIcon />
            <span>Download Asheo — free</span>
          </a>
          <a
            className="btn btn--ink"
            href={LINKS.downloadDirect}
            target="_blank"
            rel="noreferrer"
            data-cursor="Checksums"
            style={{ background: 'transparent' }}
          >
            <span>Builds &amp; SHA-256 checksums</span>
            <Arrow />
          </a>
        </div>
        <a
          className="u-mono fade"
          href={LINKS.docs}
          target="_blank"
          rel="noreferrer"
          style={{ display: 'inline-flex', gap: '0.4rem', alignItems: 'center' }}
          data-cursor="Read"
        >
          Install docs <ExternalIcon />
        </a>
      </div>

      <div className="dl-meta fade">
        <span>{BUILD.distribution}</span>
        <span>Keys: @AsheoPremiumBot</span>
        <span>Support: @moreash</span>
      </div>
    </Reveal>
  )
}
