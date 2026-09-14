import { Reveal } from './Reveal'
import { PRINCIPLES } from '#/data/site'

/**
 * Verbatim lines from the official docs and Asheo's own published copy —
 * the build speaking for itself, rather than invented testimonials.
 */
export function Principles() {
  return (
    <Reveal className="cards" stagger={0.08}>
      {PRINCIPLES.map((p) => (
        <blockquote className="cardq fade" key={p.by}>
          <span className="cardq__mk" aria-hidden="true">
            “
          </span>
          <p>{p.quote}</p>
          <footer>{p.by}</footer>
        </blockquote>
      ))}
    </Reveal>
  )
}
