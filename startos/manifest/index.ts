import { setupManifest } from '@start9labs/start-sdk'
import { long, short } from './i18n'

export const manifest = setupManifest({
  id: 'calibre-content-server',
  title: 'Calibre Content Server',
  license: 'GPL-3.0',
  packageRepo: 'https://github.com/saiththerobo/calibre-content-server-startos',
  upstreamRepo: 'https://github.com/kovidgoyal/calibre',
  marketingUrl: 'https://calibre-ebook.com/',
  donationUrl: 'https://calibre-ebook.com/donate',
  docsUrls: ['https://manual.calibre-ebook.com/server.html'],
  description: { short, long },
  volumes: ['main', 'books'],
  images: {
    calibre: {
      source: { dockerBuild: { workdir: '.' } },
      arch: ['x86_64', 'aarch64'],
    },
  },
  alerts: {
    install: null,
    update: null,
    uninstall: null,
    restore: null,
    start: null,
    stop: null,
  },
  dependencies: {},
})
