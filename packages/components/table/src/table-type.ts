import type { RenderFunction } from 'vue'
import type {
  EnhancedTableProps,
  TableRowData,
  PrimaryTableCol,
} from 'tdesign-vue-next'
import type {
  TmButtonDropdownProps,
  TmCompositeSearchFieldItem,
} from '@tdesign-vue-next-more/components'
import type { PartialByKeys } from '@tdesign-vue-next-more/utils'

export type TmTableCol<T extends TableRowData = TableRowData> =
  PrimaryTableCol<T> & {
    searchConfig?: PartialByKeys<TmCompositeSearchFieldItem, 'field' | 'name'>
  }

export type TmTableTopRightButtonItem = {
  type: 'refresh' | 'reset' | string
  render?: RenderFunction
  onClick?: () => void
}

export interface TmTableProps<
  T extends TableRowData = TableRowData,
> extends Omit<EnhancedTableProps<T>, 'columns'> {
  // 表格请求接口
  request?: (params: any) => Promise<any>
  columns?: Array<TmTableCol<T>>
  topRightButtons?: ('refresh' | 'reset' | TmTableTopRightButtonItem)[]
  topLeftButtonDropdown?: TmButtonDropdownProps
}
