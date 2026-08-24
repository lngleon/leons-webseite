/**
 * Zweiter Routen-Eintrag für DIESELBE öffentliche URL `/möglichkeiten`.
 * Rendert exakt dieselbe Seite wie `src/app/m%C3%B6glichkeiten/` (Re-Export,
 * kein zweiter Inhalt) – siehe den Kasten in docs/CURRENT-SCHEMA.md.
 *
 * Warum zwei Ordner: Next übernimmt statische Ordnernamen 1:1 in die
 * Route-Regex. Ob beim Request der percent-encodete Pfad (`/m%C3%B6glichkeiten`,
 * das senden Browser) oder der dekodierte (`/möglichkeiten`) am Next-Router
 * ankommt, hängt von der Schicht davor ab – lokal unter `next start` ist es der
 * encodete, auf Vercels Routing-Layer ist es nicht garantiert (der alte
 * statische Vite-Build lief dort mit einem RAW-Umlaut-Ordner, dort wurde also
 * irgendwo dekodiert). Mit beiden Einträgen trifft JEDE Variante die richtige
 * Seite – für den Besucher gibt es weiterhin nur eine URL.
 *
 * Kanonisch (Sitemap): `/m%C3%B6glichkeiten`.
 * Inhalt/Metadaten werden bewusst NICHT dupliziert, sondern re-exportiert.
 */
export { default, metadata } from '../m%C3%B6glichkeiten/page'
