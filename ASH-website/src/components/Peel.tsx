import { useEffect, useRef } from 'react'

type Props = {
  skin: string
  under: string
  alt: string
  className?: string
  radius?: number
  video?: string
}

/**
 * Static version of the hero peel: the cursor opens a soft radial hole in
 * the top plate, revealing what is underneath.
 */
export function Peel({ skin, under, alt, className = '', radius = 210, video }: Props) {
  const box = useRef<HTMLDivElement>(null)
  const layer = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const el = box.current
    const img = layer.current
    if (!el || !img) return

    let hole = 0
    let want = 0
    let raf = 0

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`)
      el.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`)
    }
    const enter = () => (want = radius)
    const leave = () => (want = 0)
    const tick = () => {
      hole += (want - hole) * 0.12
      el.style.setProperty('--hole', `${hole.toFixed(1)}px`)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerenter', enter)
    el.addEventListener('pointerleave', leave)
    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerenter', enter)
      el.removeEventListener('pointerleave', leave)
    }
  }, [radius])

  return (
    <div className={`peel ${className}`} ref={box} data-cursor="Peel">
      <img className="peel__under" src={under} alt="" aria-hidden="true" loading="lazy" />
      <img className="peel__skin" src={skin} alt={alt} ref={layer} loading="lazy" />
      {video ? (
        <video
          className="peel__video"
          src={video}
          poster={skin}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
        />
      ) : null}
    </div>
  )
}
