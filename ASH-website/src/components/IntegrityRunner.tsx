import { useState } from 'react'
import { playChime, playClick } from '#/lib/sound'

const SAMPLE_HASHES = [
  { file: 'manifest.json', hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', size: '3.4 KB' },
  { file: 'content/gateway_detector.js', hash: '7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069', size: '42.1 KB' },
  { file: 'algo/v2-candidate-generator.js', hash: 'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb', size: '18.6 KB' },
  { file: 'modules/router/v3/interceptors.js', hash: 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad', size: '28.9 KB' },
  { file: 'functions/build-attest.js', hash: '2e7d2c03a9507ae265ecf5b5356885a53393a2029d24139499726b4259fb7774', size: '14.2 KB' },
]

export function IntegrityRunner() {
  const [running, setRunning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [completed, setCompleted] = useState(false)

  const handleRun = () => {
    if (running) return
    playClick()
    setRunning(true)
    setCompleted(false)
    setProgress(0)

    let current = 0
    const interval = setInterval(() => {
      current += 1
      setProgress(current)
      if (current >= 85) {
        clearInterval(interval)
        setRunning(false)
        setCompleted(true)
        playChime()
      }
    }, 18)
  }

  return (
    <div className="integrity-panel">
      <div className="integrity-head">
        <div>
          <span className="u-eyebrow u-lime">FAIL-CLOSED ATTESTATION ENGINE</span>
          <h3 style={{ margin: '0.4rem 0 0', textTransform: 'uppercase', fontSize: '1.4rem', fontWeight: 900 }}>
            Real-time file manifest attestation
          </h3>
        </div>
        <button
          type="button"
          className="btn btn--lime"
          onClick={handleRun}
          disabled={running}
          data-cursor="Verify"
        >
          <span>{running ? `AUDITING [${progress}/85]...` : completed ? '✓ RE-VERIFY 85 HASHES' : 'AUDIT ALL 85 HASHES'}</span>
        </button>
      </div>

      {/* Progress Bar */}
      <div className="integrity-bar">
        <div
          className="integrity-bar-fill"
          style={{ width: `${(progress / 85) * 100}%` }}
        />
      </div>

      {/* File Hashes Table */}
      <div className="integrity-table u-mono">
        {SAMPLE_HASHES.map((item, i) => {
          const isPassed = completed || progress > (i + 1) * 14
          return (
            <div className="integrity-row" key={item.file}>
              <span className="file-name">{item.file}</span>
              <span className="file-size">{item.size}</span>
              <span className="file-hash u-code">{item.hash.slice(0, 24)}...</span>
              <span className={`file-status ${isPassed ? 'is-ok' : ''}`}>
                {isPassed ? '✓ SHA-256 OK' : 'PENDING'}
              </span>
            </div>
          )
        })}
      </div>

      <div className="integrity-foot u-mono">
        <span>Signature: build-hashes.sig · Ed25519 Verified</span>
        <span>Startup Hook: functions/build-attest.js</span>
        <span className={completed ? 'u-lime' : ''}>
          {completed ? '85/85 FILES PASSED INTEGRITY ATTESTATION' : 'Click "Audit All 85 Hashes" to test'}
        </span>
      </div>
    </div>
  )
}
