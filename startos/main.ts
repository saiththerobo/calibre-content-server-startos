import { i18n } from './i18n'
import { sdk } from './sdk'
import { storeJson } from './fileModels/store.json'
import { uiPort } from './utils'

export const main = sdk.setupMain(async ({ effects }) => {
  console.info(i18n('Starting Calibre Content Server'))

  const adminPassword = await storeJson.read((s) => s.adminPassword).const(effects)

  const mounts = sdk.Mounts.of()
    .mountVolume({ volumeId: 'main', subpath: null, mountpoint: '/config', readonly: false })
    .mountVolume({ volumeId: 'books', subpath: null, mountpoint: '/library', readonly: false })

  const calibreSub = await sdk.SubContainer.of(
    effects,
    { imageId: 'calibre' },
    mounts,
    'calibre-sub',
  )

  return sdk.Daemons.of(effects)
    .addOneshot('init-library', {
      subcontainer: calibreSub,
      exec: {
        command: [
          '/opt/calibre/calibre-debug', '-c',
          [
            'from calibre.db.legacy import LibraryDatabase',
            "LibraryDatabase('/library')",
          ].join('\n'),
        ],
      },
      requires: [],
    })
    .addOneshot('create-admin-user', {
      subcontainer: calibreSub,
      exec: {
        command: [
          '/opt/calibre/calibre-debug', '-c',
          [
            'from calibre.srv.users import UserManager',
            'import sys',
            "m = UserManager('/config/users.db')",
            "if not m.has_user('admin'):",
            '    m.add_user(sys.argv[1], sys.argv[2])',
          ].join('\n'),
          'admin',
          adminPassword ?? '',
        ],
      },
      requires: ['init-library'],
    })
    .addDaemon('primary', {
      subcontainer: calibreSub,
      exec: {
        command: [
          '/opt/calibre/calibre-server',
          '--port', String(uiPort),
          '--enable-auth',
          '--userdb', '/config/users.db',
          '--disable-use-bonjour',
          '/library',
        ],
      },
      ready: {
        display: i18n('Web Interface'),
        fn: () =>
          sdk.healthCheck.checkPortListening(effects, uiPort, {
            successMessage: i18n('The web interface is ready'),
            errorMessage: i18n('The web interface is not ready'),
          }),
        gracePeriod: 30_000,
      },
      requires: ['create-admin-user'],
    })
})
