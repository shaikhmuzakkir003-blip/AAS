import { useState } from 'react'
import { Reel } from './Reel'
import { asset } from '#/lib/asset'

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
  const resolvedSrc = asset(src)
  const resolvedVideo = video ? asset(video) : undefined

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
        {resolvedVideo ? <span>{reel ? 'Reel' : 'Still'}</span> : <span>Still</span>}
      </div>
      <figure className="reel-host">
        {resolvedVideo ? (
          <Reel src={resolvedVideo} poster={resolvedSrc} alt={caption} onState={setReel} />
        ) : (
          <img src={resolvedSrc} alt={caption} loading="lazy" />
        )}
      </figure>
    </div>
  )
}
