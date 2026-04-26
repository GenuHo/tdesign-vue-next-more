---
title: CompositeSearch
---

# CompositeSearch

## 基础使用

组合搜索可快速配置出来搜索功能。

:::warning
需要注意，`search` 事件中 `TmCompositeSearchPayload` 中 `label` 字段，在input搜索时和 `value` 字段值相同，在single和multiple筛选的时候就是对应 `OptionData` 的label值
:::

:::demo
composite-search/basic
:::

## 支持单选和多选

支持单选配置（`single`）和多选配置（`multiple`）。

:::demo
composite-search/single-multiple
:::

## 配合CompositeSearchTags使用

可以把两个组合搜索组件进行联动。

拆分组件的目的主要是为了方便不同的布局进行使用。

:::demo
composite-search/search-tags
:::

## API

### TmCompositeSearchProps

| 参数         | 类型                                      | 默认值 | 说明               |
| ------------ | ----------------------------------------- | ------ | ------------------ |
| searchFields | TmCompositeSearchFieldItem[]              | -      | 搜索字段配置项数组 |
| onSearch     | (value: TmCompositeSearchPayload) => void | -      | 搜索事件回调函数   |

### TmCompositeSearchFieldItem

搜索字段项的联合类型，可为以下三种类型之一：

**TmCompositeSearchInputFieldItem (输入框类型)**

| 参数        | 类型                     | 默认值 | 说明                           |
| ----------- | ------------------------ | ------ | ------------------------------ |
| type        | 'input'                  | -      | 字段类型，固定值 'input'       |
| label       | string \| RenderFunction | -      | 显示标签，支持字符串或渲染函数 |
| field       | string                   | -      | 对应数据字段名                 |
| placeholder | string                   | -      | 占位符文本                     |

**TmCompositeSearchSingleFieldItem (单选类型)**

| 参数        | 类型                     | 默认值 | 说明                           |
| ----------- | ------------------------ | ------ | ------------------------------ |
| type        | 'single'                 | -      | 字段类型，固定值 'single'      |
| label       | string \| RenderFunction | -      | 显示标签，支持字符串或渲染函数 |
| field       | string                   | -      | 对应数据字段名                 |
| placeholder | string                   | -      | 占位符文本                     |
| list        | OptionData[]             | -      | 选项数据数组                   |

**TmCompositeSearchMultipleFieldItem (多选类型)**

| 参数        | 类型                     | 默认值 | 说明                           |
| ----------- | ------------------------ | ------ | ------------------------------ |
| type        | 'multiple'               | -      | 字段类型，固定值 'multiple'    |
| label       | string \| RenderFunction | -      | 显示标签，支持字符串或渲染函数 |
| field       | string                   | -      | 对应数据字段名                 |
| placeholder | string                   | -      | 占位符文本                     |
| list        | OptionData[]             | -      | 选项数据数组                   |

### 事件

| 事件名 | 参数                                      | 描述                 |
| ------ | ----------------------------------------- | -------------------- |
| search | (value: TmCompositeSearchPayload) => void | 搜索触发时的回调函数 |
