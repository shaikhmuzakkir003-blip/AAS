import { useRef } from 'react'
import { useReveal } from '#/lib/inview'
import { BUILDS } from '#/data/site'

const TILES: Record<string, string> = {
  a: '/img/tile-a.png',
  b: '/img/tile-b.png',
  c: '/img/tile-c.png',
  d: '/img/tile-d.png',
}

/** Every build Ash has put his name on, swapping from grey to colour on hover. */
export function HallOfFame() {
  const grid = useRef<HTMLDivElement>(null)
  useReveal(grid, { stagger: 0.045 })

  return (
    <div className="hof" ref={grid}>
      {BUILDS.map((b) => (
        <div className="hof__tile reveal" key={b.name} data-cursor={b.year}>
          <img className="base" src={TILES[b.tile]} alt="" loading="lazy" />
          <img className="hover" src={TILES[b.tile]} alt={b.name} loading="lazy" />
          <div className="hof__meta">
            <b>
              {b.name}
              <br />
              <i>{b.note}</i>
            </b>
            <i>{b.year}</i>
          </div>
        </div>
      ))}
    </div>
  )
}
