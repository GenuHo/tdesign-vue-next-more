import { withInstall } from '@tdesign-vue-next-more/utils'
import type { SFCWithInstall } from '@tdesign-vue-next-more/utils'
import _TmTable from './src/table.tsx'

export const TmTable: SFCWithInstall<typeof _TmTable> = withInstall(_TmTable)
export default TmTable

export * from './src/hooks'

export * from './src/utils'

export * from './src/instance'

export * from './src/table-type'
