import { Reveal } from './Reveal'
import { LEDGER } from '#/data/site'

/** The Ledger — every claim printed like a spec sheet, because it is one. */
export function Ledger() {
  return (
    <Reveal className="ledger" stagger={0.04}>
      {LEDGER.map((row) => (
        <div className="ledger__row fade" key={row.k}>
          <b className="u-mono">{row.k}</b>
          <span>{row.v}</span>
        </div>
      ))}
    </Reveal>
  )
}
