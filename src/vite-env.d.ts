/// <reference types="vite/client" />

declare interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_BASE_API: string
  readonly VITE_SERVE: string
}

declare interface ImportMeta {
  readonly env: ImportMetaEnv
}
