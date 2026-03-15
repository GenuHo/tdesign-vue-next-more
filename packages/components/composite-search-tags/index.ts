import { withInstall } from '@tdesign-vue-next-more/utils'
import type { SFCWithInstall } from '@tdesign-vue-next-more/utils'
import _TmCompositeSearchTags from './src/composite-search-tags.vue'

export const TmCompositeSearchTags: SFCWithInstall<
  typeof _TmCompositeSearchTags
> = withInstall(_TmCompositeSearchTags)
export default TmCompositeSearchTags

export * from './src/composite-search-tags-type'

export * from './src/instance'
