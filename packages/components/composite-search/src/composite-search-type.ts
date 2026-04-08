import type { RenderFunction } from 'vue'

/**
 * 该类型定义参考了 {@link https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/select/type.ts}
 * 原生的 select 组件的值类型可以是 SelectOption，但是这里我们不使用 SelectOption
 */
export type TmCompositeSearchSelectValue =
  | string
  | number
  | boolean
  | bigint
  | Array<string | number | boolean | bigint>

export interface TmCompositeSearchInputFieldItem {
  type: 'input'
  label: string | RenderFunction
  field: string
  placeholder?: string
}

export interface TmCompositeSearchSelectFieldItem {
  type: 'select'
  label: string | RenderFunction
  field: string
  placeholder?: string
  filters?: {
    label: string
    value: TmCompositeSearchSelectValue
  }[]
  multiple?: boolean
}

export type TmCompositeSearchFieldItem =
  | TmCompositeSearchInputFieldItem
  | TmCompositeSearchSelectFieldItem

export interface TmCompositeSearchProps {
  searchFields: TmCompositeSearchFieldItem[]
  onSearch?: (value: TmCompositeSearchPayload) => void
}

export interface TmCompositeSearchInputPayload {
  value: string
  label: string
  fieldItem: TmCompositeSearchInputFieldItem
}

export interface TmCompositeSearchSelectPayload {
  value: TmCompositeSearchSelectValue
  label: string | string[]
  fieldItem: TmCompositeSearchSelectFieldItem
}

export type TmCompositeSearchPayload =
  | TmCompositeSearchInputPayload
  | TmCompositeSearchSelectPayload

export type TmCompositeSearchPayloadValue = TmCompositeSearchPayload['value']
