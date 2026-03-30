<template>
  <div>
    <tm-button-dropdown :buttons="buttons" :max="2" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'

const buttons = ref([
  {
    content: '操作一',
    onClick: () => MessagePlugin.success('操作一被点击'),
  },
  {
    content: '操作二',
    onClick: () => MessagePlugin.success('操作二被点击'),
  },
  {
    content: '操作三',
    onClick: () => MessagePlugin.success('操作三被点击'),
  },
  {
    content: '操作四',
    onClick: () => MessagePlugin.success('操作四被点击'),
  },
])
</script>
