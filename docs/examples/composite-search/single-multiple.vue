<template>
  <div class="example-single-multiple">
    <t-space direction="vertical">
      <div>search params: {{ getSearchParams() }}</div>
      <tm-composite-search
        :search-fields="searchFields"
        :value="searchPayloads"
        @search="addSearchPayload"
        @reset="removeSearchPayload"
      ></tm-composite-search>
    </t-space>
  </div>
</template>

<script setup lang="ts">
import type { TmCompositeSearchFieldItem } from 'tdesign-vue-next-more'
import { useCompositeSearch } from 'tdesign-vue-next-more'

const {
  searchPayloads,
  addSearchPayload,
  removeSearchPayload,
  getSearchParams,
} = useCompositeSearch()

const searchFields: TmCompositeSearchFieldItem[] = [
  {
    type: 'input',
    name: 'id',
    field: 'id',
    placeholder: 'please input id',
  },
  {
    type: 'single',
    name: 'gender',
    field: 'gender',
    placeholder: 'please select gender',
    list: [
      { label: 'male', value: 'male' },
      { label: 'female', value: 'female' },
    ],
  },
  {
    type: 'multiple',
    name: 'status',
    field: 'status',
    placeholder: 'please select status',
    list: [
      { label: 'normal', value: 1 },
      { label: 'disabled', value: 2 },
    ],
  },
]
</script>
