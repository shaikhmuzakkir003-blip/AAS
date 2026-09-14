import { useEffect, useRef, useState } from 'react'

const LINES: Array<{ text: string; cls?: string }> = [
  { text: '$ whoami', cls: 'k' },
  { text: 'ash — independent developer, nine years in' },
  { text: '' },
  { text: '$ cat message.txt', cls: 'k' },
  { text: 'I never wanted a personal brand.' },
  { text: 'I wanted software that behaves itself.' },
  { text: 'Asheo started as a fix for one annoying tab' },
  { text: 'and turned into 1.2M people\'s daily habit.' },
  { text: '' },
  { text: '# still no face reveal. the work is the face.', cls: 'c' },
]

/** A message from Ash, typed out the first time it scrolls into view. */
export function Terminal() {
  const box = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(0)
  const [chars, setChars] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const node = box.current
    if (!node) return
    const check = () => {
      const r = node.getBoundingClientRect()
      if (r.top < window.innerHeight * 0.85 && r.bottom > 0) {
        setStarted(true)
        window.removeEventListener('scroll', check)
      }
    }
    check()
    window.addEventListener('scroll', check, { passive: true })
    const safety = window.setTimeout(() => setStarted(true), 4000)
    return () => {
      window.removeEventListener('scroll', check)
      window.clearTimeout(safety)
    }
  }, [])

  useEffect(() => {
    if (!started || shown >= LINES.length) return
    const line = LINES[shown].text
    if (chars < line.length) {
      const t = setTimeout(() => setChars((c) => c + 1), line.length > 40 ? 14 : 26)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => {
      setShown((s) => s + 1)
      setChars(0)
    }, 260)
    return () => clearTimeout(t)
  }, [started, shown, chars])

  return (
    <div className="term" ref={box}>
      <div className="term__bar">
        <i />
        <i />
        <i />
        <em>ash@local — message</em>
      </div>
      <div className="term__body">
        {LINES.slice(0, shown).map((l, i) => (
          <div key={i} className={l.cls}>
            {l.text || '\u00a0'}
          </div>
        ))}
        {shown < LINES.length && (
          <div className={LINES[shown].cls}>
            {LINES[shown].text.slice(0, chars)}
            <span className="term__caret" />
          </div>
        )}
      </div>
    </div>
  )
}
