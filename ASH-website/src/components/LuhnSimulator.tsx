import { useState } from 'react'
import {
  GATEWAY_PRESETS,
  generateFromPattern,
  validateLuhn,
  formatCardNumber,
} from '#/lib/luhn'
import { playChime, playClick } from '#/lib/sound'
import { HoloCard } from './HoloCard'

export function LuhnSimulator() {
  const [selectedPreset, setSelectedPreset] = useState(0)
  const [pattern, setPattern] = useState(GATEWAY_PRESETS[0].bin)
  const [generatedNumber, setGeneratedNumber] = useState(() =>
    generateFromPattern(GATEWAY_PRESETS[0].bin),
  )
  const [copied, setCopied] = useState(false)
  const [swapActive, setSwapActive] = useState(true)

  const preset = GATEWAY_PRESETS[selectedPreset]

  const handleSelectPreset = (index: number) => {
    playClick()
    setSelectedPreset(index)
    const p = GATEWAY_PRESETS[index].bin
    setPattern(p)
    setGeneratedNumber(generateFromPattern(p))
  }

  const handleGenerate = () => {
    playChime()
    setGeneratedNumber(generateFromPattern(pattern))
  }

  const handleCopy = () => {
    playClick()
    navigator.clipboard?.writeText(generatedNumber)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const isValid = validateLuhn(generatedNumber)

  // Calculate detailed Luhn breakdown digits
  const digits = generatedNumber.replace(/\D/g, '').split('').map(Number)
  const checkDigit = digits.length > 0 ? digits[digits.length - 1] : 0

  return (
    <div className="sim-panel">
      <div className="sim-head">
        <div className="sim-badge">
          <span className="live-dot" />
          <span>IN-BROWSER ENGINE SIMULATOR · LOCAL EXECUTION</span>
        </div>
        <div className="sim-switches">
          <button
            type="button"
            className={`sim-toggle ${swapActive ? 'is-on' : ''}`}
            onClick={() => {
              playClick()
              setSwapActive(!swapActive)
            }}
          >
            <span>INTERCEPTION: {swapActive ? 'ACTIVE (DNR)' : 'BYPASS'}</span>
          </button>
        </div>
      </div>

      <div className="sim-grid">
        {/* Left Column: Preset selector & BIN Input */}
        <div className="sim-left">
          <div className="sim-section-label u-mono">1. SELECT GATEWAY TARGET</div>
          <div className="preset-tabs">
            {GATEWAY_PRESETS.map((p, idx) => (
              <button
                key={p.name}
                type="button"
                className={`preset-tab ${selectedPreset === idx ? 'is-active' : ''}`}
                onClick={() => handleSelectPreset(idx)}
                data-cursor="Select"
              >
                <b>{p.name}</b>
                <small className="u-mono">{p.network}</small>
              </button>
            ))}
          </div>

          <div className="sim-section-label u-mono" style={{ marginTop: '1.4rem' }}>
            2. CONFIGURE BIN PATTERN SPEC
          </div>
          <div className="bin-input-row">
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              className="bin-input u-code"
              placeholder="e.g. 424242xxxxxxxxxx"
              spellCheck={false}
            />
            <button
              type="button"
              className="btn btn--lime"
              onClick={handleGenerate}
              data-cursor="Generate"
            >
              <span>GENERATE</span>
            </button>
          </div>

          <div className="sim-meta-row u-mono">
            <span>Pattern Length: {pattern.length}</span>
            <span>Check Digit: [{checkDigit}]</span>
            <span className={isValid ? 'u-lime' : ''}>
              Luhn Validation: {isValid ? '✓ PASSED' : '✕ INVALID'}
            </span>
          </div>

          {/* Real-time Request Pipeline payload preview */}
          <div className="sim-section-label u-mono" style={{ marginTop: '1.4rem' }}>
            3. OUTBOUND REQUEST HOOK PREVIEW (SWAP IN FLIGHT)
          </div>
          <div className="sim-payload u-code">
            <div className="payload-line">
              <span className="p-key">ENDPOINT:</span>{' '}
              <span className="p-str">{preset.samplePayload.gateway}</span>
            </div>
            <div className="payload-line">
              <span className="p-key">HANDLER:</span>{' '}
              <span className="p-num">{preset.samplePayload.method}</span>
            </div>
            <div className="payload-line">
              <span className="p-key">REWRITTEN_CARD:</span>{' '}
              <span className="p-val">{formatCardNumber(generatedNumber)}</span>
            </div>
            <div className="payload-line">
              <span className="p-key">INTEGRITY_STATUS:</span>{' '}
              <span className="p-ok">SHA-256 VERIFIED · NO NETWORK TELEMETRY</span>
            </div>
          </div>
        </div>

        {/* Right Column: Holographic 3D Card Preview */}
        <div className="sim-right">
          <HoloCard initialBin={pattern} />

          <div className="sim-actions">
            <button
              type="button"
              className="btn btn--ghost"
              onClick={handleCopy}
              data-cursor="Copy"
            >
              <span>{copied ? '✓ COPIED CARD' : 'COPY TEST CARD'}</span>
            </button>
            <a
              href="https://asheobypasser.net/#download"
              target="_blank"
              rel="noreferrer"
              className="btn btn--lime"
              data-cursor="Get"
            >
              <span>GET 2.0 MB BUILD</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
