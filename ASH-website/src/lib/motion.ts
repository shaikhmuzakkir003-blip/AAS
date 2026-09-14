import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let registered = false

export function useGsap(effect: (ctx: { gsap: typeof gsap }) => void | (() => void), deps: unknown[] = []) {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!registered) {
      gsap.registerPlugin(ScrollTrigger)
      registered = true
    }
    let cleanup: void | (() => void)
    const ctx = gsap.context(() => {
      cleanup = effect({ gsap })
    })
    return () => {
      if (typeof cleanup === 'function') cleanup()
      ctx.revert()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

export { gsap, ScrollTrigger }

export const reducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Split a string into word spans ready for a stagger reveal. */
export function words(text: string) {
  return text.split(' ').filter(Boolean)
}
