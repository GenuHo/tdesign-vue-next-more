import type { DefaultTheme } from 'vitepress'
import { isExternalURL } from '../utils/url'
import navLocale from '../locale/pages/nav.json'
import { DEFAULT_LANG } from '../constants/lang'

export const getNavByLang = (lang: string): DefaultTheme.NavItem[] => {
  const nav = navLocale[lang as keyof typeof navLocale]
    ? navLocale[lang as keyof typeof navLocale]
    : navLocale[DEFAULT_LANG]
  return nav.map((item: any) => {
    return {
      ...item,
      link: isExternalURL(item.link) ? item.link : `/${lang}${item.link}`,
    }
  })
}
