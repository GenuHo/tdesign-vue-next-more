import { readdirSync, statSync } from 'node:fs'
import path from 'node:path'
import { docRoot, localeRoot } from './path'

export const languages = readdirSync(localeRoot).filter((name) => {
  if (name.startsWith('.')) return false
  return statSync(path.join(localeRoot, name)).isDirectory()
})

export const getLang = (id: string) => {
  return path.relative(docRoot, id).split(path.sep)[0]
}
