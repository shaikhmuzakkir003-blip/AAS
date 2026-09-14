import { HeadContent, Scripts, createRootRoute, Outlet } from '@tanstack/react-router'

import appCss from '../styles.css?url'
import { SmoothScroll } from '#/components/SmoothScroll'
import { Cursor } from '#/components/Cursor'
import { SiteHeader } from '#/components/SiteHeader'
import { SiteFooter } from '#/components/SiteFooter'
import { pageMeta } from '#/lib/meta'

const TITLE = 'Ash — developer, builder of Asheo'
const DESC =
  'Ash is the independent developer behind Asheo, the extension 1.2M people run every day. Nine years of shipped work, and still no face reveal.'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ...pageMeta({ title: TITLE, description: DESC }),
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Ash' },
      { name: 'theme-color', content: '#282c20' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;700;800;900&family=Instrument+Serif:ital@0;1&family=IBM+Plex+Mono:wght@400;500&display=swap',
      },
    ],
  }),
  shellComponent: RootDocument,
  component: () => (
    <div className="shell">
      <SmoothScroll />
      <Cursor />
      <SiteHeader />
      <main>
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  ),
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
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
