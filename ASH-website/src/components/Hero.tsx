import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger, reducedMotion } from '#/lib/motion'
import { BUILD } from '#/data/site'
import { Topo } from './Topo'
import { playLaser, playClick } from '#/lib/sound'
import { asset } from '#/lib/asset'

const HERO_VIDEO = '/video/hero-unwrap.mp4'

/**
 * The masthead, in three scroll-driven acts.
 *
 *  ACT I   — Kalos Ash, cap on, the mascot.
 *  ACT II  — the cap wipes away (the helmet-unwrap gesture). Still a
 *            character, not a person: no face reveal.
 *  ACT III — the character itself wipes to the featureless mannequin.
 *            Nobody underneath. The work is the face.
 *
 * Interactive Act tabs let visitors jump directly between acts or scrub via scroll.
 */
export function Hero() {
  const section = useRef<HTMLElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const cap = useRef<HTMLImageElement>(null)
  const nocap = useRef<HTMLImageElement>(null)
  const anon = useRef<HTMLImageElement>(null)
  const scan = useRef<HTMLDivElement>(null)
  const word = useRef<HTMLHeadingElement>(null)
  const card = useRef<HTMLDivElement>(null)
  const cue = useRef<HTMLDivElement>(null)
  const topbar = useRef<HTMLDivElement>(null)
  const capA = useRef<HTMLDivElement>(null)
  const capB = useRef<HTMLDivElement>(null)
  const capC = useRef<HTMLDivElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const progress = useRef(0)
  const [activeAct, setActiveAct] = useState<'act1' | 'act2' | 'act3'>('act1')

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const sec = section.current
    const stg = stage.current
    if (!sec || !stg) return

    const reduce = reducedMotion()
    const intro = () => {
      if (reduce) return
      gsap
        .timeline({ defaults: { ease: 'expo.out' } })
        .from('.hero__layer', { scale: 1.14, duration: 1.8 }, 0)
        .from(
          word.current,
          { yPercent: 60, opacity: 0, duration: 1.3 },
          0.15,
        )
        .from(
          [topbar.current, card.current, cue.current, '.hero__sub', '.hero__act-nav'],
          { y: 22, opacity: 0, duration: 1, stagger: 0.08 },
          0.3,
        )
        .from(
          [capA.current, capB.current, capC.current],
          { opacity: 0, duration: 0.8, stagger: 0.1 },
          0.5,
        )
    }

    const start = () => {
      intro()
      window.removeEventListener('ash:preloaded', start)
    }
    window.addEventListener('ash:preloaded', start)
    const fallback = window.setTimeout(start, 2200)

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set([nocap.current, anon.current], { autoAlpha: 0 })
        return
      }

      gsap.set(nocap.current, { autoAlpha: 1 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sec,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.7,
          onUpdate: (self) => {
            progress.current = self.progress
            if (self.progress < 0.35) {
              setActiveAct('act1')
            } else if (self.progress < 0.7) {
              setActiveAct('act2')
            } else {
              setActiveAct('act3')
            }

            const v = video.current
            if (v && v.readyState >= 1 && v.duration) {
              v.currentTime = self.progress * v.duration
            }
            const lensTarget = self.progress < 0.6 ? cap.current : nocap.current
            ;[cap.current, nocap.current].forEach((el) => {
              if (!el) return
              el.classList.toggle('hero__lens', el === lensTarget)
            })
          },
        },
      })

      // shared camera push, all three plates locked together
      tl.fromTo(
        [anon.current, nocap.current, cap.current],
        { scale: 1.07, yPercent: 0 },
        { scale: 1.18, yPercent: -1.6, ease: 'none', duration: 1 },
        0,
      )

      // ACT I → ACT II: cap wipes off, top to bottom
      tl.fromTo(
        cap.current,
        { ['--wipe' as string]: '0%' },
        { ['--wipe' as string]: '100%', ease: 'none', duration: 0.2 },
        0.28,
      )
      tl.fromTo(
        scan.current,
        { ['--y' as string]: '0%', autoAlpha: 0 },
        { ['--y' as string]: '46%', autoAlpha: 1, duration: 0.16, ease: 'none' },
        0.28,
      )
      tl.to(scan.current, { autoAlpha: 0, duration: 0.04 }, 0.44)

      // captions cross
      tl.fromTo(capA.current, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.08 }, 0.26)
      tl.fromTo(capB.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.1 }, 0.34)
      tl.to(capB.current, { autoAlpha: 0, duration: 0.08 }, 0.6)
      tl.fromTo(capC.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.12 }, 0.68)

      // ACT II → ACT III: character wipes to the mannequin
      tl.fromTo(
        nocap.current,
        { ['--wipe' as string]: '0%' },
        { ['--wipe' as string]: '100%', ease: 'none', duration: 0.22 },
        0.6,
      )
      tl.fromTo(
        scan.current,
        { ['--y' as string]: '46%', autoAlpha: 1 },
        { ['--y' as string]: '100%', autoAlpha: 1, duration: 0.2, ease: 'none' },
        0.6,
      )
      tl.to(scan.current, { autoAlpha: 0, duration: 0.05 }, 0.82)

      // wordmark and bottom furniture leave as the mannequin arrives
      tl.to(word.current, { autoAlpha: 0, yPercent: -18, duration: 0.14 }, 0.62)
      tl.to('.hero__sub', { autoAlpha: 0, duration: 0.1 }, 0.6)
      tl.to(card.current, { autoAlpha: 0, y: 20, duration: 0.12 }, 0.8)
      tl.to(cue.current, { autoAlpha: 0, duration: 0.08 }, 0.18)
      tl.to('.hero__hint', { autoAlpha: 0, duration: 0.1 }, 0.8)

      // pointer peel
      const onMove = (e: PointerEvent) => {
        const r = stg.getBoundingClientRect()
        stg.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`)
        stg.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`)
      }
      let hole = 0
      let want = 0
      const tick = () => {
        hole += (want - hole) * 0.12
        stg.style.setProperty('--hole', `${hole.toFixed(1)}px`)
      }
      gsap.ticker.add(tick)
      stg.addEventListener('pointermove', onMove)
      stg.addEventListener('pointerenter', () => (want = 250))
      stg.addEventListener('pointerleave', () => (want = 0))

      return () => {
        gsap.ticker.remove(tick)
        stg.removeEventListener('pointermove', onMove)
      }
    }, sec)

    return () => {
      window.clearTimeout(fallback)
      window.removeEventListener('ash:preloaded', start)
      ctx.revert()
    }
  }, [])

  const jumpToAct = (act: 'act1' | 'act2' | 'act3') => {
    playLaser()
    setActiveAct(act)
    const sec = section.current
    if (!sec) return
    const rect = sec.getBoundingClientRect()
    const scrollTop = window.scrollY + rect.top
    const totalHeight = rect.height - window.innerHeight

    let targetRatio = 0.02
    if (act === 'act2') targetRatio = 0.48
    if (act === 'act3') targetRatio = 0.88

    window.scrollTo({
      top: scrollTop + totalHeight * targetRatio,
      behavior: 'smooth',
    })
  }

  // optional WAN hero clip — when the file exists it replaces the still acts
  const onVideoReady = (v: HTMLVideoElement) => {
    v.addEventListener('loadeddata', () => stage.current?.classList.add('has-reel'), { once: true })
  }

  return (
    <section className="hero" ref={section} data-theme="dark" data-cursor="Peel">
      <div className="hero__sticky">
        <div className="hero__stage" ref={stage}>
          <Topo className="u-lime hero__topo" />

          <img
            className="hero__layer hero__layer--anon"
            src={asset('/img/anon-void.jpg')}
            alt=""
            aria-hidden="true"
            ref={anon}
            fetchPriority="high"
          />
          <img
            className="hero__layer hero__layer--nocap"
            src={asset('/img/hero-nocap-dark.jpg')}
            alt=""
            aria-hidden="true"
            ref={nocap}
            fetchPriority="high"
          />
          <img
            className="hero__layer hero__layer--cap"
            src={asset('/img/hero-cap-dark.jpg')}
            alt="Kalos Ash, the character behind Asheo"
            ref={cap}
            fetchPriority="high"
          />

          <video
            ref={(v) => {
              video.current = v
              if (v) onVideoReady(v)
            }}
            className="hero__layer hero__reel"
            src={asset(HERO_VIDEO)}
            poster={asset('/img/ash-model.png')}
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
          />

          <div className="hero__grade" />
          <div className="hero__scan" ref={scan} />
          <div className="hero__reticle" aria-hidden="true">
            <div className="hero__reticle-inner" />
          </div>
        </div>

        {/* top status row */}
        <div className="hero__topbar" ref={topbar}>
          <span className="tag u-mono">
            <i className="dot" /> {BUILD.edition} · {BUILD.serial}
          </span>
          <span className="tag u-mono hide-mobile" style={{ color: 'var(--lime)', border: '1px solid rgba(212,255,0,0.3)' }}>
            ● COORD: 48.8566° N, 2.3522° E [LUMIOSE]
          </span>
          <span className="tag u-mono">ASHEO {BUILD.version} · MV3 · FREE CORE</span>
        </div>

        {/* Interactive Act Navigation Controller */}
        <div className="hero__act-nav u-mono">
          <button
            type="button"
            className={`act-pill ${activeAct === 'act1' ? 'is-active' : ''}`}
            onClick={() => jumpToAct('act1')}
            data-cursor="Act I"
          >
            <span>01 // KALOS MASCOT</span>
          </button>
          <button
            type="button"
            className={`act-pill ${activeAct === 'act2' ? 'is-active' : ''}`}
            onClick={() => jumpToAct('act2')}
            data-cursor="Act II"
          >
            <span>02 // CAP-OFF REVEAL</span>
          </button>
          <button
            type="button"
            className={`act-pill ${activeAct === 'act3' ? 'is-active' : ''}`}
            onClick={() => jumpToAct('act3')}
            data-cursor="Act III"
          >
            <span>03 // FACELESS ARCHITECT</span>
          </button>
          <a
            href="#test-bench"
            className="act-pill act-pill--lime"
            onClick={() => playClick()}
            data-cursor="Simulator"
          >
            <span>⚡ LIVE SIMULATOR</span>
          </a>
        </div>

        <div className="hero__cue" ref={cue}>
          <span className="u-mono">Scroll to unwrap</span>
          <i />
        </div>

        {/* act captions */}
        <div className="hero__caption hero__caption--l" ref={capA}>
          <span className="u-mono">Act I — the mascot</span>
          <b>Kalos Ash.</b>
          <span>Cap and jacket from the XY run. The character on every build.</span>
        </div>
        <div className="hero__caption hero__caption--r" ref={capB} style={{ opacity: 0 }}>
          <span className="u-mono">Act II — cap off</span>
          <b>Still not a face reveal.</b>
          <span>You can take the cap. You don’t get the person.</span>
        </div>
        <div className="hero__caption hero__caption--l" ref={capC} style={{ opacity: 0 }}>
          <span className="u-mono">Act III — the architect</span>
          <b>Nobody underneath.</b>
          <span>Ash has never shown his face. Judge the build instead.</span>
        </div>

        <h1 className="hero__wordmark" ref={word}>
          ASH
        </h1>
        <p className="hero__sub u-mono">
          Independent engineer · Architect of Asheo · No face reveal
        </p>

        <div className="hero__card" ref={card}>
          <span className="u-mono">Current build</span>
          <h3>
            Asheo
            <br />
            {BUILD.version}
          </h3>
          <p>2.0 MB · MV3 · 41 gateway handlers</p>
        </div>

        <div className="hero__hint u-mono">
          <b>Move · peel the layer</b>
          <span>The cursor burns a hole through the act. Scroll cuts to the next.</span>
        </div>
      </div>
    </section>
  )
}
