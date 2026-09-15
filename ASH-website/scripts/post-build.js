import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const clientDir = path.resolve(__dirname, '../dist/client')

if (fs.existsSync(clientDir)) {
  // 1. Create .nojekyll
  fs.writeFileSync(path.join(clientDir, '.nojekyll'), '', 'utf8')
  console.log('[post-build] Created dist/client/.nojekyll')

  // 2. Create 404.html fallback from index.html for GitHub Pages routing
  const indexPath = path.join(clientDir, 'index.html')
  const notFoundPath = path.join(clientDir, '404.html')
  if (fs.existsSync(indexPath)) {
    fs.copyFileSync(indexPath, notFoundPath)
    console.log('[post-build] Created dist/client/404.html fallback')
  }
}
