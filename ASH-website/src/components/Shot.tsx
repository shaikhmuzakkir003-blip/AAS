import { useState } from 'react'
import { Reel } from './Reel'

type ShotProps = {
  src: string
  video?: string
  caption: string
  col?: string
  ar?: string
  speed?: number
  className?: string
}

/** A captioned cinematic frame — plays a WAN reel when present, still otherwise. */
export function Shot({ src, video, caption, col, ar, speed = 0.1, className = '' }: ShotProps) {
  const [reel, setReel] = useState(false)

  return (
    <div
      className={`shot ${className}`}
      data-cursor="View"
      data-speed={speed ?? 0.1}
      style={{
        ['--col' as string]: col,
        ['--ar' as string]: ar,
      }}
    >
      <div className="shot__cap u-mono">
        <b>{caption}</b>
        {video ? <span>{reel ? 'Reel' : 'Still'}</span> : <span>Still</span>}
      </div>
      <figure className="reel-host">
        {video ? (
          <Reel src={video} poster={src} alt={caption} onState={setReel} />
        ) : (
          <img src={src} alt={caption} loading="lazy" />
        )}
      </figure>
    </div>
  )
}
