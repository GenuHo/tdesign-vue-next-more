<template>
  <div class="example-basic">
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
    type: 'input',
    name: 'name',
    field: 'name',
    placeholder: 'please input name',
  },
]
</script>
