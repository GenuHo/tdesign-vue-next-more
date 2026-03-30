import { defineConfig } from 'vitepress'
import { getLocales } from './locales'
import { getNavByLang } from './nav'
import { mdPlugin } from '../plugins/md-plugins'
import { markdownTransformPlugin } from '../plugins/vite-plugins/markdown-transform'
import Components from 'unplugin-vue-components/vite'
import { TDesignResolver } from '@tdesign-vue-next/auto-import-resolver'
import path from 'path'
import { docRoot } from '../utils/path'
import vueJsx from '@vitejs/plugin-vue-jsx'

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
    resolve: {
      alias: {
        'tdesign-vue-next-more': path.resolve(
          docRoot,
          '../packages/tdesign-vue-next-more',
        ),
      },
    },
    plugins: [
      vueJsx(),
      markdownTransformPlugin(),
      Components({
        dts: path.resolve(docRoot, 'components.d.ts'),
        resolvers: [
          TDesignResolver({
            library: 'vue-next',
            resolveIcons: true,
          }),
        ],
        include: [/\.vue$/, /\.vue\?vue/, /\.tsx$/, /\.jsx$/],
      }),
    ],
  },
})
