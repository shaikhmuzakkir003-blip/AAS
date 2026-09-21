import { useEffect, useRef, useState } from 'react'
import { TERMINAL_LINES } from '#/data/site'

/** A real terminal receipt — manifest version, signed-files check, no trackers. */
export function Terminal() {
  const box = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(0)
  const [chars, setChars] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const node = box.current
    if (!node) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setStarted(true)
          io.disconnect()
        }
      },
      { threshold: 0.35 },
    )
    io.observe(node)
    const safety = window.setTimeout(() => setStarted(true), 5000)
    return () => {
      io.disconnect()
      window.clearTimeout(safety)
    }
  }, [])

  useEffect(() => {
    if (!started || shown >= TERMINAL_LINES.length) return
    const line = TERMINAL_LINES[shown].text
    if (chars < line.length) {
      const t = setTimeout(() => setChars((c) => c + 1), line.length > 34 ? 9 : 22)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => {
      setShown((s) => s + 1)
      setChars(0)
    }, 190)
    return () => clearTimeout(t)
  }, [started, shown, chars])

  return (
    <div className="term" ref={box}>
      <div className="term__bar">
        <i />
        <i />
        <i />
        <em>ash@local — build verification</em>
      </div>
      <div className="term__body">
        {TERMINAL_LINES.slice(0, shown).map((l, i) => (
          <div key={i} className={l.cls}>
            {l.text || ' '}
          </div>
        ))}
        {shown < TERMINAL_LINES.length && (
          <div className={TERMINAL_LINES[shown].cls}>
            {TERMINAL_LINES[shown].text.slice(0, chars)}
            <span className="term__caret" />
          </div>
        )}
        {shown >= TERMINAL_LINES.length && (
          <div style={{ marginTop: '0.6rem' }}>
            <span className="k">$ </span>
            <span className="term__caret" />
          </div>
        )}
      </div>
    </div>
  )
}
