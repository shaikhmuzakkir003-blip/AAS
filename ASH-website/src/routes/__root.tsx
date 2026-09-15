import { HeadContent, Scripts, createRootRoute, Outlet } from '@tanstack/react-router'

import appCss from '../styles.css?url'
import '../styles.css'
import { SmoothScroll } from '#/components/SmoothScroll'
import { Cursor } from '#/components/Cursor'
import { SiteHeader } from '#/components/SiteHeader'
import { SiteFooter } from '#/components/SiteFooter'
import { Preloader } from '#/components/Preloader'
import { FilmFx } from '#/components/FilmFx'
import { ThemeSpy } from '#/components/ThemeSpy'
import { CyberCanvas } from '#/components/CyberCanvas'
import { AuroraGlow } from '#/components/AuroraGlow'
import { BUILD, LINKS } from '#/data/site'
import { pageMeta } from '#/lib/meta'

const TITLE = 'ASH — independent engineer, architect of Asheo'
const DESC =
  'Asheo is a 2 MB Chromium MV3 developer tool for testing payment gateways. 41 gateway handlers, 85 integrity-signed files, local-only generation, zero telemetry. No face reveal — the work is the face.'

const cssHref =
  typeof appCss === 'string' && appCss.startsWith('/src/')
    ? `${appCss}?direct`
    : appCss

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ...pageMeta({ title: TITLE, description: DESC }),
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'ASH' },
      { name: 'theme-color', content: '#0b0d08' },
    ],
    links: [
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      { rel: 'stylesheet', href: cssHref },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800;900&family=Instrument+Serif:ital@0;1&family=IBM+Plex+Mono:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap',
      },
      { rel: 'preload', as: 'image', href: '/img/hero-cap-dark.jpg' },
      { rel: 'preload', as: 'image', href: '/img/anon-void.jpg' },
    ],
  }),
  shellComponent: RootDocument,
  component: () => (
    <div className="shell" data-theme="dark">
      <Preloader />
      <FilmFx />
      <AuroraGlow />
      <CyberCanvas />
      <SmoothScroll />
      <Cursor />
      <SiteHeader />
      <ThemeSpy />
      <main>
        <Outlet />
      </main>
      <SiteFooter />
      <span className="sr-only">
        Asheo {BUILD.version} · {LINKS.site}
      </span>
    </div>
  ),
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="js" data-theme="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}

