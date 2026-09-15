/**
 * Resolves public assets relative to Vite's configured base URL.
 * Ensures images, videos, and icons load correctly whether deployed at
 * root '/' or under a GitHub repository subpath like '/AAS/'.
 */
export function asset(path: string): string {
  if (!path) return ''
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path
  }
  const base = import.meta.env.BASE_URL || '/'
  const cleanBase = base.endsWith('/') ? base : `${base}/`
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${cleanBase}${cleanPath}`
}
