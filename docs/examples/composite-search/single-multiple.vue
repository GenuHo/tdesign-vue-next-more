<template>
  <div class="example-single-multiple">
    <tm-composite-search :search-fields="searchFields" @search="handleSearch">
    </tm-composite-search>
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
  MessagePlugin.info(`${payload.fieldItem.label}: ${payload.value}`)
  console.log(payload)
}
</script>
