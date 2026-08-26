/**
 * Feines Papier-Korn über der ganzen Demo-Seite.
 *
 * Prozedurales SVG (gekacheltes `feTurbulence`, fester Seed) statt Bilddatei –
 * deterministisch, keine externe Ressource, kein Hydration-Risiko. Dieselbe
 * Technik wie der Hero-Hintergrund der Hauptseite, nur wärmer und schwächer.
 */
export default function DemoGrain() {
  return (
    <svg className="demo-grain" aria-hidden="true">
      <defs>
        <filter id="demo-grain-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves={2}
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <pattern
          id="demo-grain-tile"
          width="180"
          height="180"
          patternUnits="userSpaceOnUse"
        >
          <rect width="180" height="180" filter="url(#demo-grain-filter)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#demo-grain-tile)" />
    </svg>
  )
}
