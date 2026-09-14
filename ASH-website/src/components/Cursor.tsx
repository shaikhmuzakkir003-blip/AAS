import { useEffect, useRef, useState } from 'react'

/** A difference-blended dot that swells into a lime disc over interactive things. */
export function Cursor() {
  const root = useRef<HTMLDivElement>(null)
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const [label, setLabel] = useState('')

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    document.body.classList.add('has-cursor')

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const target = { ...pos }
    const slow = { ...pos }
    let frame = 0

    const move = (e: PointerEvent) => {
      target.x = e.clientX
      target.y = e.clientY
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        'a, button, [data-cursor]',
      )
      const next = el ? el.dataset.cursor ?? '' : null
      root.current?.classList.toggle('is-active', el !== null)
      setLabel(next ?? '')
    }

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.35
      pos.y += (target.y - pos.y) * 0.35
      slow.x += (target.x - slow.x) * 0.16
      slow.y += (target.y - slow.y) * 0.16
      if (dot.current)
        dot.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
      if (ring.current)
        ring.current.style.translate = `${slow.x}px ${slow.y}px`
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    window.addEventListener('pointermove', move, { passive: true })

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', move)
      document.body.classList.remove('has-cursor')
    }
  }, [])

  return (
    <div className="cursor" ref={root} aria-hidden="true">
      <div className="cursor__ring" ref={ring}>
        <span>{label}</span>
      </div>
      <div className="cursor__dot" ref={dot} />
    </div>
  )
}
