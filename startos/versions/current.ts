import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '9.9.0:0',
  releaseNotes: {
    en_US: 'Update to Calibre 9.9.0.',
    es_ES: 'Actualización a Calibre 9.9.0.',
    de_DE: 'Update auf Calibre 9.9.0.',
    pl_PL: 'Aktualizacja do Calibre 9.9.0.',
    fr_FR: 'Mise à jour vers Calibre 9.9.0.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
