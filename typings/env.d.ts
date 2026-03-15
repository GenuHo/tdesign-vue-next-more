import type { INSTALLED_KEY } from '@tdesign-vue-next-more/constants'

declare module 'vue' {
  export interface App {
    [INSTALLED_KEY]?: boolean
  }
}

export {}
