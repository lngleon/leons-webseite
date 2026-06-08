import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './App'

/**
 * Server-/Build-Render für das Prerendering (SSG). Rendert die App für eine
 * gegebene Route deterministisch zu HTML (kein window/document, kein Zufall).
 * Wird NICHT im Browser ausgeführt – nur beim Build von scripts/prerender.mjs.
 */
export function render(url: string): string {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  )
}
