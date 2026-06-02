/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Formspree-Endpoint für das Kontaktformular (siehe .env.local). */
  readonly VITE_FORMSPREE_ENDPOINT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
