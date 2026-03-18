import { defineConfig } from 'vitepress'
import { getLocales } from './locales'
import { getNavByLang } from './nav'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: 'src',
  title: 'TMore',
  description: '基于 TDesign Vue3 的扩展组件库',
  // https://vitepress.dev/reference/default-theme-config
  themeConfig: {
    nav: getNavByLang('zh-cn'),
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
  },
  locales: getLocales(),
})
