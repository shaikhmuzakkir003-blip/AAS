/** Absolute URL for the share card, so scrapers can fetch it from anywhere. */
export const SITE_CARD = 'https://xaax64jejx90ysgvxpr3.apps.whop.com/og-card.png'

type CardInput = { title: string; description: string }

/** Title + Open Graph card for a page, in one line. */
export function pageMeta({ title, description }: CardInput) {
  return [
    { title },
    { name: 'description', content: description },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:image', content: SITE_CARD },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:image', content: SITE_CARD },
  ]
}
