import type {
  TmSearchPayload,
  TmSearchPayloadValue,
} from '@tdesign-vue-next-more/components'

export interface TmCompositeSearchChangeValue {
  tags: TmSearchPayload[]
  searchParams: Record<string, TmSearchPayloadValue>
}

export interface TmCompositeSearchTagsProps {
  onChange?: (value: TmCompositeSearchChangeValue) => void
}
