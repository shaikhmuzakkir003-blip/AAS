import { playClick } from '#/lib/sound'
import { asset } from '#/lib/asset'

type Props = {
  src: string
  caption: string
  onClose: () => void
}

export function ShotLightbox({ src, caption, onClose }: Props) {
  const resolvedSrc = asset(src)
  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="lightbox-close"
          onClick={() => {
            playClick()
            onClose()
          }}
          aria-label="Close"
          data-cursor="Close"
        >
          ✕
        </button>
        <div className="lightbox-image-wrap">
          <img src={resolvedSrc} alt={caption} />
        </div>
        <div className="lightbox-bar u-mono">
          <div>
            <b>{caption}</b>
            <span style={{ display: 'block', fontSize: '0.65rem', opacity: 0.6, marginTop: '0.2rem' }}>
              Kalos XYZ Aesthetic · Cinema Aspect Ratio · 35mm grain
            </span>
          </div>
          <a
            href={resolvedSrc}
            download
            className="btn btn--lime"
            onClick={(e) => e.stopPropagation()}
            data-cursor="Save"
          >
            <span>DOWNLOAD STILL</span>
          </a>
        </div>
      </div>
    </div>
  )
}
