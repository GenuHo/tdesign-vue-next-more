import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { TDesignResolver } from '@tdesign-vue-next/auto-import-resolver'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.vue\.[tj]sx?\?vue/, // .vue (vue-loader with experimentalInlineMatchResource enabled)
        // /\.md$/, // .md
      ],
      imports: ['vue', 'vue-router', 'pinia'],
      resolvers: [
        TDesignResolver({
          library: 'vue-next',
        }),
      ],
      eslintrc: {
        enabled: true,
      },
    }),
    Components({
      resolvers: [
        TDesignResolver({
          library: 'vue-next',
          resolveIcons: true,
        }),
      ],
      include: [/\.vue$/, /\.vue\?vue/, /\.tsx$/, /\.jsx$/],
    }),
    vueJsx(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `@import "${resolve('src/assets/style/variables.less')}";`,
      },
    },
  },
})
