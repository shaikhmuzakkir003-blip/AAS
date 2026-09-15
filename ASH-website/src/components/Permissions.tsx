import { Reveal } from './Reveal'
import { PERMISSIONS } from '#/data/site'

/** All 16 manifest permissions, with a plain-English reason for each. */
export function Permissions() {
  return (
    <Reveal className="perms" stagger={0.03}>
      {PERMISSIONS.map((x) => (
        <div className="perm fade" key={x.p}>
          <code>{x.p}</code>
          <p>{x.why}</p>
        </div>
      ))}
    </Reveal>
  )
}
