import type { TableRowData } from 'tdesign-vue-next'
import type { TmTableCol } from '../table-type'

export const createTableColWithColKey = <T extends TableRowData>(
  config: TmTableCol<T>,
  colKey: keyof T & string,
): TmTableCol<T> => {
  return {
    ...config,
    colKey,
  }
}
