import { useEffect, useRef, useState } from 'react'

type ReelProps = {
  /** mp4/webm — if it fails to load, the poster stays as a still */
  src: string
  poster: string
  alt?: string
  className?: string
  /** play while on screen, loop */
  autoplay?: boolean
  onState?: (playing: boolean) => void
}

/**
 * Cinematic clip with an automatic still fallback. Drop a WAN render at the
 * given public path (e.g. /public/video/night-coding.mp4) and it just plays;
 * until then the poster image is used with no broken UI.
 */
export function Reel({
  src,
  poster,
  alt = '',
  className = '',
  autoplay = true,
  onState,
}: ReelProps) {
  const ref = useRef<HTMLVideoElement>(null)
  const [ok, setOk] = useState(false)

  useEffect(() => {
    const v = ref.current
    if (!v) return
    const onLoaded = () => {
      setOk(true)
      onState?.(true)
    }
    const onErr = () => {
      setOk(false)
      onState?.(false)
    }
    v.addEventListener('loadeddata', onLoaded)
    v.addEventListener('error', onErr)
    return () => {
      v.removeEventListener('loadeddata', onLoaded)
      v.removeEventListener('error', onErr)
    }
  }, [src, onState])

  useEffect(() => {
    if (!autoplay || !ok) return
    const v = ref.current
    if (!v) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {})
        else v.pause()
      },
      { threshold: 0.25 },
    )
    io.observe(v)
    return () => io.disconnect()
  }, [autoplay, ok])

  return (
    <>
      <img src={poster} alt={alt} className={className} aria-hidden={ok} loading="lazy" />
      <video
        ref={ref}
        className={className}
        style={{ display: ok ? 'block' : 'none', position: 'absolute', inset: 0 }}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden={!ok}
      />
    </>
  )
}
