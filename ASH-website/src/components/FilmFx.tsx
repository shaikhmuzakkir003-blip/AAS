import { useEffect } from 'react'

/** Fixed film grain + vignette layers, and a reduce-motion flag on <html>. */
export function FilmFx() {
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () =>
      document.documentElement.classList.toggle('reduce-motion', mq.matches)
    apply()
    mq.addEventListener?.('change', apply)
    return () => mq.removeEventListener?.('change', apply)
  }, [])

  return (
    <>
      <div className="vignette" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
    </>
  )
}
