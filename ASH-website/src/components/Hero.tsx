import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, reducedMotion } from '#/lib/motion'
import { Topo } from './Topo'
import { HeroGL } from './HeroGL'
import { Words } from './Words'
import { Reveal } from './Reveal'

/**
 * Faceless masthead — "no face reveal, the work is the face."
 * A void stage: contour field, the strap-less unit floating as a true 3D
 * hologram (wire -> wavy materialise -> glossy product), and two lines of
 * type that say the whole brand in four words. No portrait. No wordmark
 * over a face. The object is the person.
 */
export function Hero() {
  const section = useRef<HTMLElement>(null)
  const type = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const sec = section.current
    if (!sec || reducedMotion()) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sec,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.7,
        },
      })
      tl.to(type.current, { autoAlpha: 0, yPercent: -14, ease: 'none', duration: 0.6 }, 0)
    }, sec)
    return () => ctx.revert()
  }, [])

  return (
    <section className="hero hero--void" data-theme="dark" ref={section}>
      <div className="hero__sticky">
        <Topo className="u-lime" />
        <div className="hero__glow" aria-hidden="true" />
        <HeroGL />

        <div className="hero__type" ref={type}>
          <Reveal className="hero__crest">
            <span className="u-eyebrow fade" style={{ color: 'var(--lime)' }}>
              The engineer behind Asheo · Edition 01
            </span>
          </Reveal>
          <h1 className="hero__no-face u-display">
            <Words text="NO FACE." step={26} />
            <em className="u-serif">
              <Words text="only *work*." step={26} />
            </em>
          </h1>
        </div>

        <div className="hero__hud u-mono">
          <span className="hud__l">VR / DEV / SHIPS</span>
          <span className="hud__r">SCROLL TO MATERIALISE</span>
        </div>
      </div>
    </section>
  )
}
