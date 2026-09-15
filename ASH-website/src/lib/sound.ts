/**
 * Native Web Audio API procedural sound synthesizer.
 * Zero external audio files, instant response, cyber/tactile feedback.
 */

let audioCtx: AudioContext | null = null
let soundEnabled = false

export function isSoundEnabled(): boolean {
  return soundEnabled
}

export function toggleSound(): boolean {
  soundEnabled = !soundEnabled
  if (soundEnabled && !audioCtx && typeof window !== 'undefined') {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (Ctx) {
      audioCtx = new Ctx()
    }
  }
  if (soundEnabled) {
    playChime()
  }
  return soundEnabled
}

function getContext(): AudioContext | null {
  if (!soundEnabled) return null
  if (!audioCtx && typeof window !== 'undefined') {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (Ctx) {
      audioCtx = new Ctx()
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
  return audioCtx
}

/** Subtle tactile click on hover / tab change */
export function playClick() {
  const ctx = getContext()
  if (!ctx) return
  try {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(800, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.03)
    gain.gain.setValueAtTime(0.04, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + 0.035)
  } catch {}
}

/** Cyber pulse chime on card generation or success */
export function playChime() {
  const ctx = getContext()
  if (!ctx) return
  try {
    const now = ctx.currentTime
    const osc1 = ctx.createOscillator()
    const osc2 = ctx.createOscillator()
    const gain = ctx.createGain()
    osc1.type = 'triangle'
    osc2.type = 'sine'
    osc1.frequency.setValueAtTime(523.25, now) // C5
    osc1.frequency.setValueAtTime(659.25, now + 0.06) // E5
    osc1.frequency.setValueAtTime(783.99, now + 0.12) // G5
    osc2.frequency.setValueAtTime(1046.5, now + 0.12) // C6

    gain.gain.setValueAtTime(0.06, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35)

    osc1.connect(gain)
    osc2.connect(gain)
    gain.connect(ctx.destination)

    osc1.start(now)
    osc2.start(now + 0.12)
    osc1.stop(now + 0.35)
    osc2.stop(now + 0.35)
  } catch {}
}

/** Laser scan sound when unwrap or mask transition occurs */
export function playLaser() {
  const ctx = getContext()
  if (!ctx) return
  try {
    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(1600, now)
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.15)

    gain.gain.setValueAtTime(0.03, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15)

    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(now)
    osc.stop(now + 0.16)
  } catch {}
}

/** Keystroke tick for the interactive terminal */
export function playKeystroke() {
  const ctx = getContext()
  if (!ctx) return
  try {
    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    const freq = 450 + Math.random() * 200
    osc.frequency.setValueAtTime(freq, now)
    gain.gain.setValueAtTime(0.025, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.02)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(now)
    osc.stop(now + 0.025)
  } catch {}
}
