# WAN.AI ASSET KIT — ASH BUILDS

Everything the site is waiting on, in render order. The site already contains every
slot and falls back to the current stills until the matching file exists — drop in an
`.mp4` at the exact path below and that section upgrades itself. No code changes needed.

**Drop raw renders in `public/video/_src/` (git-ignored). I will transcode, trim,
stitch, loop-seam, and extract poster frames from them — you only need to render.**

---

## 0 · Character bible — paste into every prompt

The character is **Kalos Ash (Pokémon XY/XYZ)**, not generic anime boy, not the
green-jacket Pixar kid:

> Ash Ketchum from Pokémon the Series XYZ, heroic teen trainer, messy spiky jet-black
> hair with sharp jagged bangs, warm chocolate-brown eyes, light tan skin, tiny
> zig-zag markings on both cheeks, confident slight smirk. Wearing his Kalos outfit:
> red baseball cap with a white and blue curved arch logo on the front, royal-blue
> zip-up jacket with white collar and white side panels over a dark charcoal shirt.
> High-end 3D animated feature-film look: soft subsurface skin, visible fabric weave,
> cinematic volumetric light, shallow depth of field, fine film grain.

The figure beneath the mascot (Act III) is deliberately **a featureless matte-black
faceless mannequin** — no face, no identity. That is intentional: the developer has
never done a face reveal. Do not render a real person, eyes, or skin under the
character.

**Universal negative prompt:** text, captions, watermark, logo other than the cap
symbol, extra fingers, deformed hands, second person, crowd, modern phone UI,
Pokémon creatures, green jacket, facial hair, realistic human face, blur artifacts,
interlacing.

**Reference trick for consistency:** for the three ambient reels, use the site's
existing poster frame as the **first-frame / image-to-video reference**
(`public/img/ash-night.jpg`, `ash-walk.jpg`, `ash-stage.jpg`). The character then
cannot drift off-model. If a poster itself looks off-model to you, regenerate the
still first (prompts in §4), then animate that.

**Export for all clips:** MP4 (H.264), highest quality / highest bitrate offered,
muted is fine (site plays them silent), 24–30 fps. No need to compress yourself —
I transcode for web. If WAN caps a clip at 5 s, render two and I stitch.

---

## 1 · Hero unwrap clip — `/public/video/hero-unwrap.mp4`  ⭐ the centerpiece

A scroll-**scrubbed** clip: the visitor's scroll position walks the playhead from
first frame to last, so the three acts must land at exact percentages. The site
captions and UI already animate to these timings.

- **Format:** vertical **9:16, 1080×1920**, character dead-centre, head-and-torso
  filling the frame, all critical detail inside the central 60 % width (desktop
  cover-crops the sides; the background is near-black so nothing is lost).
- **Length:** 10 s. (If 5 s cap: render clip A and clip B separately, upload both,
  I stitch.)
- **Camera:** one very slow, smooth push-in throughout, no lateral move, no cuts —
  the transitions are the only "cuts".
- **Lighting continuity:** pitch-black void backdrop, single overhead soft spotlight
  from above-front, faint acid-lime (#c8f02b) rim light on the hair and shoulders,
  fine dust motes in the beam, tiny star-like particles in the black.

### Act timeline (the percentages are hard requirements)

| Time | Scroll % | What's on screen |
|---|---|---|
| 0.0–2.8 s | 0–28 % | **Act I hold:** cap-on Kalos Ash, head-to-chest, locked stare into camera, micro blink, faint smirk. |
| 2.8–4.8 s | 28–48 % | **Unwrap:** the red cap dissolves / de-rezzes away top-to-bottom like a scanning line of glowing particles and fibre threads sweeping downward; hair settles underneath as the line passes. One clean horizontal light sweep, no cap remnants when done. |
| 4.8–6.0 s | 48–60 % | **Act II hold:** cap-off Ash — same face, same pose, same lighting, hair fully revealed. |
| 6.0–8.2 s | 60–82 % | **Second unwrap:** another top-to-bottom scan sweep; the entire coloured character disintegrates into the same upward-drifting dark particles, revealing a smooth **matte-black faceless mannequin** in the exact pose, featureless head and shoulders. |
| 8.2–10 s | 82–100 % | **Act III hold:** the black mannequin alone in the spotlight, faint lime rim, slow push, dust only. Hold still — this is the final frame users rest on. |

### Master prompt (single 10 s text-to-video render)

> [CHARACTER BIBLE]. Vertical 9:16 cinematic portrait, head and torso centered
> against an infinite pure-black void, one overhead soft spotlight, acid-lime rim
> light, floating dust. Very slow continuous dolly-in, locked-off central framing.
> The figure holds still, breathing subtly. At ~28 % of the clip a thin glowing
> horizontal scan-line sweeps from the top of frame downward, and as it passes, the
> red cap dissolves into fine luminous fibres and particles that drift upward and
> fade, revealing the same character without the cap, identical pose and lighting;
> hold. At ~60 % a second scan-line sweeps down and the entire coloured character
> dissolves into dark drifting particles, leaving behind a perfectly smooth
> matte-black faceless mannequin in the identical pose and wardrobe silhouette, no
> facial features at all; hold to black. Premium console-game cinematic, expensive
> VFX, even exposure, no camera shake, no cuts.

### Fallback — three image-to-video clips (do this if the single render won't hold)

Render each from the named first-frame image in `public/img/`, upload as
`_src/hero-1.mp4`, `_src/hero-2.mp4`, `_src/hero-3.mp4`; I stitch with scan-wipe
crossfades at the exact percentages above.

1. **hero-1 (3 s, first frame `hero-cap-dark.jpg`)** — "[bible] …cap on, subtle
   breathing and one slow blink, dust drifting in spotlight, camera pushes in
   imperceptibly; on the final half-second the cap begins dissolving from the crown
   downward in glowing fibres."
2. **hero-2 (3 s, first frame `hero-nocap-dark.jpg`)** — "same figure without cap,
   identical pose and light, hair settling, faint smirk, slow push-in; on the final
   second the figure begins dissolving at the crown into dark particles revealing
   black beneath."
3. **hero-3 (4 s, first frame `anon-void.jpg`)** — "featureless matte-black
   faceless mannequin bust in a spotlight on a pure-black void, acid-lime rim light,
   drifting dust, slow push-in, completely still and ominous, hold."

---

## 2 · Ambient reels (seamless loops, 6–8 s each)

These play as silent cinemagraphs in the Off Clock gallery and the home FaceSplit.
Subtle motion only — these sit behind editorial copy. Aim for a loop where first and
last frames match (I can crossfade the seam if they don't). Use the listed poster as
the first frame.

### `/public/video/night-coding.mp4` — poster `/img/ash-night.jpg` · portrait 3:4

> First frame: [reference image]. [CHARACTER BIBLE], seen from behind and slightly
> above at a dark desk late at night, face lit only by monitor glow and one warm
> desk lamp, hands barely visible typing. Cinemagraph: monitor light flickers
> softly across hair and shoulders, faint steam rises from a mug, dust in the lamp
> beam, a LED pulses slowly; camera perfectly locked, no body move bigger than
> breathing. Deep blacks, lime-tinted screen light, moody, filmic, 35 mm grain.
> Seamless loop.

### `/public/video/lumiose-walk.mp4` — poster `/img/ash-walk.jpg` · portrait 4:5

> First frame: [reference image]. [CHARACTER BIBLE] viewed from a low three-quarter
> back angle walking through a luminous glass arcade inspired by Lumiose City at
> golden morning, tall arched steel-and-glass windows, prismasaurus-like tower
> silhouetted far outside, palm fronds, long warm god-rays, dust glittering in the
> light. Gentle parallax: he takes two or three slow confident strides, cap brim and
> jacket hem sway, light shimmers across the glass; smooth stabilized tracking glide,
> no cuts, dreamy and expensive, shallow depth of field, soft grain. Loopable.

### `/public/video/rooftop.mp4` — poster `/img/ash-stage.jpg` · portrait 3:4

> First frame: [reference image]. [CHARACTER BIBLE], from behind, small against the
> frame, standing on a weathered Parisian zinc rooftop at blue hour, chimney pots
> and wrought-iron railing, the Eiffel-inspired tower and city lights sparkling far
> below, deep indigo storm clouds with breaking blue gaps, faint acid-lime signage
> glow on a nearby wall. Cinemagraph motion: clouds drift slowly, distant city
> lights twinkle, his jacket and hair stir in a soft breeze, one bird crosses far
> in the distance; locked camera, cinematic wide-shot scale, moody teal-and-amber
> grade, fine grain. Seamless loop.

---

## 3 · Routing cheat-sheet (where each file appears)

| File you add | Appears in | Current fallback |
|---|---|---|
| `public/video/hero-unwrap.mp4` | Home hero, replaces all three still acts | cap / nocap / anon still plates + CSS wipe |
| `public/video/night-coding.mp4` | Home FaceSplit + Off Clock gallery, "Built in the dark" | `img/ash-night.jpg` |
| `public/video/lumiose-walk.mp4` | Home FaceSplit + Off Clock, "Lumiose-bound, early" | `img/ash-walk.jpg` |
| `public/video/rooftop.mp4` | Off Clock hero frame + gallery, "Above the skyline" | `img/ash-stage.jpg` |

The gallery badge automatically flips from **STILL** to **REEL** only once the video
has actually loaded — no fake "reel ready" state.

## 4 · Optional poster refreshes (only if a current still looks off-model)

Still-image prompts, aspect ratios matching the slot, same [CHARACTER BIBLE] prefix;
render at ≥1400 px on the short edge, name exactly as the poster it replaces:

- **`img/ash-night.jpg` (3:4)** — "…from behind at a cluttered developer desk at
  3 a.m., dual monitors washing him in dim lime light, mechanical keyboard, coffee,
  sketches of extension UI pinned on the wall, deep shadows, cinematic."
- **`img/ash-walk.jpg` (4:5)** — "…inside a sunlit glass-and-steel arcade,
  Lumiose-inspired city beyond, golden hour, palms, lens flare, three-quarter back
  view, red cap unmistakable, hopeful mood, cinematic."
- **`img/ash-stage.jpg` (3:4)** — "…solitary on a Parisian rooftop at blue hour,
  back to camera, city skyline and glowing tower below, wind, epic scale,
  cinematic wide shot."

Keep the existing hero plates (`hero-cap-dark.jpg`, `hero-nocap-dark.jpg`,
`anon-void.jpg`) — they are on-model and are the act reference frames.

---

### Hand-off

1. Render with WAN (image-to-video from the listed posters preferred).
2. Drop downloads in `ASH-website/public/video/_src/` using the names above
   (or send them and I'll place them).
3. Say the word — I transcode to fast-loading H.264, time the hero stitch to
   28/48/60/82 %, extract/freeze posters, verify mobile + desktop, and commit.
