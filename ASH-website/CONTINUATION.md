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

---

## 11 · Redesign pass (arena/01a09fdc-aas, 2026-09-16) — supersedes §4 hero + §10 mannequin rule

Client direction changed: **the black mannequin is gone.** The hero is now the
landonorris.com "helmet lift": main model = **Ash**, "helmet" = an **Apple-Vision-style
VR headset**. Scrolling **lifts the headset** to reveal Ash's face (2 acts + pointer
lens peel). No mannequin anywhere (hero, Peel on /asheo + /contact, preloads, NAV).

- `Hero.tsx`: 2 plates — base `/img/ash-face.png`, top `/img/ash-visor-side.png`
  (wiped 0→100% at 30–54% scroll). Mannequin/`anon`/video-reel paths removed.
- New component `HeadsetHall.tsx`: pinned **horizontal scroll-scrub** "Headsets ·
  Hall of Fame" (3 colorways + ghost card), hover crossfade + lime/grey mask
  extender — mirrors the LN helmet scroller. Wired into `index.tsx` after the marquee.
- New on-model plates in `public/img/`: `ash-visor-side`, `ash-visor-front`,
  `ash-visor-object`, `ash-visor-bone`, `ash-visor-blob`, `ash-face`, `ash-desk2`.
- Peel under-plates now reveal `ash-face` (skin = visor) instead of the mannequin.
- CSS: `.hero__layer--visor/--face` object-positions + visor added to the `--wipe`
  mask; new `.helm*` block appended.
- Checks: `npm run typecheck` clean, `npm run build` green (66 files packed),
  served page has 0 mannequin markers.

Note: `node_modules/` is not snapshot-persisted between sessions — run
`npm install` first. The WAN video slots (§5) are still open for the ambient reels,
but the hero no longer needs a video (stills carry it).

### 11.1 · "Crazy" hero v2 (supersedes 11 hero): VR-as-helmet, blueprint + fluid mouse
Client ref: landonorris.com hero remake (WebGL portrait / fluid mask) — but the
"helmet" is a **VR headset whose visor shows he is coding**. New hero plate
`public/img/ash-dev-side.png` (lime code alive in the visor + floating holo panels).
Hero (`Hero.tsx`) now has NO copy except a giant `ASH` + two tiny HUD tags
(`VR / DEV / SHIPS`, `SCROLL TO MATERIALISE`):
- `Blueprint.tsx`: lime schematic draws itself around the head (dashoffset
  draw-on), rotating reticle, dimension ticks; blows out on scroll.
- `ParticleField.tsx`: canvas lime dust that swirls around the cursor.
- Fluid 3D lean into the pointer + RGB-split on the wordmark from pointer velocity.
- Scroll "materialises": blueprint expands/fades, lime veil sweep, ASH lands huge.
CSS block `/* crazy hero */` appended. tsc clean, build green (67 files).

### 11.2 · Assembly-loop hero (supersedes 11/11.1 hero plate) + local-server note
Hero now uses `HeadsetRig.tsx`: base = `/img/ash-bare-front.png` (high-angle front,
looking at camera, no headset); overlay = `/img/ash-visor-object.png` cut into 7
vertical screen-blended slices that (2) sweep in left→right and wrap on, hold, then
(3) slice away back to the faint `Blueprint` wireframe — looping (repeat -1).
Phase 1 idle shows face + wireframe. Pointer fluid-lean + particles + RGB-split kept.
Local-server "missing components" audit: all 5 routes return 200; the ONLY 404s are
the three OPTIONAL `/video/*.mp4` drop-in slots (Reel falls back to its poster, by
design) — fixed an unused stale `site.card` `/img/og-card.jpg`→`/og-card.png`.
If running locally: `npm install` first (node_modules is not committed), then
`npm run dev`.

### 11.3 · Spatial/parallax pass (the LN "wireframe floats in 3D" feel)
Hero now has layered depth tracking the pointer: `.hero__par` (portrait) counter-drifts
(-8/-6px) while `.hero__par2` (blueprint) floats more (+22/+16px), on top of the
scene's rotateX/rotateY lean — so the wireframe reads as physically in front of the
head. Attempted a matched bare/with-helmet pair via image edit for the LN layer trick,
but the edit broke the pose (not usable) — kept the screen-blend frontobj overlay
instead. `ash-withheadset.png` deleted.

### 11.4 · High-quality self-generated pass
Matched bare/with-headset pair is NOT reliably generable (the image editor re-poses on
every edit attempt — tried twice, deleted both). Kept single-base screen-blend rig.
Added a tight headset wireframe SVG inside `.rig__overlay` (`rig__wire`) so the idle
outline exactly matches the assembled headset footprint; panels form on their own
blueprint like the LN reference. Deleted `ash-worn.png`.

### 11.5 · Analysis of the real LN source (repo `landnr`) + true-3D hero
The LN hero is WebGL: head = plane with `diffuse+depth+alpha+normal` (the "depth
component" for 2.5D parallax); helmet = Draco GLB `helmet-21.glb` with PBR textures +
HDRIs; choreography = GSAP ScrollTrigger + Rive. VERDICT: the VR+Ash idea IS achievable.
Implemented `HeroGL.tsx`: a real three.js VR headset (procedural, no asset) floating in
3D over the eyes — idle lime wireframe -> glossy panels sweep/rotate into a full
headset -> disassemble, looping; pointer parallax gives physical depth vs the 2D plate.
Base portrait switched to `ash-straight-bare.png` (dead-straight, upright, looking at
camera, no keyboard) to match the client's reference. When WebGL is live it adds
`.has3d` and supersedes the 2D wire/slices. `three` + `@types/three` added.

### 11.6 True depth-parallax head (LN-style 2.5D) — the big one

The LN hero pops because the head is a plane textured with the photo + a DEPTH map, and the
pointer offsets each pixel's UV by its depth → real per-pixel parallax (the nose pushes forward).
Now built:

- New `public/img/ash-straight-depth.png` — generated, visually matched to the straight pose
  (face/head near-white = near; hair/shoulders/jacket darker = far; black void = 0).
- `HeroGL.tsx` = ONE three.js scene: a head plane with a ShaderMaterial (`uv += uPar*depth(uv)*uStr`,
  uStr≈0.05) sized by `layout()` to replace the base `<img>`'s `object-fit: cover; 50% 32%` exactly,
  + the procedural headset anchored at the eye line (~42% height, z .55), orbiting on the pointer,
  exploded→assembled by the GSAP loop. Pointer drives head parallax + head tilt + headset orbit.
- `.has3d` on `.hero__figure` hides the 2D base/slices/blueprint when WebGL is live; 2D rig remains
  the fallback (reduced-motion / no WebGL / texture fail). Depth map preloaded in `__root` + Preloader.
- Dropped `public/img/ash-depth.png` (earlier high-angle base — pose mismatched).

Verification: typecheck clean · build green · dev serves · depth map preloading. WebGL/parallax
visually UNVERIFIED in sandbox (no browser) — depth-offset shader, layout match, fallbacks are
reviewed but not eyeballed.

### 11.7 Hero finale in one go: blueprint trace + fluid unwrap + depth head

Client directive: keep the fluid unwrap, use a VR headset (not helmet), and add the LN
"blueprint" — a black wireframe helmet/headset TRACING around the face (their screenshots).
Found the technique in the LN engine bundle: they use `LineSegments` + `setDrawRange` +
`LineDashedMaterial` (a line-drawing revealed by animating drawRange). Rebuilt for VR:

- BLUEPRINT: `WireframeGeometry` of the headset parts as dashed black `LineSegments`, scaled
  1.14 to hug the face from outside; each part TRACES on via `setDrawRange` with a stagger
  (visor -> rim -> straps) so it reads as inked around the face. Retracts at loop end.
- HEADSET: glossy panels then sweep/rotate in L->R (per-part staggered cascade) ON TOP of the
  blueprint, hold, disassemble; blueprint dims while solid, re-inks as it leaves. Seamless loop.
- HEAD: on load, one-time fluid L->R unwrap reveal (shader `uReveal`, soft edge + thin lime scan
  line) over the existing depth-parallax plane; pointer keeps per-pixel pop + tilt + orbit.

All in `HeroGL.tsx` (single scene). 2D rig still the fallback (reduced-motion / no WebGL / fail).

Verification: typecheck clean · build green (72 files) · dev serves · `headset3d` + depth map in
markup. WebGL/animation visually UNVERIFIED in sandbox (no browser).

### 11.8 CORRECTION: real custom VR blueprint + DEPTH VR hologram (client called it out)

11.7's "blueprint" was a wireframe of a squashed SPHERE (read as a helmet dome / hair-net) —
NOT a custom VR blueprint, and it never used the depth map for the trace. Client demand:
"custom blueprint trace animation for VR and depth VR". Now actually built:

- DEPTH VR: depth-map pixels are sampled on the CPU (offscreen canvas, 100x130 grid); the face
  is rebuilt as a displaced 3D wireframe (z = depth*0.18, triangles kept only where depth>0.1 so
  lines exist only on the person; alpha scales with nearness). A shader scan (uTrace) inks it on
  L->R so the wireframe conforms to the face topography — the "black tracing around the face"
  from the client's screenshots. Child of the head plane, so it tilts with the face.
- CUSTOM VR BLUEPRINT: pen-drawn line loops of a real VR headset — body silhouette + lens rim as
  superellipse loops, lens crosshair ticks, bezier side arms, catmull-rom top strap. Each loop is
  TRACED on sequentially via setDrawRange + LineDashedMaterial (LN engine technique).
- SOLID headset reshaped to match the blueprint (body/lens/rim/arms/top-strap), assembles L->R
  cascade into the blueprint; hold; disassemble; blueprint re-inks + retracts; depth scan reverses.
- Loop now STARTS after textures load (timeline built in .then), so phases never run over nothing.

Verification: typecheck clean · build green (72 files) · dev serves. WebGL visuals UNVERIFIED in
sandbox (no browser) — CPU depth sampling + shader scan reviewed, not eyeballed.

### 11.9 Hero rebuild after client review (the "bullshit VR" fix)

Client review: headset looked like a black blob, face hologram grid was wrong ("blueprint
trace ONLY the VR shape, not the face"), model must float over the page's OWN background like
the LN clone (no black rectangle), name must not cover the face. Also discovered the branch had
been reset to d1278f2 with a parallel client redesign in the working tree — committed the whole
tree to preserve it. Fixes shipped:

- DEPTH MAP REPLACED: regenerated to match the current stylized portrait (verified pose-matched:
  same spikes/collar/zipper), so silhouette alpha + parallax + normal light sample the right face.
- Face hologram DELETED. Blueprint now traces ONLY the VR headset shape (body/visor outlines,
  camera rings, arms, top strap) in lime pen lines via setDrawRange.
- VR HEADSET = real 3D product mesh: extruded rounded-box body, glass visor plate (clearcoat +
  envMapIntensity 1.8), lime light strip ring, facial gasket, side arms, top strap, 4 camera
  pucks. PBR MeshPhysicalMaterial + PMREM RoomEnvironment reflections (LN's HDRI technique).
- Silhouette alpha keyed from depth (smoothstep .08-.2) -> transparent bg, page backdrop shows.
- Wordmark z-index 1 -> ASH sits BEHIND the head like LN instead of over the face.
- Headset scale pW*0.24 at 40% eye line (was 0.3 blob over the whole face).

Verification: typecheck clean · vite build green · dev on 0.0.0.0:3000 serves hero markup +
depth png 200. Visuals UNVERIFIED here (no browser in sandbox).

### 11.10 LN asset pipeline for the VR headset (client: "generate its image and 3D structure")

Client showed the LN helmet UV/livery map and demanded the VR be made THE LN WAY: a generated
image + generated 3D structure, not assembled primitives. Shipped:

- GENERATED `public/img/ash-vr-headset.png` — product render, black carbon + lime strip + ASH
  mark + purple livery swirls, pure black bg (verified visually).
- GENERATED `public/img/ash-vr-headset-depth.png` — matched depth (visor white/near, strap far;
  verified pose-matched).
- HeroGL: procedural solid mesh DELETED. The headset is now a tessellated plane whose vertices
  are DISPLACED by the depth map in the vertex shader (real 3D relief, uPop animates the pop as
  it wraps on L->R over the blueprint trace) + its own pointer parallax + keyed alpha.
- Console fixes: removed stale `ash-visor-frontobj.png` preload (replaced with the two headset
  textures in __root + Preloader prime); `renderer.setSize(w,h,true)` + dropped the CSS
  `!important` canvas sizing (buffer/style mismatch warning).

Verification: typecheck clean · build green (74 files) · dev 0.0.0.0:3000 · all four textures 200
+ preloaded in SSR html. Visuals UNVERIFIED in sandbox (no browser).

### 11.11 Console-perfect sweep
- frontobj preload: zero refs left in tree (verified by grep); __root preloads only the four
  live hero textures.
- Firefox "destination rect smaller than viewport": integer pixel ratio + Math.round'd
  setSize (fractional drawing buffers were the trigger).
- /video/*.mp4: public/video absent by design (WAN pipeline pending). Reel uses
  preload="none" + poster => ZERO network requests and no broken UI until clips are dropped
  in; flip preload to "metadata" once real clips land.
- Audit: every /img/* ref in src exists on disk.

### 11.12 Full LN layer stack = real 3D depth
LN hero = shadow layer (back) + head (diffuse/alpha/depth/normal) + helmet (front). Now parity:
- GENERATED ash-straight-shadow.png (verified pose-matched feathered silhouette).
- LAYER 0: shadow plane behind the head (z -0.35, scale 1.08), alpha from 1-lum, counter-drifts
  the pointer and recedes on scroll -> the stack separates in depth.
- LAYER 1: head is now a 128x128 tessellated plane with VERTEX displacement by the depth map
  (uHeadPop 0->0.12) = true relief, on top of UV parallax + normal light.
- LAYER 2: worn displaced headset (unchanged).
- Shadow preloaded + primed.
Verification: typecheck clean · build green · pushed. Visuals unverified (no browser here).

### 11.13 READ THE LN ENGINE — true architecture, true parity
Extracted from vendor/offbrand/lando-by-OFF+BRAND.js (client demanded we read it):
- HEAD (class AX): PlaneGeometry(1,1,128,128); MeshPhysicalMaterial{ displacementMap: depth
  (displacementScale .25), alphaMap: alpha, normalMap, roughnessMap+metalnessMap, envMap HDRI
  intensity 1.5 }; projector-matrix diffuse; pointer = eased normalized mouse (intensity .075,
  ease .025).
- HELMET: GLB clone, scale (6.9,6.9,7.1); physical mat{ normalMap, metalnessMap, roughness .05,
  envMap HDRI 1.5 } + glass mat + matcap plastic opacity .25; livery change = FRAGMENT wavy sweep
  `vLocalPosition.y - sin(vLocalPosition.x ...)` blended by uHelmetTransition (gsap expo.inOut).
- shadow-softer-edit texture = the shadow layer.
Parity shipped: head is now CPU-displaced 128² PBR mesh with REAL recomputed normals + PMREM
RoomEnvironment (HDRI twin) + alphaMap/roughnessMap from depth; VR render materialises with the
EXACT wavy y-sin(x) sweep on its depth-displaced plane; shadow plane counter-drifts; bp trace +
worn headset + scroll dolly unchanged. Pointer ease .04 (their .025 feel).
Verification: typecheck clean · build green · pushed. No browser here -> visuals unverified.

### 11.14 Full generated PBR texture stack, wired
Generated + verified + wired, mirroring LN's per-asset map sets:
- ASH head: diffuse (bare) / depth / shadow / ALPHA (crisp matte, verified) / NORMAL / ROUGH.
  headMat now uses alphaMap=alpha, normalMap=normal (normalScale .55), roughnessMap=rough —
  the LN AX-class slot layout (depth stays the CPU displacement source).
- VR headset: diffuse / depth / ALPHA / NORMAL (spec sheen from normal in the wavy-sweep shader).
- BLACKPRINT: LN's blueprint language is black currentColor technical strokes (helmet-grid-frame
  is-base, non-scaling-stroke) -> bpMat color now 0x0b0d10 black.
- Preloader primes all 10; __root preloads the critical 7 (deduped).
Verification: typecheck · build · push. Visuals unverified (no browser in sandbox).

### 11.15 THE black blueprint — hunted in the bundle, replicated exactly
Client screenshot = LN's real hero: dense wireframe helmet shell around the head. Bundle truth
(class after helmet): `wireframeMeshMaterial = ShaderMaterial({ wireframe:true, transparent:true,
uniforms{uTime,uIsWireframeAnimating,uOpacity} })`, frag: `scan = pow(fract(-vPosition.y*10-uTime),4)*0.1;
gl_FragColor = vec4(vec3(0), (0.1+scan)*uOpacity)` on the MERGED helmet GLB geometries, same
position/scale as the helmet. NOT pen loops, NOT SVG frames.
Shipped: same recipe on a merged VR shell proxy (extruded body/visor/arms/top-strap via
mergeGeometries), child of the head, wrapping AROUND it (~95% frame width) like their helmet
wire; scan band crawls while live; uOp 1 -> .15 under the solid -> re-ink -> 0 on loop.
Verification: typecheck · build · push. Visuals unverified (no browser in sandbox).

### 11.16 LN stage, not my stage
Client: remove ASH wordmark, use LN's exact light background + waves, lit face, VR around head.
- Hero = light off-white stage (#f4f3ee) + Topo contour waves (dark 10% ink), data-theme="light"
  (ThemeSpy flips header ink), wordmark h1 + RGB-split + ParticleField DELETED.
- Head lit like LN: ambient .55 + key 1.6 + envMapIntensity 1.5; diffuse textures SRGBColorSpace
  (was rendering black without lights/colorspace).
- Shadow softened to .4 for the light stage.
- Console: duplicate React key fixed (Principles keys now by+i). X4122 = driver precision notice;
  scroll-linked panning = Firefox standard ScrollTrigger notice (LN triggers it too); both benign.
Verification: typecheck · build · push. Visuals unverified (no browser in sandbox).

### 11.17 Tidal background, live
Hunt result: hero bg is NOT in the JS bundle (no bg shader/plane; hero DOM has only gl-canvas +
UI) — it ships through the single compiled Webflow stylesheet/asset layer, which this sandbox
cannot fetch (curl SSL-blocked; SVG asset fetch 500). Footer blobs asset exists but only for footer.
Shipped TidalBg.tsx: live canvas field = off-white #f5f4f0 + filled contour blobs #e7e5e0 (value-noise
fbm iso-band, soft edges via 1/6-res upscale), slow drift, static under reduced motion; Topo hairlines
over it at z1; veil sweep now lime on the light stage.
Verification: typecheck · build · push. Visuals unverified (no browser in sandbox).

### 11.18 merge crash fix + driver-noise filter
Client console: `mergeGeometries failed at index 4` → geometry null → `new Mesh(null)` threw,
React tree crashed. Cause: ExtrudeGeometry is NON-indexed, TubeGeometry indexed; merge demands
parity. Fix: `gTop.toNonIndexed()` + `mergedWire ?? gBody` fallback (never null geometry).
X4122 lines = ANGLE/Firefox double-precision folding notices in three's built-in PBR program info
log (identical on the real LN site) → src/lib/quietGL.ts drops exactly those strings, keeps all
other console output; installed as first import of __root (runs before three loads).
Verification: typecheck · build · push. Visuals unverified (no browser in sandbox).

### 11.19 THE invisible face — winding
Both screenshots: grey blob = shadow layer ONLY (0.4 black over #f5f4f0 = #999). The displaced head
grid's indices were CW from +Z; MeshPhysicalMaterial FrontSide culled every triangle → face never
rendered in ANY commit since the CPU-displacement rewrite. Fix: CCW winding (a,d,c / a,c,b) +
headMat DoubleSide as permanent insurance. computeVertexNormals now yields +Z normals → lit face.
Verification: typecheck · build · push. Visuals unverified (no browser in sandbox).

### 11.20 Clean photo head + loud wire
Client screenshots: face rendered but glossy-plastic with baked lime rim (diffuse was generated with
neon rim light) — wrong for the light stage. Fixed at the source: diffuse relit in place (same
character/silhouette, even neutral studio light, matte, light-grey backdrop); alpha/normal/depth/
rough/shadow re-derived FROM the new diffuse in one pass so all maps stay aligned.
Material now photo-matte: rough .8, metal 0, clearcoat 0, env .5, normalScale .3, ambient .75/key 1.2.
Wire: alpha .10→.22 (+scan .16), solid-phase floor .15→.3, re-ink .9, tessellation densified
(curveSegments 28/bevel 6/steps, tube 32×10) to read like LN's dense helmet mesh.
Verification: typecheck · build · push. Visuals unverified (no browser in sandbox).

### 11.21 VR per face + TRUE 3D blackprint
Client: no back strap; VR shaped for the face; wireframe was a flat 2D card — make it 3D in the
exact VR shape.
- New headset asset: FRONT UNIT ONLY (no straps/halo), face-width goggle shell, lime accent, ASH
  wordmark; depth/alpha/normal re-derived from it (aligned).
- Blackprint rebuilt: extrude proxy + mergeGeometries DELETED; wireframe now = 97x97 grid displaced
  by the headset's OWN depth map (z=d*0.35, CCW), same wireframe ShaderMaterial + alpha discard
  (uAlpha<0.5) → dense 3D wire of the exact VR relief, child of headset (z+0.03), scale copies
  hsPlane so it always matches the solid.
- Headset sits at portrait eye line: local y 0.10 (tick base updated).
Verification: typecheck · build · push. Visuals unverified (no browser in sandbox).

### 11.22 silver-hair fix + visible wire + goggle line
Screenshot: hair rendered silver = generated head normalMap strand normals catching the key light
as white spec streaks → head normalMap UNBOUND (param kept as _nrm), roughness .95, env .3, key 1.0.
Goggles sat low (eyes peeked over rim) → y 0.10 → 0.125 (.then + tick).
Wire invisible at floor 0.3 (≈7% black on white) → floor 0.8, re-ink 1, like LN's resting wire.
Verification: typecheck · build · push. Visuals unverified (no browser in sandbox).

### 11.23 SELF-VERIFICATION PIPELINE + full-tree ship
No browser/sudo/CDN in sandbox → built /home/user/vischeck/render.mjs: pure-node composite that
mirrors HeroGL math 1:1 (same layout constants, textures, grid normals + lambert, wire edges from
headset depth grid) → PNG previews I can actually SEE and iterate on. Found+fixed in preview first:
goggle width 0.52→0.67 (eyes peeked), eye line 0.125→0.11, shadow 0.4→0.28, wire base alpha
0.22→0.5 (was invisible), preview-only px/center bugs isolated there, not in GL.
ALSO FOUND: committed tree was missing three dep + untracked hero components (ThemeSpy/TidalBg/
quietGL) + package-lock — shipped tree could not have built the hero. Full tree committed (33cb0a6),
playwright devDeps removed, three kept.
Verification: typecheck · build · push · visual iteration via composite previews (GL itself still
unrenderable here; composite mirrors its math).

### 11.23 EYES IN THE SANDBOX + verified rework
Installed headless Chromium via npm (@sparticuz/chromium + chrome-aws-lambda's libnspr; LD_LIBRARY_PATH
/tmp/al2023/lib:/tmp; swiftshader WebGL works; vite binds ::1 → shoot http://[::1]:3000).
Rig: /home/user/shottool/shot.js (not persisted; rebuild per sandbox: npm i in shottool + AAS).
Verified by screenshot, then fixed:
- silver hair = roughnessMap spec on black hair → unbound (_rgh), roughness 1, env .15, lights .65/.9.
- lime flood at scroll 0 = veil resting transform → CSS translateY(101%).
- my own `//` CSS comment crashed the Tailwind transform (500) → /* */.
- header ink stuck white on light hero: ThemeSpy probed `[data-theme]` — the page-wide `.shell`
  wrapper (dt=dark) won every probe/trigger → scoped to `section[data-theme]` + MutationObserver
  wiring for lazy routes + initial probe. Verified ink rgb(35,39,27) on the light stage.
Final verified look: tidal stage + hairlines, matte black-hair face, dense 3D VR-relief blackprint
over the eyes, dark-ink header; helmets section + footer healthy.
Verification: typecheck · build · push · headless screenshots (top/45%/sections).

### 11.24 THE missing-dependency bug (mine, finally root-caused)
User's fresh clone could never install `three`/`@types/three`: every prior commit added only
src/public/docs — package.json + package-lock.json changes stayed UNCOMMITTED in sandbox trees.
Committed now: deps `three ^0.186.0`, devDeps `@types/three ^0.186.0`, plus package-lock.json
(NOT gitignored). Verified the user's exact path: rm -rf node_modules → npm ci → three present →
typecheck clean → build green. ALWAYS commit manifests with code that imports new packages.

### 11.25 — full-screen lime veil sweep removed (2026-09-20)
User-side screenshots showed the mid-scroll hero as a pure lime frame ("nothing
loaded"). Cause: the scroll timeline swept a 100%-height lime veil across the
viewport for the middle third of the hero scroll. The materialise choreography
(HeroGL idle loop: wire draw-in → wavy solid sweep → hold → dissolve) already
carries the moment; the veil added a confusing blank frame. Deleted the veil
tween, ref, and JSX node from Hero.tsx. Verified by headless shots at 55% and
85% hero scroll: no lime flood; mid shows the half-materialised goggle over the
matte face, end shows the solid strap-less goggle at eye line.

### 11.26 — hero rebuilt as ONE generated worn portrait, true 3D (2026-09-20)
User verdict on the two-plane rig: "model is 2d, vr is 2d, looks placed on".
Root cause agreed: layering a separate headset plane over the face plane always
reads as a sticker. New pipeline:
 - generated ONE image of Ash already wearing the strap-less goggle
   (public/img/ash-worn.png, edited FROM ash-straight-bare.png so both states
   stay pixel-registered), then derived ash-worn-depth.png (visor = brightest
   relief), ash-worn-alpha.png (silhouette) and ash-vr-mask.png (goggle-only
   region) from that same image.
 - HeroGL now builds three CPU depth-displaced grids with real vertex
   normals: bare head (161^2), worn state (161^2, own depth, wavy LN sweep
   reveal with a thin lime boundary line), and the blackprint wire (97^2,
   worn depth, clipped to the goggle mask so it never touches the face).
 - idle loop redesigned: bare -> brief wire blueprint tease -> wavy sweep to
   the rich worn solid -> hold (no ghost wire; the dense wireframe veil was
   the "sticker" look) -> sweep out. Meshes hard-hidden at zero uniforms.
Verified headless: hold phase is saturated and the goggle reads as geometry
(hair over edge, contact shadow), wire phase is a short hologram tease.

### 11.27 — premultiplied-alpha wash fixed; premium polish pass (2026-09-20)
The milky "cheap" look had ONE root cause: the WebGL context is
premultiplied-alpha but the custom worn/wire ShaderMaterials emitted straight
color, so anywhere alpha < 1 the compositor added `rgb + white*(1-a)` —
sweep edges and wire lines glowed milky instead of darkening. Fixed by
emitting premultiplied output (`vec4(col*rev, rev)`, `vec4(c*a, a)`).
Polish pass on top of that:
 - grids raised to 256^2 (bare + worn), wire 128^2 — smoother relief/edges
 - worn mesh reuses the BARE silhouette alpha (generated worn alpha had
   noisy edges -> white slivers); edges AA'd via smoothstep
 - bare head hidden while worn is fully appeared (no bleed-through on hold)
 - lime sweep line narrowed + dimmed (was tinting hair green mid-sweep)
 - TidalBg: single dominant noise octave, wider soft band, lighter tint,
   half-speed drift — calm LN-clean stage instead of speckled smudges
Verified headless at 100% crop: visor deep black with lime stitch, no lines
crossing the face (background contours sit behind the figure), saturated
jacket, clean silhouette.

### 11.28 — SITE-WIDE reveal specificity bug fixed (2026-09-20)
The "cheap whole site" verdict traced to one CSS bug: hidden states were
scoped `html.js .fade` / `html.js .word > i` (specificity 0,2,1 / 0,2,2) but
the revealed states `.fade.is-in` / `.is-in .word > i` (0,2,0 / 0,2,1) LOST
the cascade — every scroll reveal on the site never visibly fired: mega-type
rendered as broken slices, chips/cards/buttons stayed invisible, sections
looked empty. Fixed by scoping revealed states under html.js too. Plus:
 - .word mask grown both axes (display face ink overhangs the 0.84 line box)
 - section rhythm tightened (.sec 11vw->8vw, .phero 15vw->10vw top)
 - reveals sped up (.fade 1s->0.7s, word wipe 0.9s->0.7s)
 - HeroGL pauses its rAF render when the hero is off-screen (never tax the
   rest of the page for a canvas nobody sees)
Verified headless: statement + gatewall + pillars now render complete.

### 11.28 — whole-site audit + hero loop tuning (2026-09-20)
Audited every home section and all four sub-routes in headless screenshots
after the reveal-cascade fix (5a56df0): HeadsetHall, statement, pillars,
FaceSplit, pipeline, collage, claims, CTA, footer and the /asheo /in-prod
/off-clock /contact heroes all render cohesive and premium; the two
suspected defects (lime "void", clipped hall card) were slice artifacts —
the lime CTA section carries its own mega heading below the fold and the
hall row is a scroll-driven horizontal track (LN-style, clips by design).
Hero loop tuned: sweep 1.1s -> 0.85s, hold 2.0s -> 2.4s, so the rich worn
solid is the dominant frame and the pale crossfade window is shorter.

### 11.28 — whole-site polish pass (2026-09-20)
Section-by-section headless audit (21 scroll stops) found three finish
defects; all fixed and re-verified on screen:
 - HeadsetHall headline sat at x=0 while every other section uses the rail:
   `.helm__head` now pads horizontally with `var(--rail)`.
 - The pinned FaceSplit void was flat black before the doors close: the
   section now carries the Topo contour field like every other dark stage.
 - The 5th "on the record" card orphaned into a lone row: the architect's
   own line now closes the grid as a wide 2-col card with larger serif type.
Everything else (hall cards, terminal, kit pillars, pipeline, collage,
gatewall, stacksec, footer) audited clean at 1600x1000.

### 11.28 — whole-site reveal audit; CTAs were invisible on 4 routes (2026-09-20)
Full-route sweep (scroll + computed-opacity probe) found the lime CTA bands
on /, /asheo, /in-prod, /contact rendering as BLANK full-screen lime: their
`.fade` children had no `Reveal` ancestor, so `is-in` never arrived and the
giant headline + button sat at opacity 0. Wrapped each `cta__inner` in
`<Reveal>`. Also: bone-section stat numerals were drab olive — now ink for
editorial punch. Post-fix sweep: zero stuck `.fade` on all five routes
(items flagged mid-sweep carried `is-in` and were simply mid-stagger).

### 11.29 — media pass: outline trace, no coexisting figures, Ken Burns, new stills (2026-09-20)
User verdict: mesh-over-face tease = cringy; jacket showed torn dark flecks
mid-sweep (bare and worn versions of the figure disagreeing while both
visible). Fixes:
 - blackprint is now a LIME OUTLINE TRACE (mask edge-detect in the wire
   fragment) hugging the 3D goggle relief — a pen loop, never a mesh on
   the face.
 - the bare mesh fades out (opacity = 1 - ap*5, hidden at ap>0.2) the
   moment the sweep starts; the worn state materialises alone over the
   clean stage. Two figure versions never coexist.
 - depth maps blurred while downsampling (ctx.filter blur 2px) so
   displaced normals stay smooth.
 - worn silhouette = union of bare + worn alpha maps (no hole in either
   can punch through).
 - photo animation: slow Ken Burns breathing (scale/translate keyframes,
   16s alternate) on every collage still + reel poster; disabled under
   reduce-motion.
 - two new generated cinematic stills: ash-dark-build.jpg ("Built in the
   dark") and ash-bench.jpg ("The bench — lime on black").

### 11.29 — sweep-over-bare compositing, intersection alpha, visor glint, two cinematic stills (2026-09-20)
User frames still showed (a) milky sweep and (b) white torn slivers on the
jacket/hair. Root causes found by instrumenting the loop:
 - a69d154 hid the bare head at sweep START, so the semi-transparent sweep
   edge composited over the WHITE PAGE. Bare now stays under the sweep until
   worn is ~opaque (head opacity ramps out only for ap>0.82), then steps aside.
 - the silhouette union (max) kept pixels where the worn map is background
   white; intersection (min) kills the slivers.
 - worn grade brightened (0.9+0.18) to match the source photo on real GPUs.
 - living glass: one slow diagonal glint sweeps the visor (mask-bounded).
Media: two new cinematic stills (neon night street, dawn rooftop) replace the
reel posters; Ken Burns now also breathes on the faces-pinned reels.

## 11.30 — FACELESS REBUILD ("no face reveal — the work is the face")

User mandate: dump EVERY generated Ash portrait (all cartoon-boy art = cringe), rethink the
whole site as a $100k/awwwards-beating faceless portfolio. Concept adopted: Ash never
appears; presence lives in artifacts.

- Hero rewritten (`Hero.tsx` + `HeroGL.tsx`): void stage (`hero--void`, 260vh) with lime
  Topo at 0.14, CSS under-glow, giant type "NO FACE. / only work." (scrubs out on scroll)
  and the strap-less goggle as a floating 3D product hologram on
  `/img/ash-vr-headset{,-depth,-alpha}.png`: 256² CPU depth-displaced grid (blur 2px, real
  recomputed normals) + 110² wire twin. BLACKPRINT wire = LN wireframe ShaderMaterial recipe
  (lime, y-scan band, premultiplied) with alpha discard; SOLID = custom shader with LN wavy
  `y+0.1·sin(x·9)` sweep (tr=1.25−ap·1.6), pow(0.80) gamma lift + lime fresnel rim
  (pow(1−n.z,2.2)·0.55) so the black product reads on the void, slow diagonal glint.
  Loop ≈6.5s: wire-in → wavy materialise → wire dims → glossy hold → dematerialise.
  Rig: orbit sin(t·0.22)·0.32, bob, eased pointer lean (±0.3/0.12), scroll dolly z+0.9 &
  scale+25% via ScrollTrigger on `.hero`. Silent fallback (reduced motion / no WebGL / load
  fail) leaves the type stage.
- CRITICAL DEBUG LESSON: dark product render on near-black void = invisible; verify GL
  layers by probing with a loud canvas CSS background before blaming the shader. Draw calls
  + uniforms can all be correct while the frame reads empty for lack of contrast.
- Face purge (grep-verified zero refs to dumped assets): nav/collage now
  ash-dark-build / ash-neon-night / ash-dawn-rooftop (all back-view or occluded = anonymous);
  asheo+contact peel `under` → `/img/anon-void.jpg` (featureless black bust, the brand image);
  off-clock poster → ash-dawn-rooftop; Preloader/__root preload → `/img/ash-vr-headset.png`.
- Dumped from usage (files remain, unused): ash-night, ash-stage, ash-walk, ash-face,
  ash-straight-bare, ash-worn*.
- Verified screenshots: v1-solid (lime wire hologram on void), v2-scroll (glossy
  materialised product over fading type), r-asheo2 (footer closer "THE WORK is THE FACE.").
  typecheck + build clean; pushed.
