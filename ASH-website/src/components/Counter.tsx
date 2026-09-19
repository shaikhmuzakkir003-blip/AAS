import { useEffect, useRef, useState } from 'react'

type Props = {
  value: number
  suffix?: string
  prefix?: string
  className?: string
  duration?: number
}

/** Counts up once scrolled into view. Real numbers only, ever. */
export function Counter({ value, suffix = '', prefix = '', className = '', duration = 1500 }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const [n, setN] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setN(value)
      return
    }
    let raf = 0
    let started = false
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || started) return
        started = true
        const t0 = performance.now()
        const run = (t: number) => {
          const p = Math.min(1, (t - t0) / duration)
          const eased = 1 - Math.pow(1 - p, 4)
          setN(Math.round(eased * value))
          if (p < 1) raf = requestAnimationFrame(run)
        }
        raf = requestAnimationFrame(run)
        io.disconnect()
      },
      { threshold: 0.5 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [value, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {n}
      {suffix}
    </span>
  )
}
