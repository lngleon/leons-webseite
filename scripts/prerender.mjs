// Prerendering (SSG): rendert jede Route beim Build zu statischem HTML mit
// echtem Inhalt (H1 + Sektions-Text ohne JS im Quelltext → LCP/SEO) und
// injiziert es in das von Vite gebaute index.html-Template.
// renderToString-basiert (kein Puppeteer, kein SSR-Server zur Laufzeit).
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const ROUTES = ['/', '/impressum', '/datenschutz']
const DIST = resolve('dist')
const SSR_DIR = resolve('dist-ssr')

// Server-Bundle finden (Vite benennt es nach dem Entry, ohne Hash).
const ssrFile = (await readdir(SSR_DIR)).find((f) => f.startsWith('entry-server'))
if (!ssrFile) throw new Error('entry-server.* nicht in dist-ssr gefunden')
const { render } = await import(pathToFileURL(join(SSR_DIR, ssrFile)).href)

const template = await readFile(join(DIST, 'index.html'), 'utf8')
const MARKER = '<div id="root"></div>'
if (!template.includes(MARKER)) {
  throw new Error(`Marker ${MARKER} nicht im gebauten index.html gefunden`)
}

for (const url of ROUTES) {
  const appHtml = render(url)
  const html = template.replace(MARKER, `<div id="root">${appHtml}</div>`)
  const outFile = url === '/' ? join(DIST, 'index.html') : join(DIST, url, 'index.html')
  await mkdir(dirname(outFile), { recursive: true })
  await writeFile(outFile, html, 'utf8')
  console.log(`prerendered ${url} → ${outFile.replace(DIST, 'dist')}`)
}
