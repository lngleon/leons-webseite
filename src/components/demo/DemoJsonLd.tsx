/**
 * Gibt ein schema.org-Objekt als JSON-LD aus.
 *
 * `<` wird escaped, damit der JSON-Inhalt das Script nicht vorzeitig schliessen
 * kann. Lag vorher inline in `GastroDemo.tsx`; seit die Seiten getrennt sind
 * (Restaurant auf der Startseite, Menu auf der Karte) brauchen es zwei Stellen.
 */
export default function DemoJsonLd({ schema }: { schema: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, '\\u003c'),
      }}
    />
  )
}
