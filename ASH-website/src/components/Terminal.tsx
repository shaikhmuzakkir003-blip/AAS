import { useRef, useState } from 'react'
import { BUILD, GATEWAYS } from '#/data/site'
import { playKeystroke, playClick } from '#/lib/sound'

type CommandHistory = {
  command?: string
  output: string[]
  isPrompt?: boolean
}

const PRESET_CMDS = [
  { label: 'sha256sum', cmd: 'sha256sum -c build-hashes.json' },
  { label: 'cat manifest', cmd: 'cat manifest.json' },
  { label: 'gateways', cmd: 'asheo --list-gateways' },
  { label: 'whoami', cmd: 'whoami' },
  { label: 'clear', cmd: 'clear' },
]

export function Terminal() {
  const box = useRef<HTMLDivElement>(null)
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      command: '$ cat manifest.json | head -n 8',
      output: [
        '  "manifest_version": 3,',
        `  "name": "${BUILD.product}",   "version": "${BUILD.version}",`,
        `  "minimum_chrome_version": "116",`,
        `  "package_size": "${BUILD.size}",`,
        '  "permissions": 16,',
        '  "trackers": 0',
      ],
    },
    {
      command: '$ sha256sum -c build-hashes.json',
      output: [
        '  85 files verified … 85 files OK',
        '  signature: build-hashes.sig ✓ verified with local pubkey',
        '  status: FAIL-CLOSED integrity lock engaged',
      ],
    },
    {
      command: '# no face reveal. the work is the face.',
      output: [],
    },
  ])
  const [inputVal, setInputVal] = useState('')

  const handleCommand = (raw: string) => {
    const cmd = raw.trim()
    if (!cmd) return
    playClick()

    if (cmd.toLowerCase() === 'clear') {
      setHistory([])
      setInputVal('')
      return
    }

    let result: string[] = []
    const lower = cmd.toLowerCase()

    if (lower.includes('manifest')) {
      result = [
        '  "manifest_version": 3,',
        `  "name": "Asheo",   "version": "${BUILD.version}",`,
        '  "permissions": ["storage", "declarativeNetRequest", "webRequest", "scripting", ...]',
        `  "content_security_policy": "${BUILD.csp}"`,
      ]
    } else if (lower.includes('sha256') || lower.includes('hash')) {
      result = [
        '  [OK] content/gateway_detector.js (c7fa43...)',
        '  [OK] algo/v2-candidate-generator.js (9b2e11...)',
        '  [OK] modules/router/v3/interceptors.js (e412af...)',
        '  ==> 85/85 SHA-256 verified. Signature matches build-hashes.sig ✓',
      ]
    } else if (lower.includes('gateway') || lower.includes('list')) {
      result = [
        `  Registered gateways (41 total):`,
        `  ${GATEWAYS.slice(0, 10).join(', ')},`,
        `  ${GATEWAYS.slice(10).join(', ')} ... + 23 in-line handlers`,
      ]
    } else if (lower.includes('whoami')) {
      result = [
        '  ASH // Independent engineer & architect of Asheo.',
        '  No face reveal. The work is the face.',
        '  Serial: ' + BUILD.serial,
      ]
    } else if (lower.includes('help')) {
      result = [
        '  Available commands:',
        '    sha256sum        - Verify pinned hashes for all 85 files',
        '    cat manifest     - Read Chromium MV3 manifest',
        '    gateways         - List supported checkout gateways',
        '    whoami           - Architect identity record',
        '    clear            - Clear terminal screen',
      ]
    } else {
      result = [
        `  ash: command not found: ${cmd}`,
        '  Type "help" or click one of the preset pills above.',
      ]
    }

    setHistory((prev) => [...prev, { command: `$ ${cmd}`, output: result }])
    setInputVal('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    playKeystroke()
    if (e.key === 'Enter') {
      handleCommand(inputVal)
    }
  }

  return (
    <div className="term" ref={box}>
      <div className="term__bar">
        <i />
        <i />
        <i />
        <em>ash@local — interactive build audit terminal</em>
      </div>

      <div className="term__quick-bar">
        <span className="u-mono" style={{ fontSize: '0.65rem', opacity: 0.6 }}>
          QUICK RUN:
        </span>
        {PRESET_CMDS.map((p) => (
          <button
            key={p.label}
            type="button"
            className="term-pill"
            onClick={() => handleCommand(p.cmd)}
            data-cursor="Run"
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="term__body">
        {history.map((item, idx) => (
          <div key={idx} style={{ marginBottom: '0.7rem' }}>
            {item.command && (
              <div className="k" style={{ fontWeight: 600 }}>
                {item.command}
              </div>
            )}
            {item.output.map((line, lIdx) => (
              <div key={lIdx} style={{ opacity: 0.88 }}>
                {line}
              </div>
            ))}
          </div>
        ))}

        {/* Live Input Prompt */}
        <div className="term__prompt-row">
          <span className="k">$ </span>
          <input
            type="text"
            className="term__input u-code"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help' or command..."
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  )
}
