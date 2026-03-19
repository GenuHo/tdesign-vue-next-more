import path from 'node:path'
import { docSrcRoot } from './path'
import _languages from '../locale/languages.json'

export const languages = _languages

export const getLang = (id: string) => {
  return path.relative(docSrcRoot, id).split(path.sep)[0]
}
