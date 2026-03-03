import type {
  TmSearchPayload,
  TmSearchPayloadValue,
} from './composite-search-type'

export interface TmCompositeSearchChangeValue {
  tags: TmSearchPayload[]
  searchParams: Record<string, TmSearchPayloadValue>
}

export interface TmCompositeSearchTagsProps {
  onChange?: (value: TmCompositeSearchChangeValue) => void
}
