import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, reducedMotion } from '#/lib/motion'
import { Topo } from './Topo'
import { TidalBg } from './TidalBg'
import { HeadsetRig } from './HeadsetRig'

/**
 * The masthead — the Lando recipe: a light off-white stage with drifting
 * contour waves, the lit face, the black VR wireframe shell wrapping around
 * his head. No giant wordmark over the face. No copy. Just Ash.
 */
export function Hero() {
  const section = useRef<HTMLElement>(null)
  const scene = useRef<HTMLDivElement>(null)
  const figPar = useRef<HTMLDivElement>(null)
  const figure = useRef<HTMLDivElement>(null)
  const veil = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const sec = section.current
    const scn = scene.current
    if (!sec || !scn) return

    const reduce = reducedMotion()

    // ---- fluid pointer: 3D lean ----
    const target = { rx: 0, ry: 0, px: 0, py: 0 }
    const cur = { rx: 0, ry: 0, px: 0, py: 0 }

    const onMove = (e: PointerEvent) => {
      const r = scn.getBoundingClientRect()
      const nx = ((e.clientX - r.left) / r.width) * 2 - 1
      const ny = ((e.clientY - r.top) / r.height) * 2 - 1
      target.ry = nx * 7
      target.rx = -ny * 6
      target.px = nx
      target.py = ny
    }

    let raf = 0
    const tick = () => {
      cur.rx += (target.rx - cur.rx) * 0.08
      cur.ry += (target.ry - cur.ry) * 0.08
      cur.px += (target.px - cur.px) * 0.07
      cur.py += (target.py - cur.py) * 0.07
      scn.style.transform = `perspective(1100px) rotateX(${cur.rx}deg) rotateY(${cur.ry}deg)`
      if (figPar.current)
        figPar.current.style.transform = `translate3d(${cur.px * -8}px, ${cur.py * -6}px, 0)`
      raf = requestAnimationFrame(tick)
    }

    // ---- intro ----
    const intro = () => {
      if (reduce) return
      gsap
        .timeline({ defaults: { ease: 'expo.out' } })
        .from(figure.current, { scale: 1.16, autoAlpha: 0, duration: 1.6 }, 0)
    }
    const start = () => {
      intro()
      window.removeEventListener('ash:preloaded', start)
    }
    window.addEventListener('ash:preloaded', start)
    const fallback = window.setTimeout(start, 3000)

    // ---- scroll: materialise ----
    const ctx = gsap.context(() => {
      if (reduce) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sec,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.7,
        },
      })

      tl.to(figure.current, { scale: 1.16, ease: 'none', duration: 1 }, 0)
      // lime veil sweep at the materialise moment
      tl.fromTo(
        veil.current,
        { yPercent: 101 },
        { yPercent: -101, ease: 'none', duration: 0.3 },
        0.4,
      )
    }, sec)

    if (!reduce) {
      scn.addEventListener('pointermove', onMove)
      raf = requestAnimationFrame(tick)
    }

    return () => {
      window.clearTimeout(fallback)
      window.removeEventListener('ash:preloaded', start)
      cancelAnimationFrame(raf)
      scn.removeEventListener('pointermove', onMove)
      ctx.revert()
    }
  }, [])

  return (
    <section className="hero hero--crazy hero--light" data-theme="light" ref={section}>
      <div className="hero__sticky">
        <TidalBg />
        <Topo />

        <div className="hero__scene" ref={scene}>
          <div className="hero__par" ref={figPar}>
            <div className="hero__figure" ref={figure}>
              <HeadsetRig base="/img/ash-straight-bare.png" />
            </div>
          </div>
        </div>

        <div className="hero__veil" ref={veil}>
          <i />
        </div>

        <div className="hero__hud u-mono">
          <span className="hud__l">VR / DEV / SHIPS</span>
          <span className="hud__r">SCROLL TO MATERIALISE</span>
        </div>
      </div>
    </section>
  )
}
