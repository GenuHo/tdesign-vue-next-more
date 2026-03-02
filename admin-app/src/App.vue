<template>
  <t-config-provider :locale="zhCN">
    <router-view />
  </t-config-provider>
</template>

<script setup lang="ts">
import zhCN from 'tdesign-vue-next/es/locale/zh_CN'
</script>
