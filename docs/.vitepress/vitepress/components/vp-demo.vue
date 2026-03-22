<template>
  <div>
    <slot name="source"></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  source: string
  path: string
  rawSource: string
  description: string
}>()

const source = computed(() => {
  return decodeURIComponent(props.source)
})
const path = computed(() => {
  return decodeURIComponent(props.path)
})
const rawSource = computed(() => {
  return decodeURIComponent(props.rawSource)
})
const description = computed(() => {
  return decodeURIComponent(props.description)
})
console.log(source.value)
console.log(path.value)
console.log(rawSource.value)
console.log(description.value)
</script>
