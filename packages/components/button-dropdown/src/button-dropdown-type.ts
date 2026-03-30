import type {
  ButtonProps,
  DropdownProps,
  DropdownItemProps,
  TooltipProps,
} from 'tdesign-vue-next'

// 从类型中排除 onClick 属性，避免事件处理冲突
type WithoutOnClick<T> = Omit<T, 'onClick'>

/**
 * 按钮下拉项的配置接口
 * 继承自 ButtonProps，支持所有按钮属性
 */
export interface TmButtonDropdownItem extends ButtonProps {
  /** 子菜单项，用于创建下拉菜单 */
  children?: TmButtonDropdownItem[]

  /**
   * 下拉菜单属性配置
   * 当按钮作为下拉菜单触发器时，此属性将传递给 Dropdown 组件
   */
  dropdownProps?: WithoutOnClick<DropdownProps>

  /**
   * 下拉菜单项属性配置
   * 当按钮作为下拉菜单选项时，此属性将传递给 DropdownItem 组件
   */
  dropdownItemProps?: WithoutOnClick<DropdownItemProps>

  /** 悬浮提示属性配置 */
  tooltipProps?: TooltipProps
}

/**
 * 按钮下拉菜单组件属性接口
 * 继承自 DropdownProps
 */
export interface TmButtonDropdownProps {
  /** 最大显示按钮数量，超出部分自动收纳到"更多"菜单中 */
  max?: number

  /** 按钮数组，构成按钮组和下拉菜单项 */
  buttons?: TmButtonDropdownItem[]

  /** 更多按钮配置，用于配置自动生成的"更多"下拉按钮触发器 */
  moreButton?: WithoutOnClick<TmButtonDropdownItem>

  /**
   * 所有按钮的统一配置
   * 可预设按钮样式等基础属性，会被 buttons 中的单项配置覆盖
   */
  buttonProps?: WithoutOnClick<ButtonProps>
}

/**
 * 带自定义点击事件的按钮下拉菜单项类型
 * 允许为 onClick 提供特定类型的事件处理函数
 */
export type TmButtonDropdownItemWithCustomOnClick<T> = {
  [K in keyof TmButtonDropdownItem]: K extends 'onClick'
    ? T // 将 onClick 类型替换为自定义类型 T
    : TmButtonDropdownItem[K] // 其他属性保持原类型
}

/**
 * 带自定义点击事件的按钮下拉菜单属性类型
 * 对 buttons 数组中的每一项应用自定义点击事件类型
 */
export type TmButtonDropdownPropsWithCustomOnClick<T> = {
  [K in keyof TmButtonDropdownProps]: K extends 'buttons'
    ? TmButtonDropdownItemWithCustomOnClick<T>[] // 对 buttons 应用自定义 onClick 类型
    : TmButtonDropdownProps[K] // 其他属性保持原类型
}
