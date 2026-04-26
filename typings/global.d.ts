declare module 'vue' {
  export interface GlobalComponents {
    TmButtonDropdown: (typeof import('tdesign-vue-next-more'))['TmButtonDropdown']
    TmCollapseTransition: (typeof import('tdesign-vue-next-more'))['TmCollapseTransition']
    TmCompositeSearch: (typeof import('tdesign-vue-next-more'))['TmCompositeSearch']
    TmCompositeSearchTags: (typeof import('tdesign-vue-next-more'))['TmCompositeSearchTags']
  }
}

export {}
