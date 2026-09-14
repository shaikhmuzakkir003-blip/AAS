import { gsap, ScrollTrigger, reducedMotion } from '#/lib/motion'
import { splitLines, LINE_CLASS, HIGH_CLASS } from '#/lib/split'

export type HlColor = 'lime' | 'bone' | 'olive' | 'ink' | 'sage'

export const HL_COLORS: Record<HlColor, string> = {
  lime: 'var(--lime)',
  bone: 'var(--bone)',
  olive: 'var(--olive)',
  ink: 'var(--ink)',
  sage: 'var(--sage)',
}

export type HlOpts = {
  color?: HlColor
  direction?: 'right' | 'left'
  delay?: number
  stagger?: number
  on?: 'scroll' | 'load'
}

const noop = () => {}

/**
 * The landonorris.com signature text reveal. Each line of a text block is
 * wrapped in its own clip, wiped open from one side while a solid accent bar
 * sweeps across it, then the bar collapses away. Lines stagger in from the top
 * as the block crosses 90% of the viewport.
 */
export function highlineReveal(el: HTMLElement, opts: HlOpts = {}): () => void {
  if (reducedMotion()) return noop
  const { color = 'lime', direction = 'right', delay = 0, stagger = 0.15, on = 'scroll' } = opts
  const dur = 0.6

  let revealed = false
  let dispose: () => void = noop

  const build = () => {
    dispose()
    const lines = splitLines(el)

    if (revealed) {
      // already played — re-group but keep everything visible
      for (const line of lines) line.style.position = 'relative'
      dispose = noop
      return
    }

    if (!lines.length) {
      dispose = noop
      return
    }

    const hidden = direction === 'right' ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)'
    const open = direction === 'right' ? 'inset(0 0% 0 0)' : 'inset(0 0 0 0%)'

    const tl = gsap.timeline({ paused: true, defaults: { duration: dur } })

    lines.forEach((line, i) => {
      line.style.position = 'relative'
      line.querySelectorAll('.' + HIGH_CLASS).forEach((bar) => bar.remove())

      const bar = document.createElement('span')
      bar.className = HIGH_CLASS
      bar.style.background = HL_COLORS[color]
      bar.style.transformOrigin = direction === 'right' ? 'right center' : 'left center'
      line.appendChild(bar)

      const at = i * stagger + delay
      gsap.set(line, { clipPath: hidden })
      tl.to(line, { clipPath: open, ease: 'power2.out' }, at)
      tl.to(bar, { scaleX: 0, duration: dur, ease: 'power2.inOut' }, at + dur / 2)
    })

    let st: ScrollTrigger | null = null
    const play = () => {
      if (revealed) return
      revealed = true
      tl.eventCallback('onComplete', () => {
        lines.forEach((l) => l.querySelectorAll('.' + HIGH_CLASS).forEach((bar) => bar.remove()))
      })
      tl.play()
    }

    if (on === 'load') {
      play()
    } else {
      st = ScrollTrigger.create({ trigger: el, start: 'top 90%', once: true, onEnter: play })
    }

    // never leave anything hidden, whatever the environment does
    const safety = window.setTimeout(play, 4500)

    dispose = () => {
      window.clearTimeout(safety)
      st?.kill()
      tl.kill()
      lines.forEach((l) => l.querySelectorAll('.' + HIGH_CLASS).forEach((bar) => bar.remove()))
    }
  }

  build()

  // re-group with the new metrics once the type reflows
  let lastW = el.clientWidth
  let t = 0
  const onResize = () => {
    window.clearTimeout(t)
    t = window.setTimeout(() => {
      const w = el.clientWidth
      if (Math.abs(w - lastW) < 2) return
      lastW = w
      build()
    }, 180)
  }
  window.addEventListener('resize', onResize)

  return () => {
    window.removeEventListener('resize', onResize)
    window.clearTimeout(t)
    dispose()
  }
}

export { LINE_CLASS, HIGH_CLASS }