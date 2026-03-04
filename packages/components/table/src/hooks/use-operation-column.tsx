import type {
  ButtonProps,
  PrimaryTableCellParams,
  PrimaryTableCol,
  TableRowData,
} from 'tdesign-vue-next'
import { useLocale } from '@tdesign-vue-next-more/hooks'
import type {
  TmButtonDropdownItem,
  TmButtonDropdownItemWithCustomOnClick,
  TmButtonDropdownProps,
  TmButtonDropdownPropsWithCustomOnClick,
  TmTableCol,
} from '@tdesign-vue-next-more/components'
import { TmButtonDropdown } from '@tdesign-vue-next-more/components'

const { t } = useLocale()

export const TM_OPERATION_COL_KEY = 'TM_OPERATION_COL_KEY'

export const useOperationColumn = <
  T extends TableRowData = TableRowData,
>(config: {
  column?: Omit<TmTableCol, 'cell'>
  buttonDropdown: TmButtonDropdownPropsWithCustomOnClick<
    (data: PrimaryTableCellParams<T>, e: MouseEvent) => void
  >
}) => {
  const operationButtonProps: ButtonProps = {
    variant: 'text',
    theme: 'primary',
  }
  const operationColumn: PrimaryTableCol = {
    title: t('tm.table.operation'),
    colKey: TM_OPERATION_COL_KEY,
    cell: (h, params) => {
      const wrapper = (): TmButtonDropdownProps => {
        const buttons = config.buttonDropdown.buttons
        const dfsWrapper = (
          buttons: TmButtonDropdownItemWithCustomOnClick<
            (data: PrimaryTableCellParams<T>, e: MouseEvent) => void
          >[],
        ): TmButtonDropdownItem[] => {
          const result: TmButtonDropdownItem[] = []
          buttons.forEach((item) => {
            result.push({
              ...item,
              onClick: (e: MouseEvent) => {
                item.onClick?.(
                  params as unknown as PrimaryTableCellParams<T>,
                  e,
                )
              },
            })
          })
          return result
        }
        return {
          ...config.buttonDropdown,
          buttons: buttons ? dfsWrapper(buttons) : undefined,
        }
      }
      return (
        <TmButtonDropdown
          {...wrapper()}
          buttonProps={
            config.buttonDropdown?.buttonProps || operationButtonProps
          }
        ></TmButtonDropdown>
      )
    },
    fixed: 'right',
    ...config?.column,
  }
  return {
    operationColumn,
  }
}
