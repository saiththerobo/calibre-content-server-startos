import { i18n } from './i18n'
import { sdk } from './sdk'
import { uiPort } from './utils'

export const setInterfaces = sdk.setupInterfaces(async ({ effects }) => {
  const uiMulti = sdk.MultiHost.of(effects, 'ui-multi')
  const uiMultiOrigin = await uiMulti.bindPort(uiPort, {
    protocol: 'http',
  })
  const ui = sdk.createInterface(effects, {
    name: i18n('Web UI'),
    id: 'ui',
    description: i18n('The Calibre Content Server web interface for browsing and reading your ebook library'),
    type: 'ui',
    masked: false,
    schemeOverride: null,
    username: null,
    path: '',
    query: {},
  })

  const opds = sdk.createInterface(effects, {
    name: i18n('OPDS Catalog'),
    id: 'opds',
    description: i18n('OPDS feed URL — paste this into KOreader, Moon+ Reader, or any OPDS-compatible reading app'),
    type: 'api',
    masked: false,
    schemeOverride: null,
    username: null,
    path: '/opds',
    query: {},
  })

  const uiReceipt = await uiMultiOrigin.export([ui, opds])

  return [uiReceipt]
})
