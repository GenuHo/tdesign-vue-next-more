import type { EnhancedTableProps } from 'tdesign-vue-next'
import type { OwnKeysStrictUnionTuple } from '@tdesign-vue-next-more/utils'
import type { TmTableProps } from './table-type'

export const TM_TABLE_OWN_KEYS: OwnKeysStrictUnionTuple<
  TmTableProps,
  EnhancedTableProps,
  ['request', 'topRightButtons', 'topLeftButtonDropdown']
> = ['request', 'topRightButtons', 'topLeftButtonDropdown'] as const
