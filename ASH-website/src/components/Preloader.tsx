import { useEffect, useRef, useState } from 'react'
import { BUILD } from '#/data/site'

/** Edition-style boot screen. Snappy cyber init, then lifts cleanly. */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null)
  const bar = useRef<HTMLElement>(null)
  const count = useRef<HTMLSpanElement>(null)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.documentElement.classList.toggle('reduce-motion', reduce)

    const finish = () => {
      if (!root.current) return
      root.current.classList.add('is-done')
      setDone(true)
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
      window.dispatchEvent(new CustomEvent('ash:preloaded'))
      window.setTimeout(() => root.current?.remove(), 600)
    }

    if (reduce || sessionStorage.getItem('ash:booted')) {
      finish()
      return
    }

    sessionStorage.setItem('ash:booted', '1')
    document.documentElement.style.overflow = 'hidden'

    let raf = 0
    const start = performance.now()
    const DURATION = 680
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / DURATION)
      const eased = 1 - Math.pow(1 - p, 3)
      const v = Math.round(eased * 100)
      if (bar.current) bar.current.style.width = `${v}%`
      if (count.current) count.current.textContent = String(v).padStart(3, '0')
      if (p < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        finish()
      }
    }
    raf = requestAnimationFrame(tick)

    const safety = window.setTimeout(finish, 900)

    return () => {
      window.clearTimeout(safety)
      cancelAnimationFrame(raf)
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <div className="pre" ref={root} aria-hidden={done}>
      <div className="pre__inner">
        <div className="pre__row">
          <div className="pre__mark">
            ASH<em>.</em>
          </div>
          <div className="pre__meta u-mono">
            <span>{BUILD.edition}</span>
            <span>Build {BUILD.serial}</span>
            <span className="pre__count">
              [<span ref={count}>000</span>/100]
            </span>
          </div>
        </div>
        <div className="pre__bar">
          <i ref={bar} />
        </div>
      </div>
    </div>
  )
}
