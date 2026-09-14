import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { gsap, ScrollTrigger, reducedMotion } from '#/lib/motion'
import { HIGH_CLASS } from '#/lib/split'
import { HL_COLORS, type HlColor } from '#/lib/reveal'

type Props = {
  children: ReactNode
  className?: string
  color?: HlColor
  direction?: 'right' | 'left'
  delay?: number
  stagger?: number
  on?: 'scroll' | 'load'
}

/**
 * The Lando `data-stat-list` reveal: each direct child is wiped open from one
 * side with a colour bar sweeping across it, staggered item by item.
 */
export function RevealGrid({
  children,
  className = '',
  color = 'lime',
  direction = 'right',
  delay = 0,
  stagger = 0.05,
  on = 'scroll',
}: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const el = ref.current
    if (!el || reducedMotion()) return

    const items = Array.from(el.children) as HTMLElement[]
    if (!items.length) return

    const dur = 0.6
    const hidden = direction === 'right' ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)'
    const open = direction === 'right' ? 'inset(0 0% 0 0)' : 'inset(0 0 0 0%)'

    const tl = gsap.timeline({ paused: true, defaults: { duration: dur } })

    items.forEach((it, i) => {
      it.style.position = 'relative'
      it.style.overflow = 'hidden'

      const bar = document.createElement('span')
      bar.className = HIGH_CLASS
      bar.style.background = HL_COLORS[color]
      bar.style.transformOrigin = direction === 'right' ? 'right center' : 'left center'
      it.appendChild(bar)

      const at = i * stagger + delay
      gsap.set(it, { clipPath: hidden })
      tl.to(it, { clipPath: open, ease: 'power2.out' }, at)
      tl.to(bar, { scaleX: 0, duration: dur, ease: 'power2.inOut' }, at + dur / 2)
    })

    let st: ScrollTrigger | null = null
    let played = false
    const play = () => {
      if (played) return
      played = true
      tl.eventCallback('onComplete', () => {
        items.forEach((it) => it.querySelectorAll('.' + HIGH_CLASS).forEach((bar) => bar.remove()))
      })
      tl.play()
    }

    if (on === 'load') {
      play()
    } else {
      st = ScrollTrigger.create({ trigger: el, start: 'top 90%', once: true, onEnter: play })
    }

    const safety = window.setTimeout(play, 4500)

    return () => {
      window.clearTimeout(safety)
      st?.kill()
      tl.kill()
      items.forEach((it) => {
        it.style.clipPath = ''
        it.querySelectorAll('.' + HIGH_CLASS).forEach((bar) => bar.remove())
      })
    }
  }, [className, color, direction, delay, stagger, on])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}