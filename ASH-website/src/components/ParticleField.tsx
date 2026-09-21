import { useEffect, useRef } from 'react'
import { reducedMotion } from '#/lib/motion'

type P = {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  a: number
}

/**
 * A full-bleed field of acid-lime dust that drifts, then swirls around the
 * cursor. Pure canvas, no deps. Sits behind the portrait in the hero.
 */
export function ParticleField({ count = 110 }: { count?: number }) {
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cv = canvas.current
    if (!cv) return
    const ctx = cv.getContext('2d')
    if (!ctx) return

    const reduce = reducedMotion()
    let w = 0
    let h = 0
    let dpr = Math.min(2, window.devicePixelRatio || 1)
    let raf = 0

    const mouse = { x: -9999, y: -9999, on: false }
    const parts: P[] = []

    const resize = () => {
      const rect = cv.parentElement?.getBoundingClientRect()
      w = rect?.width ?? window.innerWidth
      h = rect?.height ?? window.innerHeight
      dpr = Math.min(2, window.devicePixelRatio || 1)
      cv.width = w * dpr
      cv.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const seed = () => {
      parts.length = 0
      for (let i = 0; i < count; i++) {
        parts.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          r: Math.random() * 1.8 + 0.4,
          a: Math.random() * 0.5 + 0.15,
        })
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of parts) {
        // cursor swirl: tangential push within a radius
        if (mouse.on) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const d2 = dx * dx + dy * dy
          const R = 160
          if (d2 < R * R && d2 > 0.01) {
            const d = Math.sqrt(d2)
            const f = (1 - d / R) * 0.9
            p.vx += (dx / d) * f * 0.6 + (-dy / d) * f * 0.9
            p.vy += (dy / d) * f * 0.6 + (dx / d) * f * 0.9
          }
        }
        // damp + drift
        p.vx *= 0.96
        p.vy *= 0.96
        p.x += p.vx + Math.sin(p.y * 0.01) * 0.08
        p.y += p.vy + Math.cos(p.x * 0.01) * 0.08

        if (p.x < -10) p.x = w + 10
        if (p.x > w + 10) p.x = -10
        if (p.y < -10) p.y = h + 10
        if (p.y > h + 10) p.y = -10

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200, 240, 43, ${p.a})`
        ctx.fill()
      }
    }

    const loop = () => {
      draw()
      raf = requestAnimationFrame(loop)
    }

    const onMove = (e: PointerEvent) => {
      const rect = cv.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
      mouse.on = true
    }
    const onLeave = () => (mouse.on = false)

    resize()
    seed()

    if (reduce) {
      draw() // one static pass
    } else {
      raf = requestAnimationFrame(loop)
      window.addEventListener('pointermove', onMove, { passive: true })
      window.addEventListener('pointerleave', onLeave)
    }
    window.addEventListener('resize', () => {
      resize()
      seed()
      if (reduce) draw()
    })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
    }
  }, [count])

  return <canvas className="pfield" ref={canvas} aria-hidden="true" />
}
