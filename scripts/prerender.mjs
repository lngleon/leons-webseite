// Prerendering (SSG): rendert jede Route beim Build zu statischem HTML mit
// echtem Inhalt (H1 + Sektions-Text ohne JS im Quelltext → LCP/SEO) und
// injiziert es in das von Vite gebaute index.html-Template.
// Zusätzlich bekommt JEDE Route ihren eigenen <head>: <title>,
// <meta name="description"> und Basis-OpenGraph (Route→Meta-Map unten) –
// dependency-frei, jeder Title/Desc genau einmal (keine Duplikate über die
// Routen). renderToString-basiert (kein Puppeteer, kein SSR-Server).
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const ROUTES = ['/', '/impressum', '/datenschutz']

// Pro-Route-Metadaten. Quelle der Wahrheit für Title/Description/OG.
// og:title/og:description spiegeln Title/Desc; og:type = "website".
// og:image/og:url bewusst NICHT gesetzt (kein Logo, keine finale Domain).
const META = {
  '/': {
    title: 'Leon Lang – Webseiten, Web-Apps & KI-Integration',
    description:
      'Moderne Webseiten, Web-Apps und KI-Lösungen – individuell programmiert von Leon Lang. Von der Idee bis zum Launch, alles aus einer Hand.',
  },
  '/impressum': {
    title: 'Impressum – Leon Lang',
    description: 'Impressum und rechtliche Angaben von Leon Lang.',
  },
  '/datenschutz': {
    title: 'Datenschutz – Leon Lang',
    description: 'Datenschutzerklärung von Leon Lang.',
  },
}

const DIST = resolve('dist')
const SSR_DIR = resolve('dist-ssr')

const escapeHtml = (s) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

// Baut den Pro-Route-<head>-Block (Title + Description + Basis-OpenGraph).
function buildHead({ title, description }) {
  const t = escapeHtml(title)
  const d = escapeHtml(description)
  return [
    `<title>${t}</title>`,
    `<meta name="description" content="${d}" />`,
    `<meta property="og:title" content="${t}" />`,
    `<meta property="og:description" content="${d}" />`,
    `<meta property="og:type" content="website" />`,
  ].join('\n    ')
}

// Entfernt den (geteilten) Default-Title + -Description aus dem Template und
// schreibt den Pro-Route-Block vor </head> → jeder Wert steht genau einmal und
// unterscheidet sich pro Route. Die description-Regex ist multiline-fest und
// trifft NUR das description-Meta (jedes Meta endet an seinem eigenen ">").
function injectHead(template, meta) {
  return template
    .replace(/\s*<title>[\s\S]*?<\/title>/i, '')
    .replace(/\s*<meta[^>]*\bname=["']description["'][^>]*>/i, '')
    .replace('</head>', `    ${buildHead(meta)}\n  </head>`)
}

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
  const meta = META[url]
  if (!meta) throw new Error(`Keine Metadaten für Route ${url} in META definiert`)
  const appHtml = render(url)
  // Funktion als Replacement: verhindert, dass "$"-Sequenzen im gerenderten
  // HTML (z.B. der Terminal-Prompt) als Ersetzungsmuster interpretiert werden.
  const html = injectHead(template, meta).replace(
    MARKER,
    () => `<div id="root">${appHtml}</div>`,
  )
  const outFile = url === '/' ? join(DIST, 'index.html') : join(DIST, url, 'index.html')
  await mkdir(dirname(outFile), { recursive: true })
  await writeFile(outFile, html, 'utf8')
  console.log(`prerendered ${url} → ${outFile.replace(DIST, 'dist')}`)
}
