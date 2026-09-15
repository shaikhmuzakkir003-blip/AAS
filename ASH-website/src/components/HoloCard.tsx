import { useState, useRef } from 'react'
import { generateFromPattern, formatCardNumber, validateLuhn } from '#/lib/luhn'
import { playChime, playClick } from '#/lib/sound'

type Props = {
  initialBin?: string
  className?: string
}

export function HoloCard({ initialBin = '424242xxxxxxxxxx', className = '' }: Props) {
  const [number, setNumber] = useState(() => generateFromPattern(initialBin))
  const [copied, setCopied] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotX, setRotX] = useState(0)
  const [rotY, setRotY] = useState(0)
  const [glareX, setGlareX] = useState(50)
  const [glareY, setGlareY] = useState(50)

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const px = (x / rect.width) * 100
    const py = (y / rect.height) * 100
    setGlareX(px)
    setGlareY(py)

    const rx = ((y - rect.height / 2) / (rect.height / 2)) * -12
    const ry = ((x - rect.width / 2) / (rect.width / 2)) * 14
    setRotX(rx)
    setRotY(ry)
  }

  const handlePointerLeave = () => {
    setRotX(0)
    setRotY(0)
    setGlareX(50)
    setGlareY(50)
  }

  const regenerate = () => {
    playChime()
    const newNum = generateFromPattern(initialBin)
    setNumber(newNum)
  }

  const copyToClipboard = () => {
    playClick()
    navigator.clipboard?.writeText(number)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const isValid = validateLuhn(number)

  return (
    <div
      className={`holo-card-wrap ${className}`}
      style={{ perspective: '1000px' }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div
        ref={cardRef}
        className="holo-card"
        style={{
          transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
          transition: 'transform 0.12s ease-out',
        }}
      >
        {/* Holographic foil glare reflection */}
        <div
          className="holo-glare"
          style={{
            background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(210, 255, 0, 0.35) 0%, rgba(0, 255, 230, 0.15) 30%, transparent 70%)`,
          }}
        />

        {/* Top row: Brand & verification */}
        <div className="holo-top">
          <div className="holo-brand">
            <span className="holo-tag">ASHEO TEST SPEC</span>
            <span className="holo-edition">EDITION 01 · MV3</span>
          </div>
          <div className="holo-chip-wrap">
            <svg className="holo-contactless" width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10M8 5a11.3 11.3 0 0 1 3 7 11.3 11.3 0 0 1-3 7M4 8a7.3 7.3 0 0 1 2 4 7.3 7.3 0 0 1-2 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <div className="holo-chip">
              <div className="holo-chip-lines" />
            </div>
          </div>
        </div>

        {/* Card Number display */}
        <div className="holo-body">
          <div className="holo-label">LUHN-VALID CANDIDATE</div>
          <div className="holo-number" onClick={copyToClipboard} title="Click to copy">
            {formatCardNumber(number)}
          </div>
        </div>

        {/* Bottom row: metadata & actions */}
        <div className="holo-foot">
          <div>
            <span className="holo-foot-label">VALID THRU</span>
            <span className="holo-foot-val">12/28</span>
          </div>
          <div>
            <span className="holo-foot-label">CVC</span>
            <span className="holo-foot-val">888</span>
          </div>
          <div className="holo-status">
            <span className={`status-dot ${isValid ? 'is-valid' : ''}`} />
            <span>{isValid ? 'LUHN OK' : 'CHECK'}</span>
          </div>
          <button
            type="button"
            className="holo-regen-btn"
            onClick={regenerate}
            title="Generate new Luhn card"
            data-cursor="Swap"
          >
            ⚡ SWAP
          </button>
        </div>

        {copied && <div className="holo-copied-pill">COPIED TO CLIPBOARD</div>}
      </div>
    </div>
  )
}
