import { useEffect } from 'react'
import type { RefObject } from 'react'

type Watcher = { el: HTMLElement; show: () => void }

const watchers = new Set<Watcher>()
let running = false

/** One rAF-throttled pass over everything waiting to be revealed. */
function pass() {
  running = false
  const h = window.innerHeight
  for (const w of watchers) {
    const r = w.el.getBoundingClientRect()
    if (r.top < h * 0.92 && r.bottom > 0) {
      w.show()
      watchers.delete(w)
    }
  }
}

function schedule() {
  if (running) return
  running = true
  requestAnimationFrame(pass)
}

function listen() {
  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', schedule)
}

let listening = false

/**
 * Reveals on scroll position rather than through IntersectionObserver, so a
 * section still appears in environments where the observer never fires.
 * Children carrying `.reveal` are staggered in order.
 */
export function useReveal(
  ref: RefObject<HTMLElement | null>,
  { stagger = 0.08, delay = 0 } = {},
) {
  useEffect(() => {
    const node = ref.current
    if (!node) return

    const found = node.querySelectorAll<HTMLElement>('.reveal')
    const targets = found.length ? Array.from(found) : [node]
    targets.forEach((el, i) => {
      el.style.transitionDelay = `${delay + i * stagger}s`
    })

    const watcher: Watcher = {
      el: node,
      show: () => targets.forEach((el) => el.classList.add('is-in')),
    }
    watchers.add(watcher)

    if (!listening) {
      listening = true
      listen()
    }
    schedule()
    // catch late layout shifts from fonts and images
    const settle = window.setTimeout(schedule, 600)
    // and never leave anything hidden, whatever the environment does with scroll
    const safety = window.setTimeout(() => {
      watcher.show()
      watchers.delete(watcher)
    }, 4000)

    return () => {
      watchers.delete(watcher)
      window.clearTimeout(settle)
      window.clearTimeout(safety)
    }
  }, [ref, stagger, delay])
}
