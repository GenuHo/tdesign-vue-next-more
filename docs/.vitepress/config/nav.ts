import type { DefaultTheme } from 'vitepress'
import { localeRoot } from '../utils/path'
import path from 'path'
import { createRequire } from 'module'
import { isExternalURL } from '../utils/url'

const _require = createRequire(import.meta.url)

export const getNavByLang = (lang: string): DefaultTheme.NavItem[] => {
  const nav = _require(path.join(localeRoot, lang, '/pages/nav.json'))
  return nav.map((item: any) => {
    return {
      ...item,
      link: isExternalURL(item.link) ? item.link : `/${lang}${item.link}`,
    }
  })
}
