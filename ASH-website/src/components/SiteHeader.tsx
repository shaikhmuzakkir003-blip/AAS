import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from '@tanstack/react-router'
import { NAV, SOCIALS } from '#/data/site'
import { gsap, ScrollTrigger } from '#/lib/motion'

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState(0)
  const [markOn, setMarkOn] = useState(false)
  const menu = useRef<HTMLDivElement>(null)
  const items = useRef<HTMLDivElement>(null)
  const location = useLocation()

  // close on navigation
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  // centre monogram appears once the hero is behind you
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const onScroll = () => setMarkOn(window.scrollY > window.innerHeight * 0.6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // overlay open / close
  useEffect(() => {
    const el = menu.current
    if (!el) return
    const links = items.current?.querySelectorAll('.menu__item b') ?? []
    const tl = gsap.timeline()
    if (open) {
      document.documentElement.style.overflow = 'hidden'
      tl.set(el, { visibility: 'visible' })
        .to(el, {
          clipPath: 'inset(0 0 0% 0)',
          duration: 0.75,
          ease: 'expo.inOut',
        })
        .from(
          links,
          { yPercent: 110, duration: 0.7, stagger: 0.055, ease: 'expo.out' },
          '-=0.35',
        )
    } else {
      document.documentElement.style.overflow = ''
      tl.to(el, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.6,
        ease: 'expo.inOut',
      }).set(el, { visibility: 'hidden' })
    }
    return () => {
      tl.kill()
    }
  }, [open])

  return (
    <>
      <header className="hdr">
        <Link to="/" className="hdr__logo" aria-label="Ash, home" data-cursor="Home">
          <em>Ash</em>
          <strong>Builds</strong>
        </Link>

        <span className={`hdr__mark u-eyebrow ${markOn ? 'is-on' : ''}`}>
          <AshMark />
        </span>

        <div className="hdr__right">
          <Link to="/asheo" className="pill" data-cursor="Get it">
            <span>Get Asheo</span>
          </Link>
          <button
            className={`burger ${open ? 'is-open' : ''}`}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            data-cursor={open ? 'Close' : 'Menu'}
          >
            <i />
            <i />
          </button>
        </div>
      </header>

      <div className={`menu ${open ? 'is-open' : ''}`} ref={menu}>
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
                key={item.img}
                src={item.img}
                alt=""
                className={i === hovered ? 'is-on' : ''}
                loading="lazy"
              />
            ))}
          </div>
        </div>

        <div className="menu__foot u-mono">
          <span>Ash · independent developer · building Asheo</span>
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
    <svg width="26" height="18" viewBox="0 0 26 18" fill="none" aria-hidden="true">
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
