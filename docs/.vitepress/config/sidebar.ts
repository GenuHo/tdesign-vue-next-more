import type { DefaultTheme } from 'vitepress'
import componentSidebarLocale from '../locale/pages/component-sidebar.json'
import guideSidebarLocale from '../locale/pages/guide-sidebar.json'
import { DEFAULT_LANG } from '../constants/lang'

const getGuideSidebarByLang = (lang: string): DefaultTheme.SidebarItem[] => {
  const sidebar = guideSidebarLocale[lang as keyof typeof guideSidebarLocale]
    ? guideSidebarLocale[lang as keyof typeof guideSidebarLocale]
    : guideSidebarLocale[DEFAULT_LANG]
  return sidebar
}

const getComponentSidebarByLang = (
  lang: string,
): DefaultTheme.SidebarItem[] => {
  const sidebar = componentSidebarLocale[
    lang as keyof typeof componentSidebarLocale
  ]
    ? componentSidebarLocale[lang as keyof typeof componentSidebarLocale]
    : componentSidebarLocale[DEFAULT_LANG]
  return sidebar
}

export const getSidebarByLang = (lang: string): DefaultTheme.SidebarMulti => {
  return {
    [`/${lang}/guide`]: getGuideSidebarByLang(lang),
    [`/${lang}/component`]: getComponentSidebarByLang(lang),
  }
}
