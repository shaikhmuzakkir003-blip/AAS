# ASH — The Architect of Asheo

> Autonomous developer & QA tool showcase for Asheo (2.0 MB Chromium MV3 extension, 41 gateway handlers, 85 signed files, zero telemetry).

---

## 🚀 Hosting on GitHub Pages

This repository is pre-configured with a zero-maintenance **GitHub Actions** deployment workflow (`.github/workflows/deploy.yml`).

### Step 1: Enable GitHub Pages in Repository Settings
1. Open your repository on GitHub: [shaikhmuzakkir003-blip/AAS](https://github.com/shaikhmuzakkir003-blip/AAS)
2. Click on **Settings** (top navigation tab).
3. In the left sidebar, click on **Pages**.
4. Under **Build and deployment** → **Source**, click the dropdown and select **GitHub Actions**.

### Step 2: Trigger Deployment
- **Automatic**: Any push or merge to `main`, `master`, or `arena/01a0a4da-aas` automatically triggers the build and deploys within ~60 seconds.
- **Manual (Immediate)**:
  1. Go to the **Actions** tab on GitHub.
  2. Select **Deploy to GitHub Pages** in the left sidebar.
  3. Click **Run workflow** → **Run workflow**.

Your site will be live at:
**`https://shaikhmuzakkir003-blip.github.io/AAS/`**

---

## 🛠️ Local Development

```bash
# Clone the repository
git clone https://github.com/shaikhmuzakkir003-blip/AAS.git
cd AAS

# Install dependencies
npm --prefix ASH-website install

# Run local dev server (port 3000)
npm run dev
# or: cd ASH-website && npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Production Static Build & Prerender

The build runs full static prerendering across all 5 routes (`/`, `/asheo`, `/in-prod`, `/off-clock`, `/contact`), generates `.nojekyll`, and outputs `404.html` SPA routing fallbacks:

```bash
# Standard root build
npm run build

# Build with custom subpath (e.g. for GitHub Pages)
BASE_PATH=/AAS/ npm run build
```

Static assets are compiled to `ASH-website/dist/client`.

---

## 🌐 Routes Overview

- `/` — Masthead hero (3-act unwrap: Kalos Mascot → Cap-Off → Faceless Architect), interactive Luhn simulator, and architectural ledger.
- `/asheo` — Extension specs, 41-gateway matrix, 3-step audit method, and download checksums.
- `/in-prod` — Production pipeline, request intercept lifecycle, and real-time telemetry.
- `/off-clock` — B-roll frames, 35mm photography, interactive shot lightbox, and design philosophy.
- `/contact` — Direct channels, Telegram keys, and audited FAQ.
