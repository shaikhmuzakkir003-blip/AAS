/* ------------------------------------------------------------------ *
 *  Every fact in this file is real and traceable to:
 *   - ASH 1.6/manifest.json (MV3 manifest, v1.6.1)
 *   - ASH 1.6/build-hashes.json (85 signed files, signed manifest)
 *   - https://asheobypasser.net + /docs (official site & docs)
 *  Do not add download counts, ratings, dates or quotes that are not
 *  sourced from one of the above.
 * ------------------------------------------------------------------ */

export const SITE = {
  name: 'Ash',
  tagline: 'Independent engineer · Architect of Asheo',
  role: 'Edition 01 · Chromium MV3',
  description:
    'Ash is the independent engineer behind Asheo — a 2 MB Chromium MV3 extension for testing payment gateways. 41 gateway handlers, 85 integrity-signed files, zero trackers. No face reveal. The work is the face.',
  card: '/og-card.png',
}

export const LINKS = {
  site: 'https://asheobypasser.net/',
  download: 'https://asheobypasser.net/#download',
  downloadDirect: 'https://download.asheobypasser.net/',
  docs: 'https://asheobypasser.net/docs',
  tutorials: 'https://asheobypasser.net/tutorials',
  premium: 'https://asheobypasser.net/premium',
  privacy: 'https://asheobypasser.net/privacy',
  github: 'https://github.com/shaikhmuzakkir003-blip/AAS',
  githubTree:
    'https://github.com/shaikhmuzakkir003-blip/AAS/tree/main/ASH%201.6',
  telegram: 'https://t.me/moreash',
  premiumBot: 'https://t.me/AsheoPremiumBot',
} as const

export const NAV = [
  { label: 'Home', to: '/', index: '01', img: '/img/ash-visor-side.png' },
  { label: 'Asheo', to: '/asheo', index: '02', img: '/img/ui-popup.png' },
  { label: 'In Prod', to: '/in-prod', index: '03', img: '/img/ash-dark-build.jpg' },
  { label: 'Off Clock', to: '/off-clock', index: '04', img: '/img/ash-neon-night.jpg' },
  { label: 'Contact', to: '/contact', index: '05', img: '/img/ash-visor-side.png' },
] as const

export const SOCIALS = [
  { label: 'GitHub', href: LINKS.github, external: true },
  { label: 'Telegram', href: LINKS.telegram, external: true },
  { label: 'Official site', href: LINKS.site, external: true },
  { label: 'Docs', href: LINKS.docs, external: true },
] as const

/* ----------------------------------------------------------- the build */

export const BUILD = {
  product: 'Asheo',
  version: 'v1.6.1',
  edition: 'Edition 01',
  serial: 'ASH-01-37E3-143',
  size: '2.0 MB',
  manifest: 'Chromium MV3',
  chromeMin: 'Chrome 116+',
  engines: ['Chrome', 'Edge', 'Brave', 'Arc', 'Opera'],
  distribution: 'Direct .zip · load unpacked · not on the Chrome Web Store',
  price: 'Free core · Premium key optional',
  network: 'Licence + update checks only',
  storage: 'chrome.storage.local — the device that made it',
  trackers: 'None. No analytics SDK, no third-party pixels',
  account: 'None for the free core',
  csp: "script-src 'self'; object-src 'self'; base-uri 'self'",
} as const

/** Counters that animate on scroll — all structural, all verifiable. */
export const STATS = [
  { value: 41, suffix: '', label: 'Gateway handlers in the build' },
  { value: 85, suffix: '', label: 'Files, each SHA-256 signed' },
  { value: 2, suffix: '.0 MB', label: 'Total package size' },
  { value: 16, suffix: '', label: 'Permissions, each auditable' },
  { value: 6, suffix: '', label: 'Content-script injection stages' },
  { value: 0, suffix: '', label: 'Third-party trackers' },
] as const

/** The Ledger — spec sheet rows straight from the docs/manifest. */
export const LEDGER = [
  { k: 'Version', v: '1.6.1 — Edition 01' },
  { k: 'Manifest', v: 'Chromium Manifest V3' },
  { k: 'Package size', v: '2.0 MB' },
  { k: 'Minimum browser', v: 'Chrome 116+ · Edge · Brave · Arc · Opera' },
  { k: 'Gateway handlers', v: '41 (40 selectable + detection-only entries)' },
  { k: 'Network calls', v: 'Licence & update checks against its own server only' },
  { k: 'Trackers / analytics', v: 'No third-party trackers whatsoever' },
  { k: 'Account required', v: 'No — Premium needs a key' },
  { k: 'Storage', v: 'Local device, chrome.storage.local' },
  { k: 'Content Security Policy', v: "script-src 'self' · object-src 'self' · base-uri 'self'" },
  { k: 'Integrity', v: 'Signed file manifest (build-hashes.json + .sig)' },
  { k: 'Distribution', v: 'Verified .zip, loaded unpacked — not on a store' },
  { k: 'Price', v: 'Free core · Premium optional' },
] as const

/* ---------------------------------------------------------- four pillars */

export const PILLARS = [
  {
    n: '01',
    kicker: 'Performance',
    title: 'Two megabytes of intent',
    body: 'Nothing idles, nothing polls a server, nothing waits on the network. Card generation runs entirely in the browser — the whole engine ships inside 2 MB.',
    meta: ['< 2 MB', 'MV3', 'Local execution'],
  },
  {
    n: '02',
    kicker: 'Privacy',
    title: 'Local by architecture',
    body: 'Generated cards, BINs, gateway URLs and intercepted request bodies never leave the machine. Asheo talks to its own licence and update server — and nothing else.',
    meta: ['Zero telemetry', 'No account wall', 'No analytics'],
  },
  {
    n: '03',
    kicker: 'Compatibility',
    title: 'One install, five engines',
    body: 'Chrome, Edge, Brave, Arc and Opera. The same MV3 build runs on every current Chromium engine — no separate packages to keep straight.',
    meta: ['Chrome 116+', 'Edge', 'Brave · Arc · Opera'],
  },
  {
    n: '04',
    kicker: 'Craft',
    title: 'Signed, sealed, strict',
    body: '85 files each carry a SHA-256 in a signed manifest. A strict CSP refuses remote code. Even the captcha hosts are hard-excluded from injection.',
    meta: ['SHA-256 manifest', 'Strict CSP', 'Ed25519-style key check'],
  },
] as const

/* ------------------------------------------------------------- the method */

export const METHOD = [
  {
    n: '01',
    title: 'Download the zip',
    body: 'From download.asheobypasser.net — no sign-up, no email wall, no credit card. Verify the published SHA-256 while you are there.',
  },
  {
    n: '02',
    title: 'Load it unpacked',
    body: 'Unzip somewhere permanent, open chrome://extensions, enable Developer mode and hit Load unpacked. Asheo pins to the toolbar.',
  },
  {
    n: '03',
    title: 'Set a BIN and go',
    body: 'Type a BIN pattern, open any checkout the detector recognises, and watch the swap fire. That is the entire onboarding.',
  },
] as const

/* ------------------------------------------------------------ the gateway */

/** The 18 gateways named in the official docs (41 handlers total ship). */
export const GATEWAYS = [
  'Stripe',
  'Adyen',
  'Braintree',
  'Worldpay',
  'Razorpay',
  'Tebex',
  'Spreedly',
  'Xendit',
  'Cashfree',
  'Authorize.Net',
  'SafeCharge',
  'Gr4vy',
  'NMI',
  'Paddle',
  'VGS',
  'Basis Theory',
  'Pipo',
  'Zuora',
] as const

/* ----------------------------------------------- the machine (real files) */

export const PIPELINE = [
  {
    stage: 'Detect',
    file: 'content/gateway_detector.js',
    note: 'Recognises the checkout and lights the live badge — partly from real network signals, not URL guesses.',
  },
  {
    stage: 'Resolve',
    file: 'algo/v2-source-resolver.js',
    note: 'Finds where the page sources its payment fields and tokens.',
  },
  {
    stage: 'Register',
    file: 'modules/router/v3/gateway-registry.js',
    note: 'Looks the gateway up in the v3 handler registry and picks its route.',
  },
  {
    stage: 'Generate',
    file: 'algo/v2-candidate-generator.js',
    note: 'Builds candidate numbers from the BIN spec — Luhn-valid, correct network length.',
  },
  {
    stage: 'Validate',
    file: 'algo/v2-validator.js · engine/validator.js',
    note: 'If a gateway rejects a card, it rejected it on its own terms — the number was never malformed.',
  },
  {
    stage: 'Transform',
    file: 'engine/transformer.js · adyenEncryptor.js',
    note: 'Rewrites the outbound request body, gateway-specific encryption included.',
  },
  {
    stage: 'Intercept',
    file: 'modules/router/v3/interceptors.js',
    note: 'DNR + webRequest interceptors swap the payload in flight.',
  },
  {
    stage: 'Observe',
    file: 'modules/router/v3/response-hooks.js',
    note: 'Reads the response so the HUD can report what actually happened.',
  },
] as const

export const MODULE_GROUPS = [
  {
    group: 'Router v3',
    items: [
      ['bootstrap.js', 'Cold-starts the v3 pipeline'],
      ['gateway-registry.js', 'Every gateway handler, one registry'],
      ['request-pipeline.js', 'Ordered in-flight request stages'],
      ['interceptors.js', 'Outbound request interception'],
      ['response-hooks.js', 'Post-swap response handling'],
      ['redaction-logger.js', 'Logs the flow, never the card data'],
      ['runtime-state.js', 'In-memory per-tab state'],
    ],
  },
  {
    group: 'Card engine (algo/)',
    items: [
      ['v2-orchestrator.js', 'Runs the whole generation sequence'],
      ['v2-candidate-generator.js', 'BIN-driven candidate numbers'],
      ['v2-validator.js', 'Luhn & network-length validation'],
      ['v2-normalizer.js', 'Normalises messy BIN input'],
      ['v2-source-resolver.js', 'Resolves page payment sources'],
      ['v2-network.js', 'Network-aware detection signals'],
      ['adyenEncryptor.js', 'Handles the Adyen encryption path'],
    ],
  },
  {
    group: 'Matching engine (engine/)',
    items: [
      ['gatewayEngine.js', 'Gateway routing core'],
      ['matcher.js', 'Pattern/field matching'],
      ['transformer.js', 'Request-body transformation'],
      ['validator.js', 'Pre-swap validation'],
    ],
  },
  {
    group: 'In the page (content/)',
    items: [
      ['gateway_detector.js', 'The live gateway badge'],
      ['gateway_probe.js', 'Probes real network signals'],
      ['injection_hud.js', 'On-page heads-up display'],
      ['card_filler.js', 'Fills card fields'],
      ['identity_filler.js', 'Fills identity fields'],
      ['stripe_filler.js', 'Stripe-specific filling'],
      ['autoclicker.js', 'Advances hosted flows'],
    ],
  },
  {
    group: 'Background (functions/)',
    items: [
      ['background.js', 'Module service worker'],
      ['offscreen.js', 'Offscreen document worker'],
      ['entitlement.js', 'Verifies Premium keys locally'],
      ['update-check.js', 'Current-release authorisation'],
      ['build-attest.js', 'Startup manifest attestation'],
      ['pack-crypto.js', 'Cryptographic helpers'],
      ['proxy-bypass.js', 'Gateway host bypass rules'],
    ],
  },
] as const

export const PERMISSIONS = [
  { p: 'storage', why: 'Keeps your BINs and settings in chrome.storage.local.' },
  { p: 'unlimitedStorage', why: 'Room for custom gateway rule sets on-device.' },
  { p: 'scripting', why: 'Injects the engine into checkout pages on demand.' },
  { p: 'activeTab · tabs', why: 'Acts on the tab you explicitly use it on.' },
  { p: 'webNavigation', why: 'Times injection against the page lifecycle.' },
  { p: 'webRequest', why: 'Observes outbound payment requests.' },
  { p: 'webRequestAuthProvider', why: 'Handles auth challenges inside test flows.' },
  { p: 'declarativeNetRequest', why: 'Performs the request swap the MV3 way.' },
  { p: 'declarativeNetRequestWithHostAccess', why: 'Scopes those rules to checkout hosts.' },
  { p: 'proxy', why: 'Applies bypass rules for gateway hosts.' },
  { p: 'privacy', why: 'Adjusts network settings for test traffic.' },
  { p: 'alarms', why: 'Schedules licence and update checks.' },
  { p: 'notifications', why: 'Tells you when a swap fired.' },
  { p: 'offscreen', why: 'Runs the offscreen document worker.' },
  { p: 'browsingData', why: 'Clears its own local test traces on request.' },
  { p: '<all_urls>', why: 'Checkouts live on any domain — captcha hosts are hard-excluded.' },
] as const

/* --------------------------------------------------------- editorial shots */

export const SHOTS = [
  {
    src: '/img/ash-dark-build.jpg',
    video: '/video/night-coding.mp4',
    caption: 'Built in the dark',
    col: '1 / span 6',
    ar: '3 / 4',
    speed: 0.12,
  },
  {
    src: '/img/ash-neon-night.jpg',
    video: '/video/lumiose-walk.mp4',
    caption: 'Lumiose-bound, early',
    col: '8 / span 5',
    ar: '4 / 5',
    speed: -0.08,
  },
  {
    src: '/img/ash-dawn-rooftop.jpg',
    video: '/video/rooftop.mp4',
    caption: 'Above the skyline, blue hour',
    col: '2 / span 5',
    ar: '3 / 4',
    speed: 0.16,
  },
  {
    src: '/img/ash-bench.jpg',
    caption: 'The bench — lime on black',
    col: '7 / span 6',
    ar: '4 / 3',
    speed: -0.12,
  },
] as const

/* ------------------------------------------------------- words from the work */

/**
 * Real lines — every one is sourced from the official docs, the manifest,
 * or Ash's own published quote on asheobypasser.net. No invented reviewers.
 */
export const PRINCIPLES = [
  {
    quote:
      'Generated numbers always satisfy the Luhn check and the card-network length rules.',
    by: 'Docs — BIN spec format',
  },
  {
    quote:
      'Asheo talks to its own licence and update server, and nothing else.',
    by: 'Docs — Privacy',
  },
  {
    quote:
      'A card that a gateway rejects was rejected on its own terms — not because the number was malformed.',
    by: 'Docs — BIN spec format',
  },
  {
    quote:
      'Only the current release is authorised. Asheo verifies its own signed file manifest at startup.',
    by: 'Docs — Troubleshooting',
  },
  {
    quote: 'Not just an extension. It’s your edge — so I built it like one.',
    by: 'ASH — Architect of Asheo',
  },
] as const

/** Engineering praise derived strictly from what the repository contains. */
export const CRAFT_CLAIMS = [
  {
    title: 'A pipeline, not a script',
    body: 'Registry, pipeline, interceptors, response hooks and a redaction logger — the module layout of a platform team, shipped by one person.',
  },
  {
    title: 'Integrity by default',
    body: '85 files, each with a SHA-256 pinned in a signed manifest. A tampered or superseded build simply refuses to run.',
  },
  {
    title: 'Paranoid where it counts',
    body: "script-src 'self', no remote code, and Cloudflare / hCaptcha / reCAPTCHA hosts hard-excluded from every injection.",
  },
  {
    title: 'The whole gateways table',
    body: 'Stripe, Adyen, Braintree, Worldpay, Razorpay and 36 more handlers — each with its own matcher, transform and validation path.',
  },
] as const

export const STACK = [
  'Manifest V3',
  'chrome.* APIs',
  'declarativeNetRequest',
  'webRequest',
  'Service workers',
  'Offscreen documents',
  'Luhn / BIN engine',
  'SHA-256 manifests',
  'Local storage',
  'Strict CSP',
  'Anime.js HUD',
  'JetBrains Mono',
  'Omnibox: asheo',
  'Zero telemetry',
] as const

export const TERMINAL_LINES: Array<{ text: string; cls?: string }> = [
  { text: '$ cat manifest.json | head -n 12', cls: 'k' },
  { text: '"manifest_version": 3,' },
  { text: '"name": "Asheo",   "version": "1.6.1",' },
  { text: '"minimum_chrome_version": "116"' },
  { text: '' },
  { text: '$ sha256sum -c build-hashes.json', cls: 'k' },
  { text: '85 files verified … 85 files OK' },
  { text: 'signature: build-hashes.sig ✓' },
  { text: '' },
  { text: '$ grep -r "analytics" .   # → 0 matches', cls: 'k' },
  { text: '' },
  { text: '# no face reveal. the work is the face.', cls: 'c' },
]
