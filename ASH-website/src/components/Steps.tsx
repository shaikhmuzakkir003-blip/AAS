import { Reveal } from './Reveal'
import { METHOD } from '#/data/site'

/** The Method — twenty seconds of onboarding. */
export function Steps() {
  return (
    <Reveal className="steps" stagger={0.12}>
      {METHOD.map((s) => (
        <div className="step fade" key={s.n}>
          <div className="step__n">{s.n}</div>
          <h3>{s.title}</h3>
          <p className="u-body">{s.body}</p>
        </div>
      ))}
    </Reveal>
  )
}
