<template>
  <nav class="navbar">
    <div class="left-side">
      <t-space style="height: 100%" :align="'center'">
        <t-link hover="color" href="/" class="home-link">
          <img
            alt="logo"
            src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/dfdba5317c0c20ce20e64fac803d52bc.svg~tplv-49unhts6dw-image.image"
          />
          <t-typography-title style="margin: 0" level="h5">
            Manage System
          </t-typography-title>
        </t-link>
        <menu-fold-icon
          v-if="appStore.device === 'mobile'"
          style="font-size: 22px; cursor: pointer"
          @click="toggleDrawerMenu"
        />
      </t-space>
    </div>
    <ul class="right-side"></ul>
  </nav>
</template>

<script lang="ts" setup>
import { defaultLayoutContextHelper } from './default-layout'
import { useAppStore } from '@/stores'

const appStore = useAppStore()

const { toggleDrawerMenu } = defaultLayoutContextHelper.inject()
</script>

<style lang="less" scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  height: 100%;
  background-color: var(--td-bg-color-container);
  border-bottom: 1px solid var(--td-border-level-1-color);

  .left-side {
    display: flex;
    align-items: center;
    padding-left: 20px;

    .home-link {
      display: flex;
      align-items: center;
      gap: 10px;
    }
  }
}
</style>
