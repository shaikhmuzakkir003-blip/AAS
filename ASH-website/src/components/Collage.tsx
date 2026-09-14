import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, reducedMotion } from '#/lib/motion'
import { SHOTS } from '#/data/site'
import { Topo } from './Topo'
import { Reveal } from './Reveal'
import { Shot } from './Shot'

/** Cinematic stills (and WAN clips, once present) drifting at their own speeds. */
export function Collage() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const node = root.current
    if (!node || reducedMotion()) return

    const ctx = gsap.context(() => {
      node.querySelectorAll<HTMLElement>('.shot').forEach((shot) => {
        const speed = Number(shot.dataset.speed ?? 0.1)
        gsap.fromTo(
          shot,
          { y: 120 * speed * 3 },
          {
            y: -120 * speed * 3,
            ease: 'none',
            scrollTrigger: {
              trigger: shot,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.8,
            },
          },
        )
        gsap.from(shot.querySelector('figure'), {
          clipPath: 'inset(100% 0 0 0)',
          duration: 1.3,
          ease: 'expo.out',
          scrollTrigger: { trigger: shot, start: 'top 88%' },
        })
      })
    }, node)
    return () => ctx.revert()
  }, [])

  return (
    <section className="collage" ref={root} data-theme="dark">
      <Topo className="u-lime" />
      <div className="wrap" style={{ position: 'relative' }}>
        <Reveal className="sec__head">
          <h2 className="u-display sec__title fade">
            Frames from
            <br />
            <span className="u-serif u-lime">the build</span>
          </h2>
          <span className="sec__index u-mono fade">B-roll · Edition 01</span>
        </Reveal>

        <Reveal className="collage__grid" stagger={0.05}>
          <Shot {...SHOTS[0]} speed={SHOTS[0].speed} />
          <Shot {...SHOTS[1]} speed={SHOTS[1].speed} />

          <div className="quote-block" style={{ ['--col' as string]: '1 / span 4' }}>
            <p className="fade">
              “Not just an extension. It’s your edge — so I built it like one.”
            </p>
            <cite className="fade">— ASH, architect of Asheo</cite>
          </div>

          <Shot {...SHOTS[2]} speed={SHOTS[2].speed} />
          <div className="quote-block" style={{ ['--col' as string]: '8 / span 4' }}>
            <p
              className="fade"
              style={{
                fontFamily: 'var(--sans)',
                textTransform: 'none',
                fontWeight: 500,
                fontSize: 'clamp(1.1rem, 1.7vw, 1.55rem)',
              }}
            >
              The mascot is Kalos Ash — cap and jacket from the XY run. The
              architect has never shown his face. The build sits between the two.
            </p>
            <cite className="fade" style={{ marginTop: '1rem' }}>
              Edition notes
            </cite>
          </div>

          <Shot {...SHOTS[3]} speed={SHOTS[3].speed} />
        </Reveal>
      </div>
    </section>
  )
}
