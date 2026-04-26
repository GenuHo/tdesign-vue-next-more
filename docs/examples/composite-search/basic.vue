<template>
  <div class="example-basic">
    <tm-composite-search
      :search-fields="searchFields"
      @search="handleSearch"
    ></tm-composite-search>
  </div>
</template>

<script setup lang="ts">
import type {
  TmCompositeSearchFieldItem,
  TmCompositeSearchPayload,
} from 'tdesign-vue-next-more'

const searchFields: TmCompositeSearchFieldItem[] = [
  {
    type: 'input',
    label: 'id',
    field: 'id',
    placeholder: 'please input id',
  },
  {
    type: 'input',
    label: 'name',
    field: 'name',
    placeholder: 'please input name',
  },
]

const handleSearch = (payload: TmCompositeSearchPayload) => {
  MessagePlugin.info(`${payload.fieldItem.label}: ${payload.value as string}`)
  console.log(payload.label === payload.value) // true
}
</script>
