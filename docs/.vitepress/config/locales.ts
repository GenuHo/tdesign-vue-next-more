import type { LocaleConfig } from 'vitepress'
import { languages } from '../utils/lang'
import { getNavByLang } from './nav'
import { getSidebarByLang } from './sidebar'

export const getLocales = (): LocaleConfig => {
  const locales: LocaleConfig = {}
  languages.forEach((lang: string) => {
    locales[lang] = {
      label: lang,
      themeConfig: {
        nav: getNavByLang(lang),
        sidebar: getSidebarByLang(lang),
      },
    }
  })
  return locales
}
