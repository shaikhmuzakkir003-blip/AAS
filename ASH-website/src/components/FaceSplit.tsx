import { useEffect, useRef } from 'react'
import { Link } from '@tanstack/react-router'
import { gsap, ScrollTrigger, reducedMotion } from '#/lib/motion'
import { Reel } from './Reel'
import { Arrow } from './Icons'
import { Topo } from './Topo'

/** Two doors sliding together, pinned: the life in prod vs the life off clock. */
export function FaceSplit() {
  const section = useRef<HTMLElement>(null)
  const left = useRef<HTMLDivElement>(null)
  const right = useRef<HTMLDivElement>(null)
  const line = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const node = section.current
    if (!node || reducedMotion()) {
      if (line.current) line.current.style.scale = '1 1'
      gsap.set([left.current, right.current], { xPercent: 0 })
      return
    }

    const ctx = gsap.context(() => {
      gsap.set([left.current, right.current], { xPercent: (i) => (i === 0 ? -100 : 100) })
      gsap.set(line.current, { scaleY: 0, transformOrigin: 'top' })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: node,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.8,
        },
      })

      tl.to([left.current, right.current], { xPercent: 0, duration: 0.42, ease: 'power2.out' }, 0)
        .to(line.current, { scaleY: 1, duration: 0.3, ease: 'none' }, 0.32)
        .from(
          '.face__copy > *',
          { y: 34, autoAlpha: 0, stagger: 0.05, duration: 0.25 },
          0.3,
        )
    }, node)

    return () => ctx.revert()
  }, [])

  return (
    <section className="faces" ref={section} data-theme="dark" data-cursor="Split">
      <div className="faces__sticky">
        <Topo />
        <div className="face" ref={left}>
          <Reel src="/video/night-coding.mp4" poster="/img/ash-neon-night.jpg" alt="Ash walking a neon-lit street at night, headset up" />
          <div className="face__copy">
            <span>Running right now · 01</span>
            <b>In prod</b>
            <p>
              85 signed files, 41 gateway handlers, a v3 request pipeline — shipped,
              verified, on call.
            </p>
            <Link to="/in-prod" className="arrow-btn" aria-label="Open In Prod" data-cursor="Open">
              <Arrow />
            </Link>
          </div>
        </div>

        <div className="face__line" ref={line} />

        <div className="face" ref={right}>
          <Reel src="/video/lumiose-walk.mp4" poster="/img/ash-dawn-rooftop.jpg" alt="Ash at dawn above the fog, wearing the goggle" />
          <div className="face__copy">
            <span>No changelog for this bit · 02</span>
            <b>Off clock</b>
            <p>
              Kalos walks, blue-hour rooftops and the ideas that show up at 3AM and
              vanish by breakfast.
            </p>
            <Link to="/off-clock" className="arrow-btn" aria-label="Open Off Clock" data-cursor="Open">
              <Arrow />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
