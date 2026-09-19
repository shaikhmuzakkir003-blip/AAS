import { useEffect, useRef } from 'react'
import { reducedMotion } from '#/lib/motion'

/**
 * The tidal off-white stage from the LN home hero: big soft FILLED contour
 * blobs drifting under the hairlines. Their build ships it through the
 * compiled Webflow CSS/asset layer (unreachable from this sandbox), so the
 * same field is rebuilt live here — value-noise iso-bands, soft edges,
 * slow drift. Reduced motion renders one static frame.
 */
export function TidalBg() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cv = ref.current
    if (!cv) return
    const ctx = cv.getContext('2d')
    if (!ctx) return

    const reduce = reducedMotion()
    const SCALE = 6 // low-res field; upscale smoothing = the soft blob edges
    let w = 0
    let h = 0
    let lw = 0
    let lh = 0
    let low: HTMLCanvasElement
    let lctx: CanvasRenderingContext2D
    let img: ImageData

    const resize = () => {
      const r = cv.getBoundingClientRect()
      w = Math.max(2, Math.floor(r.width))
      h = Math.max(2, Math.floor(r.height))
      cv.width = w
      cv.height = h
      lw = Math.max(2, Math.ceil(w / SCALE))
      lh = Math.max(2, Math.ceil(h / SCALE))
      low = document.createElement('canvas')
      low.width = lw
      low.height = lh
      lctx = low.getContext('2d')!
      img = lctx.createImageData(lw, lh)
    }
    resize()
    window.addEventListener('resize', resize)

    // ---- value noise ----
    const P = new Uint8Array(512)
    for (let i = 0; i < 256; i++) P[i] = i
    for (let i = 255; i > 0; i--) {
      const j = (i * 16807) % (i + 1)
      const t = P[i]
      P[i] = P[j]
      P[j] = t
    }
    for (let i = 0; i < 256; i++) P[256 + i] = P[i]
    const hsh = (x: number, y: number) => P[(P[x & 255] + y) & 255] / 255
    const sm = (t: number) => t * t * (3 - 2 * t)
    const vn = (x: number, y: number) => {
      const xi = Math.floor(x)
      const yi = Math.floor(y)
      const xf = x - xi
      const yf = y - yi
      const a = hsh(xi, yi)
      const b = hsh(xi + 1, yi)
      const c = hsh(xi, yi + 1)
      const d = hsh(xi + 1, yi + 1)
      const u = sm(xf)
      const v = sm(yf)
      return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v
    }
    const fbm = (x: number, y: number) =>
      0.55 * vn(x, y) + 0.28 * vn(x * 2.1 + 31, y * 2.1 + 17) + 0.17 * vn(x * 4.3 + 71, y * 4.3 + 53)

    const BASE: [number, number, number] = [245, 244, 240]
    const BLOB: [number, number, number] = [231, 229, 224]

    let t = 7.3
    let raf = 0
    let frame = 0

    const paint = () => {
      const data = img.data
      let i = 0
      for (let y = 0; y < lh; y++) {
        for (let x = 0; x < lw; x++) {
          const n = fbm(x * 0.045 + t * 0.35, y * 0.07 - t * 0.22)
          const m = sm(Math.min(1, Math.max(0, (n - 0.52) / 0.06)))
          data[i] = BASE[0] + (BLOB[0] - BASE[0]) * m
          data[i + 1] = BASE[1] + (BLOB[1] - BASE[1]) * m
          data[i + 2] = BASE[2] + (BLOB[2] - BASE[2]) * m
          data[i + 3] = 255
          i += 4
        }
      }
      lctx.putImageData(img, 0, 0)
      ctx.imageSmoothingEnabled = true
      ctx.drawImage(low, 0, 0, w, h)
    }

    const loop = () => {
      frame++
      if (frame % 2 === 0) {
        t += 0.016
        paint()
      }
      raf = requestAnimationFrame(loop)
    }
    paint()
    if (!reduce) raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={ref} className="tidal" aria-hidden="true" />
}
