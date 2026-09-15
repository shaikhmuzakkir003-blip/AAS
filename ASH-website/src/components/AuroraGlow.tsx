/**
 * Atmospheric ambient aurora lighting with smooth organic drift.
 * Gives rich depth and luminous glow behind dark surfaces.
 */
export function AuroraGlow() {
  return (
    <div className="aurora-container" aria-hidden="true">
      <div className="aurora-orb aurora-orb--1" />
      <div className="aurora-orb aurora-orb--2" />
      <div className="aurora-orb aurora-orb--3" />
    </div>
  )
}
