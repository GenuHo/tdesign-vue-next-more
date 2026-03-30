---
title: ButtonDropdown
---

# ButtonDropdown

Button组件、Dropdown组件的组合，还结合了Tooltip组件。常用于在表格左上区域的操作、表格操作列等。

当需要在一个区域显示多个按钮，但是按钮过多影响布局时，可以通过ButtonDropdown组件将多余的按钮折叠到"更多"选项中。

## 基础用法

组件从左到右依次排列

:::demo
button-dropdown/basic
:::

## 自动折叠

当按钮数量超过设置的最大数量时，多余按钮会自动折叠到"更多"按钮中

:::demo
button-dropdown/fold
:::

## 表格使用

:::demo 在表格操作列中使用按钮下拉菜单
button-dropdown/table
:::

## API

### TmButtonDropdownProps

| 参数        | 类型                                  | 默认值 | 说明                                                                        |
| ----------- | ------------------------------------- | ------ | --------------------------------------------------------------------------- |
| max         | Number                                | 3      | 最大显示按钮数量，超出部分自动收纳到"更多"菜单中                            |
| buttons     | TmButtonDropdownItem[]                | []     | 按钮数组，构成按钮组和下拉菜单项                                            |
| buttonProps | Omit<ButtonProps, 'onClick'>          | -      | 所有按钮的统一配置，可预设按钮样式等基础属性，会被 buttons 中的单项配置覆盖 |
| moreButton  | Omit<TmButtonDropdownItem, 'onClick'> | -      | 更多按钮配置，用于配置自动生成的"更多"下拉按钮触发器                        |

### TmButtonDropdownItem extends [ButtonProps](https://tdesign.tencent.com/vue-next/components/button?tab=api#button-props)

| 参数              | 类型                                                                                                                      | 默认值 | 说明                                                                           |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------ |
| children          | TmButtonDropdownItem[]                                                                                                    | []     | 子菜单项，用于创建下拉菜单                                                     |
| dropdownProps     | Omit<[DropdownProps](https://tdesign.tencent.com/vue-next/components/dropdown?tab=api#dropdown-props), 'onClick'>         | -      | 下拉菜单属性配置，当按钮作为下拉菜单触发器时，此属性将传递给 Dropdown 组件     |
| dropdownItemProps | Omit<[DropdownItemProps](https://tdesign.tencent.com/vue-next/components/dropdown?tab=api#dropdownitem-props), 'onClick'> | -      | 下拉菜单项属性配置，当按钮作为下拉菜单选项时，此属性将传递给 DropdownItem 组件 |
| tooltipProps      | [TooltipProps](https://tdesign.tencent.com/vue-next/components/tooltip?tab=api)                                           | -      | 悬浮提示属性配置                                                               |
