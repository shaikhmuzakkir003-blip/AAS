# ASH Builds — continuation handoff

> Pick-up doc for the portfolio redesign of **Asheo v1.6.1** (repo
> `shaikhmuzakkir003-blip/AAS`, folder `ASH-website/`).
> Last updated: 2026-09-14. Working branch: **`arena/01a09f03-aas`**.

---

## 1. What this site is

A high-end, anonymous-engineer portfolio for the solo maker of **Asheo**, a 2 MB
Chromium MV3 developer/QA tool that generates Luhn-valid test cards from a BIN spec
and substitutes them into payment requests (41 gateway handlers). The developer has
never done a face reveal — the mascot is **Kalos Ash (Pokémon XYZ)** and the final
hero "act" is a **featureless black mannequin** ("the work is the face").

Hard content rule (from the client): **zero fabricated data**. No download counts,
ratings, testimonials, fake stack, or placeholder social links. Every claim traces
to (a) the unpacked `ASH 1.6` extension/GitHub folder or (b) asheobypasser.net +
/docs.

## 2. Run it

```bash
cd ASH-website
npm install
npm run dev          # http://localhost:3000  (bind 0.0.0.0 if previewing remotely)
npm run build        # tsc + Vite + whop zip → dist/whop-build.zip
npx tsc --noEmit     # typecheck
```

Stack: TanStack Start (file routes in `src/routes/`) · React 19 · Vite · GSAP 3.15
+ ScrollTrigger · Lenis smooth scroll · vanilla CSS in `src/styles.css` (design
tokens at the top; sections are data-themed dark/light and `ThemeSpy` flips
`--nav-*` vars).

## 3. Routes & components (current map)

- Routes: `index.tsx` (home), `asheo.tsx` (product story), `in-prod.tsx`
  (manifest/permissions/ledger), `off-clock.tsx` (gallery + his own words),
  `contact.tsx` (real channels + Peel plate).
- `src/components/` (32): Hero (3-act reveal), GateWall (gateway chips), Terminal
  (`$ cat manifest` verification panel), Pipeline, Permissions (16 perms),
  Ledger (signed-build table), StatsBand + Counter (structural numbers only),
  Pillars, Principles, Steps, ModuleGrid, Claims, Peel, FaceSplit, Collage,
  Marquee, Statement, Words (masked headline), Reveal (+ `useInView`), Reel,
  Shot, Gallery glue in routes, Preloader, FilmFx (grain), Cursor (fine-pointer
  only), SmoothScroll, SiteHeader (auto-hide + frosted `is-solid`), SiteFooter,
  ThemeSpy, Topo, Icons, DownloadCTA.
- All copy/numbers live in `src/data/site.ts` — edit there, never inline.

## 4. The hero reveal (already built — do not rebuild with a JS video scrubber)

`Hero.tsx` + the `.hero__*` block in styles.css:
- 340vh sticky stage; three stacked plates: `anon-void.jpg` (base) →
  `hero-nocap-dark.jpg` → `hero-cap-dark.jpg` (top).
- ScrollTrigger timeline drives CSS custom props `--wipe` (0→100%) with
  `mask-image: linear-gradient(...)`; first wipe reveals cap-off at progress
  0.28→0.48, second reveals the mannequin at 0.60→0.82. Shared slow camera push.
- Pointer move sets `--mx/--my` and an animated `--hole` radial mask ("peel").
- Scan sweep, act captions (cap A/B/C), wordmark/card/hint exits all timed to
  the same timeline.
- If `/video/hero-unwrap.mp4` **exists and fires `loadeddata`**, the stage gets
  `.has-reel`: still plates are hidden and the video is scrubbed by scroll
  (`video.currentTime = progress * duration`). Missing file = current still
  experience, no errors.
- Preloader dispatches `ash:preloaded`; Hero starts its intro on that or after a
  3.2 s timeout.

## 5. ⏭️ NEXT TASK — WAN video integration (the only large outstanding item)

The client renders clips; we integrate. Full prompts/specs: **`WAN-PROMPTS.md`**.

Slots (all already coded with graceful poster fallback):

| Target file                | Where it's consumed                          | Poster / fallback      |
|----------------------------|----------------------------------------------|------------------------|
| `public/video/hero-unwrap.mp4` | `Hero.tsx` (scroll-scrub, 3 acts)        | cap/nocap/anon plates  |
| `public/video/night-coding.mp4`| `FaceSplit.tsx` + off-clock Shot #1     | `img/ash-night.jpg`    |
| `public/video/lumiose-walk.mp4`| `FaceSplit.tsx` + off-clock Shot #2     | `img/ash-walk.jpg`     |
| `public/video/rooftop.mp4`     | off-clock phero bg + Shot #3            | `img/ash-stage.jpg`    |

Client drops raw WAN downloads in **`public/video/_src/`** (git-ignored).
Integration steps when they arrive:
1. `ffmpeg -i _src/<raw> -vf "scale='min(1080,iw)':-2" -c:v libx264 -crf 20
   -preset slow -pix_fmt yuv420p -movflags +faststart -an <target>` for the loops.
2. Loops must be seamless-ish: either render matched first/last frames, or use
   `-filter_complex "[0]split[a][b];[a]trim=...[..];xfade=transition=fade"` for a
   short crossfade seam (6–10 s final each).
3. Hero: if a single 10 s clip, verify act boundaries at 28/48/60/82 %; adjust
   the two constants in the Hero timeline if the render differs. If the client
   renders 3 separate act clips (`_src/hero-1..3.mp4`), stitch with xfade
   scan-wipes at those percentages, output exactly 10 s, 1080×1920.
4. Re-extract poster stills from frame 0 (`ffmpeg -ss 0 -i … -frames:v 1`) only
   if client wants posters updated; otherwise keep existing JPGs.
5. Size budget: keep each final clip ≤ ~2.5 MB (hero ≤ ~4 MB); add `preload`
   hints only for hero.
6. Verify: desktop + 390px mobile, scroll-scrub smoothness, reduced-motion
   (`html.reduce-motion` should keep the still plate), and that badge text flips
   STILL→REEL only after `loadeddata`.

## 6. Facts ledger (the only claims allowed)

41 gateway handlers (UI shows 18 chips + "+23"; docs say 40 selectable +
detection-only entries) · 85 files pinned SHA-256 in `build-hashes.json` with
`build-hashes.sig`, verified at startup, fail-closed · 2.0 MB MV3 package ·
16 permissions incl. `<all_urls>`, captcha hosts hard-excluded · 6 content-script
injection stages (document_start, MAIN world) / 8 PIPELINE nodes · 0 third-party
trackers · generation 100% in-browser, `chrome.storage.local` · network = licence
+ update checks only · minimum Chrome 116; works Edge/Brave/Arc/Opera · not on
Web Store — load unpacked zip (download.asheobypasser.net, SHA-256 shown) · free
core, premium key via t.me/AsheoPremiumBot · support t.me/moreash · docs
asheobypasser.net/docs · manifest author string "Asheo Team", v1.6.1, MV3 ·
omnibox keyword `asheo` · real stack is vanilla JS modules (NO React/Rust/WASM/
Swift — never claim those).
The official site's own downloads counter renders blank — never cite a number
(not even its "40k early adopters" marketing line).
Off-clock quote cards use only the maker's published lines (list in
`off-clock.tsx` OWN_LINES).

## 7. QA harness (headless, no GPU in sandbox)

Playwright + bundled chromium in `/home/user/pw-shots/` (outside the repo):
- Run pattern: `cd /home/user/pw-shots && CHROME_EXE=$PWD/chrome/chromium
  LD_LIBRARY_PATH=$PWD/chrome/lib FONTCONFIG_FILE=/tmp/fonts.conf node <script>.mjs`
- `shot.mjs` — full 5-route scroll capture, desktop + 390px mobile, outputs
  `shots/d-*.png` / `shots/m-*.png`. Uses reducedMotion + `animations:'disabled'`
  and aborts Google Fonts (unreachable in sandbox; real browser is fine).
- `acts2.mjs` — forces Hero `--wipe` vars directly to QA the 3-act mask system
  (this is the reliable one; `acts.mjs` real-scroll mid-mask hangs under
  SwiftShader — harness limit, not a site bug).
- `hdr.mjs` / `hdr2.mjs` — header auto-hide + frosted solid checks.
Known screenshot-only artifacts: transitions freeze mid-fade so some frames show
dimmed counters/text — check live or at rest, it's not a bug.

## 8. Done in the rebuild (as of commit 5ba1dae)

- All fake data deleted; content rebuilt from §6. Real channels/links wired.
- Hero 3-act mask reveal, lens peel, scroll-scrub video takeover path.
- Honest media: `Reel.tsx` only marks loaded (`onState`, loadeddata/error,
  IntersectionObserver play/pause); `Shot.tsx` badge says Reel vs Still;
  `Collage.tsx` + off-clock gallery built on Shot with `data-speed` parallax.
- Header: hides on scroll-down past hero, returns on scroll-up, `.is-solid`
  frosted gradient using `--nav-bg`; mobile hero furniture stack fixed;
  contact channel heading contrast fixed.
- `favicon.svg` + generated `apple-touch-icon.png`; og-card already existed and
  is wired in `src/lib/meta.ts`.
- tsc clean, `npm run build` green (~59 files packed). Branched/committed on
  `arena/01a09f03-aas`, pushed to origin; PR → main when client approves.

## 9. Open follow-ups (in priority order)

1. Get WAN renders from client → integrate per §5 (hero clip is the centerpiece).
2. Replace the remaining off-model *green-jacket Pixar boy* stills if any linger
   (current hero plates are on-model Kalos Ash; prompts for regenerating
   night/walk/stage posters are in WAN-PROMPTS.md §4).
3. Final live-browser pass once fonts + video load (sandbox can't load Google
   Fonts): check type rhythm and the hero video scrub on a real GPU.
4. Confirm deploy target URL in `src/lib/meta.ts` `SITE_CARD` (currently the
   whop apps URL) before launch so OG image resolves.
5. Optional: `<source>` WebM/AV1 variants after clips land; lazy-poster LCP check.

## 10. Guardrails for future sessions

- Never add stats without a source in §6. No testimonials, no "users love it".
- Character is Kalos Ash only; mannequin stays faceless by client instruction.
- Don't replace the CSS-mask acts with a dependency; don't autoplay sound
  (all clips muted + `playsInline`).
- Keep `public/video/_src/` and build dirs out of git (already ignored).
- All work commits to `arena/01a09f03-aas`; push only that branch.
