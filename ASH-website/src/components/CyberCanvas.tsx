import { useEffect, useRef } from 'react'

/**
 * High-performance 60fps WebGL/Canvas cyber constellation & grid.
 * Interactive to cursor position, silky particle physics, ultra-lightweight.
 */
export function CyberCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    // Particle pool
    const count = Math.min(width < 768 ? 35 : 70, 85)
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      size: Math.random() * 1.8 + 0.8,
      alpha: Math.random() * 0.5 + 0.2,
      baseAlpha: Math.random() * 0.5 + 0.2,
    }))

    const mouse = { x: -1000, y: -1000, active: false }
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      mouse.active = true
    }
    const onMouseLeave = () => {
      mouse.active = false
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave)

    let scrollY = window.scrollY
    const onScroll = () => {
      scrollY = window.scrollY
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // Draw faint cyber grid horizon
      const gridSpacing = 80
      const offset = (scrollY * 0.25) % gridSpacing
      ctx.strokeStyle = 'rgba(212, 255, 0, 0.02)'
      ctx.lineWidth = 1

      for (let x = 0; x < width; x += gridSpacing) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }
      for (let y = -offset; y < height; y += gridSpacing) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }

      // Update & render particles
      for (let i = 0; i < count; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) p.x = width
        else if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        else if (p.y > height) p.y = 0

        // Mouse interaction
        if (mouse.active) {
          const dx = mouse.x - p.x
          const dy = mouse.y - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 140) {
            const force = (140 - dist) / 140
            p.x -= (dx / dist) * force * 1.5
            p.y -= (dy / dist) * force * 1.5
            p.alpha = Math.min(1, p.baseAlpha + force * 0.6)
          } else {
            p.alpha = p.baseAlpha
          }
        }

        // Draw particle
        ctx.fillStyle = `rgba(212, 255, 0, ${p.alpha * 0.6})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()

        // Connect nearby particles with luminous cyber filaments
        for (let j = i + 1; j < count; j++) {
          const p2 = particles[j]
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 110) {
            const lineAlpha = (1 - dist / 110) * 0.12 * Math.min(p.alpha, p2.alpha)
            ctx.strokeStyle = `rgba(212, 255, 0, ${lineAlpha})`
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="cyber-canvas"
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        mixBlendMode: 'screen',
      }}
    />
  )
}
