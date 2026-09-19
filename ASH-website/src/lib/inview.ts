import { useEffect } from 'react'
import type { RefObject } from 'react'

/**
 * IntersectionObserver-based reveal. Anything inside `ref` carrying
 * `.fade` rises in (staggered by DOM order); containers get `.is-in`,
 * which drives the CSS `.word > i` mask reveal.
 */
export function useInView<T extends HTMLElement>(
  ref: RefObject<T | null>,
  { stagger = 0.07, delay = 0, threshold = 0.18 } = {},
) {
  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (document.documentElement.classList.contains('reduce-motion')) {
      node.classList.add('is-in')
      node.querySelectorAll('.fade').forEach((el) => el.classList.add('is-in'))
      return
    }

    const fades = Array.from(node.querySelectorAll<HTMLElement>('.fade'))
    fades.forEach((el, i) => {
      el.style.transitionDelay = `${delay + i * stagger}s`
    })
    // word stagger index fallback for words that did not set their own --i
    node.querySelectorAll<HTMLElement>('.word').forEach((el, i) => {
      if (!el.style.getPropertyValue('--i')) el.style.setProperty('--i', String(i % 24))
    })

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            node.classList.add('is-in')
            fades.forEach((el) => el.classList.add('is-in'))
            io.disconnect()
          }
        }
      },
      { threshold, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(node)

    // safety: never leave content hidden
    const safety = window.setTimeout(() => {
      node.classList.add('is-in')
      fades.forEach((el) => el.classList.add('is-in'))
      io.disconnect()
    }, 5200)

    return () => {
      window.clearTimeout(safety)
      io.disconnect()
    }
  }, [ref, stagger, delay, threshold])
}

/** Fires a callback once, the first time an element scrolls into view. */
export function useWhenInView<T extends HTMLElement>(
  ref: RefObject<T | null>,
  cb: () => void,
  { threshold = 0.4 } = {},
) {
  useEffect(() => {
    const node = ref.current
    if (!node) return
    let fired = false
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !fired) {
            fired = true
            cb()
            io.disconnect()
          }
        }
      },
      { threshold },
    )
    io.observe(node)
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref])
}
