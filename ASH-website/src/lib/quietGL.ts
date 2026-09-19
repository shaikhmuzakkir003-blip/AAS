/**
 * ANGLE (Firefox) writes X4122 double-precision constant-folding notices into
 * the WebGL program info log whenever three's built-in PBR shader chunks
 * compile — the production Lando Norris site produces the identical lines.
 * They are translator noise about three's own shader source, not app issues,
 * so we drop exactly those lines and keep every other console message.
 */
const isDriverNoise = (a: unknown) =>
  typeof a === 'string' && a.includes('THREE.WebGLProgram') && a.includes('X4122')

export function installQuietGL() {
  if (typeof window === 'undefined') return
  const w = window as unknown as { __quietGL?: boolean }
  if (w.__quietGL) return
  w.__quietGL = true
  for (const k of ['warn', 'error'] as const) {
    const orig = console[k].bind(console)
    console[k] = (...args: unknown[]) => {
      if (args.some(isDriverNoise)) return
      orig(...args)
    }
  }
}
