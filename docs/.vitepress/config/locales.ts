import type { LocaleConfig } from 'vitepress'
import { languages } from '../utils/lang'
import { getNavByLang } from './nav'
import { getSidebarByLang } from './sidebar'
import { getDescriptionByLang } from './description'

export const getLocales = (): LocaleConfig => {
  const locales: LocaleConfig = {}
  languages.forEach((lang: string) => {
    locales[lang] = {
      label: lang,
      description: getDescriptionByLang(lang),
      themeConfig: {
        nav: getNavByLang(lang),
        sidebar: getSidebarByLang(lang),
      },
    }
  })
  return locales
}
