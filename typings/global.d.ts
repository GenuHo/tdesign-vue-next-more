declare module 'vue' {
  export interface GlobalComponents {
    TmButtonDropdown: (typeof import('tdesign-vue-next-more'))['TmButtonDropdown']
    TmCollapseTransition: (typeof import('tdesign-vue-next-more'))['TmCollapseTransition']
  }
}

export {}
