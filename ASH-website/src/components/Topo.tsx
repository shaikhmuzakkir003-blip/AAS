/** The drifting contour lines that sit behind the dark sections. */
export function Topo({ className = '' }: { className?: string }) {
  return (
    <div className={`topo ${className}`} aria-hidden="true">
      <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <path d="M-100 120C180 40 300 260 520 240S840 60 1020 120s300 40 520-20" />
        <path d="M-100 240C160 150 340 380 560 350s300-200 500-150 320 80 480 10" />
        <path d="M-100 380C120 300 380 500 600 470s280-190 470-140 340 100 470 40" />
        <path d="M-100 520C140 440 360 640 590 610s300-180 480-130 360 120 570 50" />
        <path d="M-100 660C180 580 340 780 570 750s320-170 500-120 340 110 570 40" />
        <path d="M-100 800C200 720 360 920 600 890s280-160 460-110 360 100 580 30" />
        <path d="M120 -40C60 180 240 300 200 520s-140 260-80 460" />
        <path d="M760 -40c-60 240 120 320 80 540s-120 260-60 460" />
        <path d="M1300 -40c-80 220 100 340 60 560s-140 240-70 440" />
      </svg>
    </div>
  )
}
