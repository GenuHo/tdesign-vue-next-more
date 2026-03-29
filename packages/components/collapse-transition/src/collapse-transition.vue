<template>
  <transition :name="ns.b()" v-on="on">
    <slot></slot>
  </transition>
</template>

<script lang="ts" setup>
import {
  useCollapseAnimation,
  useNamespace,
} from '@tdesign-vue-next-more/hooks'

defineOptions({
  name: 'TmCollapseTransition',
})

const ns = useNamespace('collapse-transition')

const on = useCollapseAnimation()
</script>

<style lang="less">
@import url('@tdesign-vue-next-more/theme-chalk/collapse-transition.less');
</style>
