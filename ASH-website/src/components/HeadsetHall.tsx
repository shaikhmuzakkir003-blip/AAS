import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, reducedMotion } from '#/lib/motion'
import { useInView } from '#/lib/inview'
import { Topo } from './Topo'

type Set = {
  name: string
  year: string
  note: string
  img: string
}

const SETS: Set[] = [
  {
    name: 'Volt',
    year: '2026',
    note: 'The daily driver. Smoked glass, lime rim, zero reflection of anything real.',
    img: '/img/ash-visor-object.png',
  },
  {
    name: 'Porcelain',
    year: '2025',
    note: 'Bone-white ceramic for the prize days. One lime line, nothing else.',
    img: '/img/ash-visor-bone.png',
  },
  {
    name: 'Acid',
    year: '2025',
    note: 'The loud one. Full lime-and-black blob livery, straight off the track.',
    img: '/img/ash-visor-blob.png',
  },
]

/**
 * The landonorris.com "Helmets · Hall of Fame": a pinned strip that scrolls
 * sideways, each headset card crossfading base→hover with a lime/grey mask
 * extender bleeding the card into the void.
 */
export function HeadsetHall() {
  const section = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const head = useRef<HTMLDivElement>(null)
  useInView(head, { stagger: 0.1 })

  // pinned horizontal scroll-scrub
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const sec = section.current
    const tr = track.current
    if (!sec || !tr || reducedMotion()) return

    const distance = () => Math.max(0, tr.scrollWidth - window.innerWidth)
    const ctx = gsap.context(() => {
      gsap.to(tr, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: sec,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      })
    }, sec)

    return () => ctx.revert()
  }, [])

  return (
    <section className="helm sec sec--dark" ref={section} data-theme="dark">
      <Topo className="u-lime" />
      <div className="wrap helm__head" ref={head} style={{ position: 'relative' }}>
        <span className="u-eyebrow fade" style={{ color: 'var(--lime)' }}>
          The hardware
        </span>
        <h2 className="u-display fade" style={{ fontSize: 'clamp(2.4rem, 8vw, 8rem)' }}>
          Headsets
          <br />
          <span className="u-serif u-lime">Hall of fame</span>
        </h2>
        <p className="u-body fade" style={{ maxWidth: '46ch', opacity: 0.72 }}>
          One architect, three sets of glass. Every build ships from behind one of
          these — hover a card to see it light up.
        </p>
      </div>

      <div className="helm__track" ref={track}>
        {SETS.map((s) => (
          <article className="helm__card" key={s.name}>
            <div className="helm__media">
              <img src={s.img} alt={`${s.name} headset`} loading="lazy" />
              <i className="helm__ext helm__ext--grey" aria-hidden="true" />
              <i className="helm__ext helm__ext--lime" aria-hidden="true" />
            </div>
            <div className="helm__meta">
              <h3>{s.name}</h3>
              <span className="u-mono">{s.year}</span>
            </div>
            <p className="u-body">{s.note}</p>
          </article>
        ))}
        <div className="helm__card helm__card--ghost" aria-hidden="true">
          <div className="helm__media">
            <span className="u-mono">Next season · in design</span>
          </div>
        </div>
      </div>
    </section>
  )
}
