<template>
  <div class="search-tags">
    <t-space direction="vertical"
      ><div>search params: {{ searchParams }}</div>
      <tm-composite-search
        :search-fields="searchFields"
        @search="handleSearch"
      ></tm-composite-search>
      <tm-composite-search-tags
        ref="tmCompositeSearchTagsRef"
        @change="handleSearchChange"
      ></tm-composite-search-tags>
    </t-space>
  </div>
</template>

<script setup lang="ts">
import type {
  TmCompositeSearchFieldItem,
  TmCompositeSearchPayload,
  TmCompositeSearchChangeValue,
} from 'tdesign-vue-next-more'
import { ref, useTemplateRef } from 'vue'

const tmCompositeSearchTagsRef = useTemplateRef('tmCompositeSearchTagsRef')

const searchFields: TmCompositeSearchFieldItem[] = [
  {
    type: 'input',
    label: 'id',
    field: 'id',
    placeholder: 'please input id',
  },
  {
    type: 'single',
    label: 'gender',
    field: 'gender',
    placeholder: 'please select gender',
    list: [
      { label: 'male', value: 'male' },
      { label: 'female', value: 'female' },
    ],
  },
  {
    type: 'multiple',
    label: 'status',
    field: 'status',
    placeholder: 'please select status',
    list: [
      { label: 'normal', value: 1 },
      { label: 'disabled', value: 2 },
    ],
  },
]

const handleSearch = (payload: TmCompositeSearchPayload) => {
  tmCompositeSearchTagsRef.value?.addTags(payload)
}

const searchParams = ref<TmCompositeSearchChangeValue['searchParams']>({})
const handleSearchChange = (value: TmCompositeSearchChangeValue) => {
  searchParams.value = value.searchParams
}
</script>
