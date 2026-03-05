import type { OwnKeysStrictUnionTuple } from '@tdesign-vue-next-more/utils'
import type { TmButtonDropdownItem } from './button-dropdown-type'
import type { ButtonProps } from 'tdesign-vue-next'

export const TM_BUTTON_DROPDOWN_ITEM_OWN_KEYS: OwnKeysStrictUnionTuple<
  TmButtonDropdownItem,
  ButtonProps,
  ['children', 'dropdownProps', 'dropdownItemProps', 'tooltipProps']
> = ['children', 'dropdownProps', 'dropdownItemProps', 'tooltipProps'] as const
