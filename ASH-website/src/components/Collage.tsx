import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, reducedMotion } from '#/lib/motion'
import { SHOTS } from '#/data/site'
import { Topo } from './Topo'

/** Scattered stills drifting at their own speeds, with a handwritten line in the gap. */
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
          { y: 140 * speed * 3 },
          {
            y: -140 * speed * 3,
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
          duration: 1.25,
          ease: 'expo.out',
          scrollTrigger: { trigger: shot, start: 'top 88%' },
        })
      })

      const sig = node.querySelector<SVGPathElement>('.sig path')
      if (sig) {
        const len = sig.getTotalLength()
        gsap.fromTo(
          sig,
          { strokeDasharray: len, strokeDashoffset: len },
          {
            strokeDashoffset: 0,
            duration: 1.8,
            ease: 'power2.out',
            scrollTrigger: { trigger: sig, start: 'top 85%' },
          },
        )
      }
    }, node)
    return () => ctx.revert()
  }, [])

  return (
    <section className="collage" ref={root}>
      <Topo className="u-lime" />
      <div className="wrap" style={{ position: 'relative' }}>
        <div className="collage__grid">
          {SHOTS.slice(0, 2).map((s) => (
            <Shot key={s.src} {...s} />
          ))}

          <div className="quote-block" style={{ ['--col' as string]: '1 / span 5' }}>
            <p>
              “It doesn't matter what stack you start on. It matters what you ship
              from there.”
            </p>
            <div className="sig">
              <svg viewBox="0 0 260 90" aria-hidden="true">
                <path d="M12 74c14-38 26-58 34-58 7 0 6 20 2 40-4 21 2 28 12 24 12-5 18-22 22-40 3-14 8-22 13-22 6 0 6 12 2 28-4 15-1 22 8 22 8 0 15-7 22-19 5-9 10-14 14-14 5 0 5 9 2 18-3 10 1 15 9 15 10 0 21-9 34-27M182 32c16-6 30-12 44-20" />
              </svg>
            </div>
          </div>

          {SHOTS.slice(2).map((s) => (
            <Shot key={s.src} {...s} />
          ))}

          <div
            className="quote-block u-body"
            style={{ ['--col' as string]: '8 / span 4' }}
          >
            <p style={{ fontFamily: 'var(--serif)' }}>
              Nine years in, a repo of three hundred and twelve releases, and still
              nobody outside a handful of group chats knows what he looks like. The
              work does the talking.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Shot({
  src,
  caption,
  col,
  ar,
  speed,
}: {
  src: string
  caption: string
  col: string
  ar: string
  speed: number
}) {
  return (
    <div
      className="shot"
      data-speed={speed}
      data-cursor="View"
      style={{ ['--col' as string]: col, ['--ar' as string]: ar }}
    >
      <div className="shot__cap u-mono">{caption}</div>
      <figure>
        <img src={src} alt={caption} loading="lazy" />
      </figure>
    </div>
  )
}
