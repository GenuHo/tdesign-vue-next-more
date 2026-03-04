import type { RenderFunction } from 'vue'
import type {
  EnhancedTableProps,
  TableRowData,
  PrimaryTableCol,
} from 'tdesign-vue-next'
import type { TmButtonDropdownProps } from '@tdesign-vue-next-more/components'

export type TmTableCol<T extends TableRowData = TableRowData> =
  PrimaryTableCol<T> & {
    // 添加自定义属性
    tmTableConfig?: {
      // 是否开启后端搜索功能
      search?: boolean
      // 搜索字段，如果没有搜索字段，默认使用列的 dataIndex
      searchField?: string
      // 搜索字段的label
      searchLabel?: string
      // 搜索输入框placeholder
      placeholder?: string
    }
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
