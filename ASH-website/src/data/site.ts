export const SITE = {
  name: 'Ash',
  tagline: 'Developer. Builder of Asheo.',
  role: '2026 · Full-stack engineer',
  description:
    'Ash is the developer behind Asheo, the browser extension that quietly became a daily habit for thousands of people. No face reveal, no noise, just shipped work.',
  card: '/img/ash-model.png',
}

export const NAV = [
  { label: 'Home', to: '/', index: '01', img: '/img/ash-model.png' },
  { label: 'Asheo', to: '/asheo', index: '02', img: '/img/ash-model.png' },
  { label: 'In Prod', to: '/in-prod', index: '03', img: '/img/ash-model.png' },
  { label: 'Off Clock', to: '/off-clock', index: '04', img: '/img/ash-model.png' },
  { label: 'Contact', to: '/contact', index: '05', img: '/img/ash-model.png' },
] as const

export const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com' },
  { label: 'X', href: 'https://x.com' },
  { label: 'YouTube', href: 'https://youtube.com' },
  { label: 'Discord', href: 'https://discord.com' },
] as const

export const STATS = [
  { value: '1.2M', label: 'Asheo installs' },
  { value: '4.9★', label: 'Store rating, 18k reviews' },
  { value: '312', label: 'Releases shipped' },
  { value: '99.99%', label: 'Uptime across services' },
]

export const SHOTS = [
  {
    src: '/img/ash-model.png',
    caption: 'Asheo v1, 3AM',
    col: '1 / span 5',
    ar: '3 / 4',
    speed: 0.14,
  },
  {
    src: '/img/ash-model.png',
    caption: 'The bench, 2024',
    col: '8 / span 5',
    ar: '4 / 3',
    speed: -0.1,
  },
  {
    src: '/img/ash-model.png',
    caption: 'Between meetings, 2025',
    col: '2 / span 4',
    ar: '3 / 4',
    speed: 0.2,
  },
  {
    src: '/img/ash-model.png',
    caption: 'Talk on shipping small, 2026',
    col: '7 / span 6',
    ar: '4 / 3',
    speed: -0.16,
  },
]

export const BUILDS = [
  { name: 'Asheo', year: '2026', note: 'Browser extension', tile: 'a' },
  { name: 'Asheo Sync', year: '2026', note: 'Cross device state', tile: 'b' },
  { name: 'Quietlog', year: '2025', note: 'Logging that shuts up', tile: 'c' },
  { name: 'Tabmesh', year: '2025', note: 'Tab graph engine', tile: 'd' },
  { name: 'Pocketcache', year: '2025', note: 'Edge cache layer', tile: 'b' },
  { name: 'Nightshift', year: '2024', note: 'Cron with a memory', tile: 'a' },
  { name: 'Draftbox', year: '2024', note: 'Local first notes', tile: 'd' },
  { name: 'Kerncheck', year: '2024', note: 'Static analysis CLI', tile: 'c' },
  { name: 'Lanterns', year: '2023', note: 'Realtime presence', tile: 'b' },
  { name: 'Hotpath', year: '2023', note: 'Profiler overlay', tile: 'a' },
  { name: 'Shiplog', year: '2022', note: 'Release notes, auto', tile: 'c' },
  { name: 'First commit', year: '2019', note: 'Where it started', tile: 'd' },
]

export const PRAISE = [
  {
    quote:
      'Asheo is the only extension I have never once thought about uninstalling. It just does the thing, every time.',
    by: 'Daily user, 4.9★ review',
  },
  {
    quote:
      'Ash shipped a fix for my bug report in under four hours. On a Sunday. I have worked with teams of thirty that move slower.',
    by: 'Staff engineer, fintech',
  },
  {
    quote:
      'He writes code the way good editors write sentences. Nothing spare, nothing showy, and it never breaks.',
    by: 'Open source maintainer',
  },
  {
    quote:
      'A one person team that reads like a product org. Docs, changelog, support, release cadence, all of it immaculate.',
    by: 'Developer advocate',
  },
]

export const STACK = [
  'TypeScript',
  'Rust',
  'React',
  'Chrome APIs',
  'WebAssembly',
  'Postgres',
  'Cloudflare Workers',
  'Go',
  'SQLite',
  'Vite',
  'Node',
  'Swift',
]

export const ASHEO_FEATURES = [
  {
    n: '01',
    title: 'Instant by default',
    body: 'Every action lands in under sixteen milliseconds. Ash budgets the frame first and writes the feature into whatever is left.',
  },
  {
    n: '02',
    title: 'Nothing leaves your machine',
    body: 'Local first storage, no analytics wall, no account required to get value on the first click.',
  },
  {
    n: '03',
    title: 'Keyboard the whole way',
    body: 'A command palette that learns your order of operations and stops guessing once it knows.',
  },
  {
    n: '04',
    title: 'Updated relentlessly',
    body: 'Three hundred and twelve releases and counting, each one with a changelog a human actually wrote.',
  },
]
