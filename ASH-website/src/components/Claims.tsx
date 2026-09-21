import { Reveal } from './Reveal'
import { CRAFT_CLAIMS } from '#/data/site'

/** Engineering praise derived strictly from what the repository contains. */
export function Claims() {
  return (
    <Reveal className="claims" stagger={0.1}>
      {CRAFT_CLAIMS.map((c) => (
        <div className="claim fade" key={c.title}>
          <h3>{c.title}</h3>
          <p>{c.body}</p>
        </div>
      ))}
    </Reveal>
  )
}
