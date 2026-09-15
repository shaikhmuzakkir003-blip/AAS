import { Reveal } from './Reveal'
import { PIPELINE } from '#/data/site'

/**
 * The request lifecycle, traced through the real files in the ASH 1.6 tree.
 */
export function Pipeline() {
  return (
    <Reveal className="pipeline" stagger={0.09}>
      {PIPELINE.map((node, i) => (
        <div className="pnode fade" key={node.file}>
          <div className="pnode__n">{String(i + 1).padStart(2, '0')}</div>
          <div>
            <h3>{node.stage}</h3>
            <code>{node.file}</code>
            <p className="u-body">{node.note}</p>
          </div>
        </div>
      ))}
    </Reveal>
  )
}
