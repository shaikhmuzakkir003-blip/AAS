import { Reveal } from './Reveal'
import { MODULE_GROUPS } from '#/data/site'

/** The real module index — every card names a file that ships in ASH 1.6. */
export function ModuleGrid() {
  return (
    <div className="modules">
      {MODULE_GROUPS.map((g) => (
        <div className="modgroup" key={g.group}>
          <Reveal as="h3" stagger={0}>
            <span className="fade">{g.group}</span>
            <i />
            <span className="fade">{g.items.length.toString().padStart(2, '0')} files</span>
          </Reveal>
          <Reveal className="modgrid" stagger={0.04}>
            {g.items.map(([file, note]) => (
              <div className="modcard fade" key={file}>
                <code>{file}</code>
                <p>{note}</p>
              </div>
            ))}
          </Reveal>
        </div>
      ))}
    </div>
  )
}
