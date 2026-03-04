import type { EnhancedTableProps } from 'tdesign-vue-next'
import type { OmitKeysToTuple } from '@tdesign-vue-next-more/utils'
import type { TmTableProps } from './table-type'

export const TM_TABLE_OWN_KEYS: OmitKeysToTuple<
  TmTableProps,
  EnhancedTableProps
> = ['request', 'topRightButtons', 'topLeftButtonDropdown'] as const
