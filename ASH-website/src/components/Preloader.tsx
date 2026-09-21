import { useEffect, useRef, useState } from 'react'
import { BUILD } from '#/data/site'

/** Edition-style boot screen. Locks scroll until the hero assets are primed. */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null)
  const bar = useRef<HTMLElement>(null)
  const count = useRef<HTMLSpanElement>(null)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.documentElement.classList.toggle('reduce-motion', reduce)
    document.documentElement.style.overflow = 'hidden'

    const finish = () => {
      if (!root.current) return
      root.current.classList.add('is-done')
      setDone(true)
      document.documentElement.style.overflow = ''
      window.dispatchEvent(new CustomEvent('ash:preloaded'))
      window.setTimeout(() => root.current?.remove(), 1300)
    }

    if (reduce) {
      finish()
      return
    }

    // prime the hero imagery before the curtain lifts
    const prime = [
      '/img/ash-vr-headset.png',
      '/img/ash-straight-depth.png',
      '/img/ash-straight-shadow.png',
      '/img/ash-straight-alpha.png',
      '/img/ash-straight-normal.png',
      '/img/ash-straight-rough.png',
      '/img/ash-vr-headset.png',
      '/img/ash-vr-headset-depth.png',
      '/img/ash-vr-headset-alpha.png',
      '/img/ash-vr-headset-normal.png',
    ].map(
      (src) =>
        new Promise((res) => {
          const im = new Image()
          im.onload = res
          im.onerror = res
          im.src = src
        }),
    )

    let raf = 0
    const start = performance.now()
    const DURATION = 1700
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / DURATION)
      const eased = 1 - Math.pow(1 - p, 3)
      const v = Math.round(eased * 100)
      if (bar.current) bar.current.style.width = `${v}%`
      if (count.current) count.current.textContent = String(v).padStart(3, '0')
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    Promise.race([
      Promise.all(prime),
      new Promise((r) => setTimeout(r, 3600)),
    ]).then(() => {
      cancelAnimationFrame(raf)
      const hold = performance.now() - start
      setTimeout(finish, Math.max(0, 1500 - hold))
    })

    return () => cancelAnimationFrame(raf)
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
