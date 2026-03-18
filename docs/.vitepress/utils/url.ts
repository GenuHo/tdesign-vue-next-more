export const EXTERNAL_URL_RE = /^(?:[a-z]+:|\/\/)/i

export const isExternalURL = (path: string): boolean =>
  EXTERNAL_URL_RE.test(path)
