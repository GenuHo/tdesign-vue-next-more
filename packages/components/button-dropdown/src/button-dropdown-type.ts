import type {
  ButtonProps,
  DropdownProps,
  DropdownItemProps,
  TooltipProps,
} from 'tdesign-vue-next'

export interface TmButtonDropdownItem extends ButtonProps {
  children?: TmButtonDropdownItem[]
  // 如果这个按钮变成dropdown，这个属性会透传给对应的dropdown
  dropdownProps?: Omit<DropdownProps, 'onClick'>
  // 如果这个按钮变成dropdownItem，这个属性会透传给对应的dropdownItem
  dropdownItemProps?: Omit<DropdownItemProps, 'onClick'>
  tooltipProps?: TooltipProps
}

export interface TmButtonDropdownProps extends DropdownProps {
  max?: number
  buttons?: TmButtonDropdownItem[]
  moreButton?: Omit<TmButtonDropdownItem, 'onClick'> // 自动生成的更多按钮的相关配置
  buttonProps?: Omit<ButtonProps, 'onClick'> // 每个button的属性，会被buttons中的属性覆盖，这个的作用就是提前预设一下button的样式之类
}

export type TmButtonDropdownItemWithCustomOnClick<T> = {
  [K in keyof TmButtonDropdownItem]: K extends 'onClick'
    ? T
    : TmButtonDropdownItem[K]
}

export type TmButtonDropdownPropsWithCustomOnClick<T> = {
  [K in keyof TmButtonDropdownProps]: K extends 'buttons'
    ? TmButtonDropdownItemWithCustomOnClick<T>[]
    : TmButtonDropdownProps[K]
}
