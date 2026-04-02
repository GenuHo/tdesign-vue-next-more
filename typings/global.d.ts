declare module 'vue' {
  export interface GlobalComponents {
    TmButtonDropdown: (typeof import('tdesign-vue-next-more'))['TmButtonDropdown']
  }
}

export {}
