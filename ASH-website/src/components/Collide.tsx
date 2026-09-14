import { useEffect, useRef } from 'react'
import { Link } from '@tanstack/react-router'
import { gsap, ScrollTrigger, reducedMotion } from '#/lib/motion'
import { splitLines, HIGH_CLASS } from '#/lib/split'
import { HL_COLORS } from '#/lib/reveal'

/** Two halves that drive in from opposite sides, unwrap from top down, with Lando-style line reveals. */
export function Collide() {
  const section = useRef<HTMLElement>(null)
  const left = useRef<HTMLDivElement>(null)
  const right = useRef<HTMLDivElement>(null)
  const copy = useRef<HTMLDivElement>(null)
  const leftImg = useRef<HTMLImageElement>(null)
  const rightImg = useRef<HTMLImageElement>(null)
  const leftH2 = useRef<HTMLHeadingElement>(null)
  const rightH2 = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const node = section.current
    if (!node) return

    if (reducedMotion()) {
      left.current?.style.setProperty('--in', '1')
      right.current?.style.setProperty('--in', '1')
      leftImg.current?.style.setProperty('--unwrap', '100%')
      rightImg.current?.style.setProperty('--unwrap', '100%')
      return
    }

    left.current?.style.setProperty('--in', '0')
    right.current?.style.setProperty('--in', '0')

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: node,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.7,
        onUpdate: (self) => {
          const p = Math.min(1, self.progress / 0.62)
          left.current?.style.setProperty('--in', `${p}`)
          right.current?.style.setProperty('--in', `${p}`)

          // unwrap: images reveal from top down as halves slide in
          const unwrap = Math.min(100, p * 140)
          leftImg.current?.style.setProperty('--unwrap', `${unwrap}%`)
          rightImg.current?.style.setProperty('--unwrap', `${unwrap}%`)

          if (copy.current) {
            copy.current.style.opacity = `${Math.max(0, (p - 0.45) / 0.55)}`
          }
        },
      })
    }, node)
    return () => ctx.revert()
  }, [])

  // Lando-style line reveal on the headings
  useEffect(() => {
    if (reducedMotion()) return
    const targets = [leftH2.current, rightH2.current].filter(Boolean) as HTMLElement[]
    const cleanups = targets.map((el) => {
      const lines = splitLines(el)
      if (!lines.length) return () => {}

      const dur = 0.6
      const stagger = 0.15
      const tl = gsap.timeline({ paused: true, defaults: { duration: dur } })

      lines.forEach((line, i) => {
        line.style.position = 'relative'
        const bar = document.createElement('span')
        bar.className = HIGH_CLASS
        bar.style.background = HL_COLORS.olive
        bar.style.transformOrigin = 'right center'
        line.appendChild(bar)
        gsap.set(line, { clipPath: 'inset(0 100% 0 0)' })
        tl.to(line, { clipPath: 'inset(0 0% 0 0)', ease: 'power2.out' }, i * stagger)
        tl.to(bar, { scaleX: 0, duration: dur, ease: 'power2.inOut' }, i * stagger + dur / 2)
      })

      let st: ScrollTrigger | null = null
      let played = false
      const play = () => {
        if (played) return
        played = true
        tl.eventCallback('onComplete', () =>
          lines.forEach((l) => l.querySelectorAll('.' + HIGH_CLASS).forEach((b) => b.remove())),
        )
        tl.play()
      }
      st = ScrollTrigger.create({ trigger: el, start: 'top 90%', once: true, onEnter: play })
      const safety = window.setTimeout(play, 4500)

      return () => {
        window.clearTimeout(safety)
        st?.kill()
        tl.kill()
        lines.forEach((l) => l.querySelectorAll('.' + HIGH_CLASS).forEach((b) => b.remove()))
      }
    })
    return () => cleanups.forEach((c) => c())
  }, [])

  return (
    <section className="collide" ref={section}>
      <div className="collide__sticky">
        <div className="collide__half collide__half--l" ref={left}>
          <img src="/img/ash-anon.png" alt="" aria-hidden="true" ref={leftImg} />
        </div>
        <div className="collide__half collide__half--r" ref={right}>
          <img src="/img/ash-model.png" alt="" aria-hidden="true" ref={rightImg} />
        </div>

        <div className="collide__copy" ref={copy} style={{ opacity: 0 }}>
          <div className="collide__col collide__col--l">
            <h2 ref={leftH2}>
              <em>In</em>
              <b>Prod</b>
            </h2>
            <p className="u-body">
              Asheo, the tooling around it and the client work that pays for the
              late nights. Shipped, monitored, on call.
            </p>
            <Link to="/in-prod" className="arrow-btn" aria-label="See what is in prod" data-cursor="Open">
              <Arrow />
            </Link>
          </div>

          <div className="collide__col collide__col--r">
            <h2 ref={rightH2}>
              <em>Off</em>
              <b>Clock</b>
            </h2>
            <p className="u-body">
              The half of the story with no changelog. Talks, side quests and the
              stuff that never made it to main.
            </p>
            <Link to="/off-clock" className="arrow-btn" aria-label="See the off clock side" data-cursor="Open">
              <Arrow />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Arrow() {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true">
      <path
        d="M4 13 13 4M6 4h7v7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
      />
    </svg>
  )
}
