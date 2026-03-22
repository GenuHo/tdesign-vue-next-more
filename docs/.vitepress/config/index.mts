import { defineConfig } from 'vitepress'
import { getLocales } from './locales'
import { getNavByLang } from './nav'
import { mdPlugin } from '../plugins/md-plugins'
import { markdownTransformPlugin } from '../plugins/vite-plugins/markdown-transform'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: 'src',
  title: 'TMore',
  // https://vitepress.dev/reference/default-theme-config
  themeConfig: {
    nav: getNavByLang('zh-cn'),
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
  },
  locales: getLocales(),
  markdown: {
    config: (md) => {
      mdPlugin(md)
    },
  },
  vite: {
    plugins: [markdownTransformPlugin()],
  },
})
