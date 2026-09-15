import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from '@tanstack/react-router'
import { NAV, SOCIALS, LINKS } from '#/data/site'
import { gsap, ScrollTrigger } from '#/lib/motion'
import { isSoundEnabled, toggleSound, playClick } from '#/lib/sound'
import { asset } from '#/lib/asset'

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState(0)
  const [markOn, setMarkOn] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [soundActive, setSoundActive] = useState(false)
  const menu = useRef<HTMLDivElement>(null)
  const items = useRef<HTMLDivElement>(null)
  const location = useLocation()

  useEffect(() => {
    setSoundActive(isSoundEnabled())
  }, [])

  const handleSoundToggle = () => {
    const next = toggleSound()
    setSoundActive(next)
  }

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setMarkOn(y > window.innerHeight * 0.75)
      // Hide while scrolling down past the hero height; reveal on scroll-up or near top.
      setHidden(y > lastY + 6 && y > window.innerHeight * 0.9)
      lastY = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const el = menu.current
    if (!el) return
    const links = items.current?.querySelectorAll('.menu__item b') ?? []
    const tl = gsap.timeline()
    if (open) {
      document.documentElement.style.overflow = 'hidden'
      tl.set(el, { visibility: 'visible' })
        .to(el, { clipPath: 'inset(0 0 0% 0)', duration: 0.8, ease: 'expo.inOut' })
        .from(
          links,
          { yPercent: 115, duration: 0.8, stagger: 0.06, ease: 'expo.out' },
          '-=0.4',
        )
        .from(
          '.menu__foot > *',
          { y: 20, opacity: 0, duration: 0.6, stagger: 0.06, ease: 'expo.out' },
          '-=0.4',
        )
    } else {
      document.documentElement.style.overflow = ''
      tl.to(el, { clipPath: 'inset(0 0 100% 0)', duration: 0.6, ease: 'expo.inOut' }).set(
        el,
        { visibility: 'hidden' },
      )
    }
    return () => {
      tl.kill()
    }
  }, [open])

  return (
    <>
      <header
        className={`hdr ${hidden && !open ? 'is-hidden' : ''} ${markOn ? 'is-solid' : ''}`}
        data-theme-ignore
      >
        <Link to="/" className="hdr__logo" aria-label="Ash — home" data-cursor="Home" onClick={() => playClick()}>
          <em>ash</em>
          <strong>BUILDS</strong>
        </Link>

        <span className={`hdr__mark u-eyebrow ${markOn ? 'is-on' : ''}`}>
          <AshMark />
        </span>

        <div className="hdr__right">
          <button
            type="button"
            className={`sound-btn u-mono ${soundActive ? 'is-active' : ''}`}
            onClick={handleSoundToggle}
            title={soundActive ? 'Mute audio feedback' : 'Enable audio feedback'}
            data-cursor="Sound"
          >
            <span>{soundActive ? 'SFX ON' : 'SFX OFF'}</span>
          </button>
          <a className="pill" href={LINKS.download} target="_blank" rel="noreferrer" data-cursor="Get it" onClick={() => playClick()}>
            <span>Get Asheo</span>
          </a>
          <button
            className={`burger ${open ? 'is-open' : ''}`}
            onClick={() => {
              playClick()
              setOpen((v) => !v)
            }}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            data-cursor={open ? 'Close' : 'Menu'}
          >
            <i />
            <i />
          </button>
        </div>
      </header>

      <div className={`menu ${open ? 'is-open' : ''}`} ref={menu} data-theme="dark">
        <div className="menu__grid">
          <div className="menu__nav" ref={items}>
            {NAV.map((item, i) => (
              <Link
                key={item.to}
                to={item.to}
                className="menu__item"
                onMouseEnter={() => setHovered(i)}
                data-cursor="Go"
              >
                <b>{item.label}</b>
                <i>{item.index}</i>
              </Link>
            ))}
          </div>

          <div className="menu__media" aria-hidden="true">
            {NAV.map((item, i) => (
              <img
                key={item.to}
                src={asset(item.img)}
                alt=""
                className={i === hovered ? 'is-on' : ''}
                loading="lazy"
              />
            ))}
          </div>
        </div>

        <div className="menu__foot u-mono">
          <span>
            {`ASH · independent engineer · `}
            <a href={LINKS.telegram} target="_blank" rel="noreferrer" style={{ color: 'var(--lime)' }}>
              @moreash
            </a>
          </span>
          <div className="menu__socials">
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export function AshMark() {
  return (
    <svg width="28" height="20" viewBox="0 0 26 18" fill="none" aria-hidden="true">
      <path
        d="M2 17 10 1l6 12 3-6 5 10"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  )
}
