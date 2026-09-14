import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, reducedMotion } from '#/lib/motion'

/** Inertial page scrolling, kept in sync with every ScrollTrigger on the page. */
export function SmoothScroll() {
  useEffect(() => {
    if (reducedMotion()) return
    gsap.registerPlugin(ScrollTrigger)

    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 1,
      smoothWheel: true,
    })

    const onScroll = () => ScrollTrigger.update()
    lenis.on('scroll', onScroll)

    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.off('scroll', onScroll)
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])

  return null
}
