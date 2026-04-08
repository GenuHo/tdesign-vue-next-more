import type {
  TmCompositeSearchPayload,
  TmCompositeSearchPayloadValue,
} from '@tdesign-vue-next-more/components'

export interface TmCompositeSearchChangeValue {
  tags: TmCompositeSearchPayload[]
  searchParams: Record<string, TmCompositeSearchPayloadValue>
}

export interface TmCompositeSearchTagsProps {
  onChange?: (value: TmCompositeSearchChangeValue) => void
}
