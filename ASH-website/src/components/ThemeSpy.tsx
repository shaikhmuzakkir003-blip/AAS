import { useEffect } from 'react'
import { gsap, ScrollTrigger } from '#/lib/motion'

/**
 * Flips the fixed header's colour to contrast whatever section is at the
 * top of the viewport. Sections declare themselves with data-theme.
 * Routes are lazy, so sections can appear after mount — a MutationObserver
 * wires up newcomers and re-probes the top band.
 */
export function ThemeSpy() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const rootEl = document.documentElement
    const set = (theme: string) => rootEl.setAttribute('data-theme', theme)
    set('dark')

    const seen = new WeakSet<HTMLElement>()
    // sections only: wrapper divs (e.g. .shell) also carry data-theme and
    // span the whole page, so they would win every probe/trigger forever
    const probe = () => {
      const y = window.innerHeight * 0.12
      const at = Array.from(document.querySelectorAll('section[data-theme]')).find((el) => {
        const r = (el as HTMLElement).getBoundingClientRect()
        return r.top <= y && r.bottom >= y
      }) as HTMLElement | undefined
      if (at) set(at.dataset.theme || 'dark')
    }

    const wire = () => {
      document.querySelectorAll<HTMLElement>('section[data-theme]').forEach((el) => {
        if (seen.has(el)) return
        seen.add(el)
        ScrollTrigger.create({
          trigger: el,
          start: 'top 12%',
          end: 'bottom 12%',
          onToggle: (self) => {
            if (self.isActive) set(el.dataset.theme || 'dark')
          },
          onEnter: () => set(el.dataset.theme || 'dark'),
          onEnterBack: () => set(el.dataset.theme || 'dark'),
        })
      })
      probe()
    }
    wire()

    const mo = new MutationObserver(wire)
    mo.observe(document.body, { childList: true, subtree: true })
    window.addEventListener('resize', probe)

    return () => {
      mo.disconnect()
      window.removeEventListener('resize', probe)
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return null
}
