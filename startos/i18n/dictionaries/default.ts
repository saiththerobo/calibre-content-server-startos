export const DEFAULT_LANG = 'en_US'

const dict = {
  // main.ts
  'Starting Calibre Content Server': 0,
  'Web Interface': 1,
  'The web interface is ready': 2,
  'The web interface is not ready': 3,

  // interfaces.ts
  'Web UI': 4,
  'The Calibre Content Server web interface for browsing and reading your ebook library': 5,

  // actions/getAdminCredentials.ts
  'Get Admin Credentials': 6,
  'Retrieve your Calibre admin username and password': 7,

  // init/initializeService.ts
  'Retrieve your admin credentials': 8,
} as const

/**
 * Plumbing. DO NOT EDIT.
 */
export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
