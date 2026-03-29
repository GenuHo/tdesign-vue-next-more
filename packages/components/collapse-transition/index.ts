import { withInstall } from '@tdesign-vue-next-more/utils'
import type { SFCWithInstall } from '@tdesign-vue-next-more/utils'
import _TmCollapseTransition from './src/collapse-transition.vue'

export const TmCollapseTransition: SFCWithInstall<
  typeof _TmCollapseTransition
> = withInstall(_TmCollapseTransition)
export default TmCollapseTransition

export * from './src/instance'
