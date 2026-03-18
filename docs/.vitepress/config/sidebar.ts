import type { DefaultTheme } from 'vitepress'
import { localeRoot } from '../utils/path'
import path from 'path'
import { createRequire } from 'module'

const _require = createRequire(import.meta.url)

const getGuideSidebarByLang = (lang: string): DefaultTheme.SidebarItem[] => {
  const sidebar = _require(
    path.join(localeRoot, lang, '/pages/guide-sidebar.json'),
  )
  return sidebar
}

const getComponentSidebarByLang = (
  lang: string,
): DefaultTheme.SidebarItem[] => {
  const sidebar = _require(
    path.join(localeRoot, lang, '/pages/component-sidebar.json'),
  )
  return sidebar
}

export const getSidebarByLang = (lang: string): DefaultTheme.SidebarMulti => {
  return {
    [`/${lang}/guide`]: getGuideSidebarByLang(lang),
    [`/${lang}/component`]: getComponentSidebarByLang(lang),
  }
}
