import { useEffect, useRef } from 'react'

type Props = {
  skin: string
  under: string
  alt: string
  className?: string
  /** how wide the unwrap hole opens, in px */
  radius?: number
}

/**
 * Ash's model with the anonymous figure underneath. Moving the pointer over it
 * opens a soft hole in the model and the black figure shows through.
 */
export function Unwrap({ skin, under, alt, className = '', radius = 190 }: Props) {
  const box = useRef<HTMLDivElement>(null)
  const layer = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const el = box.current
    const img = layer.current
    if (!el || !img) return

    let hole = 0
    let want = 0
    let frame = 0

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      img.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`)
      img.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`)
    }
    const enter = () => {
      want = radius
    }
    const leave = () => {
      want = 0
    }

    const tick = () => {
      hole += (want - hole) * 0.12
      img.style.setProperty('--hole', `${hole.toFixed(2)}px`)
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)

    el.addEventListener('pointermove', move)
    el.addEventListener('pointerenter', enter)
    el.addEventListener('pointerleave', leave)
    return () => {
      cancelAnimationFrame(frame)
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerenter', enter)
      el.removeEventListener('pointerleave', leave)
    }
  }, [radius])

  return (
    <div className={`unwrap ${className}`} ref={box} data-cursor="Unwrap">
      <div className="unwrap__spacer" />
      <img src={under} alt="" aria-hidden="true" loading="lazy" />
      <img className="unwrap__skin" src={skin} alt={alt} ref={layer} loading="lazy" />
    </div>
  )
}
