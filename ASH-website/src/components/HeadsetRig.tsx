import { HeroGL } from './HeroGL'

type Props = {
  /** the bare face portrait (also the no-WebGL fallback) */
  base: string
}

/**
 * The hero figure. All motion lives in WebGL (HeroGL): depth-parallax head,
 * depth-wire hologram, blueprint trace, solid headset. The bare portrait sits
 * underneath and simply steps aside once the GL scene is live (.has3d).
 */
export function HeadsetRig({ base }: Props) {
  return (
    <div className="rig">
      <HeroGL />
      <img className="rig__base" src={base} alt="Ash, looking at the camera" fetchPriority="high" />
    </div>
  )
}
