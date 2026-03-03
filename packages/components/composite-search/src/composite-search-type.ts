import type { RenderFunction } from 'vue'

export interface TmCompositeSearchFieldItem {
  type: 'input' | 'select'
  label: string | RenderFunction // 展示的字段
  field: string
  placeholder?: string // 输入框的提示
  // select 的选项
  filters?: {
    label: string
    value: string
  }[]
  // 是否多选
  multiple?: boolean
}

export interface TmCompositeSearchProps {
  searchFields: TmCompositeSearchFieldItem[]
  onSearch?: (value: TmSearchPayload) => void
}

export interface TmInputSearchPayload {
  value: string
  fieldItem: TmCompositeSearchFieldItem & { type: 'input' }
  label: string
}

export interface TmSelectSearchPayload {
  value:
    | string
    | number
    | boolean
    | Record<string, unknown>
    | (string | number | boolean | Record<string, unknown>)[]
  fieldItem: TmCompositeSearchFieldItem & { type: 'select' }
  label: string | string[]
}

export type TmSearchPayload = TmInputSearchPayload | TmSelectSearchPayload

export type TmSearchPayloadValue = TmSearchPayload['value']
