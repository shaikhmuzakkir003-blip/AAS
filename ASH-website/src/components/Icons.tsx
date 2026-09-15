export function Arrow({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 17 17" fill="none" aria-hidden="true">
      <path
        d="M4 13 13 4M6 4h7v7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
      />
    </svg>
  )
}

export function DownloadIcon({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M9 2v10m0 0 4-4m-4 4-4-4M3 15h12" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
    </svg>
  )
}

export function ShieldIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3 5 6v5c0 4.4 3 8.2 7 10 4-1.8 7-5.6 7-10V6l-7-3Zm-1.2 12.2L7.6 12l1.4-1.4 1.8 1.8 4.2-4.2 1.4 1.4-5.6 5.6Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function BoltIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
    </svg>
  )
}

export function ExternalIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M5 3h8v8M13 3 4 12M11 3H3v10"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="square"
      />
    </svg>
  )
}
