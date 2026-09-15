import { useEffect } from 'react'
import { gsap, ScrollTrigger, reducedMotion } from '#/lib/motion'

/**
 * Flips the fixed header's colour to contrast whatever section is at the
 * top of the viewport. Sections declare themselves with data-theme.
 */
export function ThemeSpy() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    document.documentElement.setAttribute('data-theme', 'dark')

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('[data-theme]'),
    )

    const set = (theme: string) =>
      document.documentElement.setAttribute('data-theme', theme)

    sections.forEach((el) => {
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

    set('dark')
    if (!reducedMotion()) {
      // triggers created above; nothing else to do
    }
    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [])

  return null
}
