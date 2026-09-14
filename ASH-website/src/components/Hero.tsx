import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, reducedMotion } from '#/lib/motion'
import { Topo } from './Topo'

/**
 * The masthead. Ash's model sits on top of a faceless black figure: scrolling
 * unwraps the model from the top down, and the pointer opens a hole in it
 * wherever it goes.
 */
export function Hero() {
  const section = useRef<HTMLElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const skin = useRef<HTMLImageElement>(null)
  const anon = useRef<HTMLImageElement>(null)
  const scan = useRef<HTMLDivElement>(null)
  const word = useRef<HTMLHeadingElement>(null)
  const card = useRef<HTMLDivElement>(null)
  const hint = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const skinEl = skin.current
    const anonEl = anon.current
    if (!section.current || !skinEl || !anonEl) return

    const ctx = gsap.context(() => {
      // intro
      gsap.from([word.current, card.current, hint.current], {
        yPercent: 18,
        opacity: 0,
        duration: 1.3,
        ease: 'expo.out',
        stagger: 0.08,
        delay: 0.15,
      })

      if (reducedMotion()) return

      // scroll drives the unwrap: 0% (Ash's model) -> 120% (the figure beneath)
      const st = ScrollTrigger.create({
        trigger: section.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.6,
        onUpdate: (self) => {
          const p = self.progress
          const wipe = p * 124
          skinEl.style.setProperty('--wipe', `${wipe}%`)
          skinEl.style.setProperty('--zoom', `${1.06 + p * 0.1}`)
          anonEl.style.setProperty('--zoom', `${1.06 + p * 0.1}`)
          if (scan.current) {
            scan.current.style.setProperty('--wipe', `${wipe}%`)
            scan.current.style.setProperty(
              '--scan',
              `${p > 0.01 && p < 0.99 ? 1 : 0}`,
            )
          }
          if (word.current) {
            word.current.style.opacity = `${1 - Math.max(0, p - 0.55) * 2.6}`
            word.current.style.transform = `translate(-50%, ${p * 28}%)`
          }
        },
      })

      // pointer opens a hole in the model
      const onMove = (e: PointerEvent) => {
        const r = stage.current!.getBoundingClientRect()
        skinEl.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`)
        skinEl.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`)
      }
      let hole = 0
      let want = 0
      const tick = () => {
        hole += (want - hole) * 0.1
        skinEl.style.setProperty('--hole', `${hole.toFixed(2)}px`)
      }
      gsap.ticker.add(tick)
      const enter = () => (want = 230)
      const leave = () => (want = 0)
      const host = stage.current!
      host.addEventListener('pointermove', onMove)
      host.addEventListener('pointerenter', enter)
      host.addEventListener('pointerleave', leave)

      return () => {
        st.kill()
        gsap.ticker.remove(tick)
        host.removeEventListener('pointermove', onMove)
        host.removeEventListener('pointerenter', enter)
        host.removeEventListener('pointerleave', leave)
      }
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section className="hero" ref={section}>
      <div className="hero__sticky">
        <Topo className="u-lime" />

        <div className="hero__stage" ref={stage} data-cursor="Unwrap">
          <img
            className="hero__layer hero__layer--anon"
            src="/img/ash-anon.png"
            alt=""
            aria-hidden="true"
            ref={anon}
          />
          <img
            className="hero__layer hero__layer--skin"
            src="/img/ash-model.png"
            alt="Ash, rendered as his own character model"
            ref={skin}
            style={{ ['--wipe' as string]: '0%' }}
            fetchPriority="high"
          />
          <div className="hero__scan" ref={scan} />
          <div className="hero__fade" />
        </div>

        <h1 className="hero__wordmark" ref={word}>
          ASH
        </h1>
        <p className="hero__sub u-eyebrow">
          Independent developer · Creator of Asheo · No face reveal
        </p>

        <div className="hero__card" ref={card}>
          <span className="u-mono">Now shipping</span>
          <h3>
            Asheo
            <br />
            v3.0
          </h3>
          <p>1.2M installs · 4.9★</p>
        </div>

        <div className="hero__hint u-mono" ref={hint}>
          <b>Move the pointer</b>
          <span>Unwrap the model. Nobody has seen the face behind it.</span>
        </div>
      </div>
    </section>
  )
}
