export const WORD_CLASS = 'ln-word'
export const LINE_CLASS = 'ln-line'
export const HIGH_CLASS = 'ln-high'

const STYLE_KEYS = [
  'color',
  'font-family',
  'font-size',
  'font-style',
  'font-weight',
  'letter-spacing',
  'line-height',
  'text-transform',
]

/** The nearest intermediate inline element between a word and the text root. */
function nearestStyled(word: HTMLElement, root: HTMLElement): HTMLElement | null {
  let a = word.parentElement
  while (a && a !== root) {
    a = a.parentElement
  }
  return a && a !== root ? a : null
}

/** Carry the inline styles of a nested element onto the flat word span. */
function cloneInlineStyle(word: HTMLElement, source: HTMLElement) {
  const cs = getComputedStyle(source)
  for (const key of STYLE_KEYS) {
    const value = cs.getPropertyValue(key)
    if (value && value !== 'inherit' && value !== 'normal') {
      word.style.setProperty(key, value)
    }
  }
}

function makeWord(text: string): HTMLElement {
  const w = document.createElement('span')
  w.className = WORD_CLASS
  w.textContent = text
  return w
}

/**
 * Wrap every word in the element in `.ln-word` spans, keeping inline elements
 * (`em`, `<span class="u-serif">`, ...) intact so their styles survive, then
 * flatten the words to the root so it can be grouped into line clips.
 */
function wrapWords(root: HTMLElement): HTMLElement[] {
  const words: HTMLElement[] = []

  const walk = (container: HTMLElement) => {
    for (const child of Array.from(container.childNodes)) {
      if (child.nodeType === Node.TEXT_NODE) {
        const parts = ((child as Text).data || '').split(/(\s+)/)
        const frag = document.createDocumentFragment()
        let pendingSpace = false
        for (const part of parts) {
          if (!part) continue
          if (/^\s+$/.test(part)) {
            pendingSpace = true
            continue
          }
          const w = makeWord(part)
          if (pendingSpace && words.length) {
            words[words.length - 1].textContent += '\u00A0'
          }
          pendingSpace = false
          words.push(w)
          frag.appendChild(w)
        }
        container.replaceChild(frag, child)
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        if ((child as HTMLElement).tagName === 'BR') continue
        walk(child as HTMLElement)
      }
    }
  }

  walk(root)

  for (const w of words) {
    const styled = nearestStyled(w, root)
    if (styled) cloneInlineStyle(w, styled)
  }

  // flatten words up to the root, preserving order
  for (const w of words) root.appendChild(w)

  // drop the now-empty wrappers that used to hold the words
  for (const n of Array.from(root.querySelectorAll('span, em, strong, b, i, u'))) {
    const c = n as HTMLElement
    if (c.classList.contains(WORD_CLASS) || c.classList.contains(LINE_CLASS)) continue
    if (!c.childElementCount && !(c.textContent || '').trim()) c.remove()
  }

  return words
}

/** Undo the line grouping (keeps the word spans), ready for a new grouping. */
function ungroup(root: HTMLElement) {
  for (const line of Array.from(root.querySelectorAll('.' + LINE_CLASS))) {
    const parent = line.parentElement
    if (!parent) continue
    while (line.firstChild) parent.insertBefore(line.firstChild, line)
    line.remove()
  }
}

/**
 * Group a root's words into `.ln-line` clips, one per visual row, joined with
 * `<br>` so each line sits on its own row. Idempotent: re-running re-groups
 * after the text reflows.
 */
export function splitLines(root: HTMLElement): HTMLElement[] {
  if (!root.querySelector('.' + WORD_CLASS)) {
    wrapWords(root)
  } else {
    ungroup(root)
  }

  const words = Array.from(root.querySelectorAll('.' + WORD_CLASS)) as HTMLElement[]
  if (!words.length) return []

  const lines: HTMLElement[] = []
  let cur: HTMLElement | null = null
  let lastTop = NaN

  for (const w of words) {
    const top = Math.round(w.getBoundingClientRect().top)
    if (cur === null || top !== lastTop) {
      cur = document.createElement('span')
      cur.className = LINE_CLASS
      if (lines.length) {
        const br = document.createElement('br')
        br.className = 'ln-br'
        root.insertBefore(br, w)
      }
      root.insertBefore(cur, w)
      lines.push(cur)
      lastTop = top
    }
    cur.appendChild(w)
  }

  return lines
}