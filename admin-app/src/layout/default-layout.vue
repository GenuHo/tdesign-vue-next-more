<template>
  <t-layout class="layout" :class="{ mobile: appStore.hideMenu }">
    <div v-if="navbar" class="layout-navbar">
      <Navbar />
    </div>
    <t-layout>
      <t-layout>
        <t-aside
          v-show="!hideMenu"
          class="layout-aside"
          :width="`${menuWidth}px`"
          :style="{ paddingTop: navbar ? `${NAV_HEIGHT}px` : '' }"
        >
          <div class="menu-wrapper">
            <Menu />
          </div>
        </t-aside>
        <t-drawer
          v-if="hideMenu"
          :visible="drawerVisible"
          placement="left"
          :footer="false"
          @close="drawerClose"
          class="layout-menu-drawer"
        >
          <Menu />
        </t-drawer>
        <t-layout class="layout-content" :style="paddingStyle">
          <t-content>
            <PageLayout />
          </t-content>
        </t-layout>
      </t-layout>
    </t-layout>
  </t-layout>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import { useAppStore } from '@/stores'
import PageLayout from './page-layout.vue'
import {
  NAV_HEIGHT,
  defaultLayoutContextHelper,
  useResponsive,
} from './default-layout'
import Navbar from './navbar.vue'
import Menu from './menu.vue'

useResponsive(true)

const appStore = useAppStore()
const navbar = computed(() => appStore.navbar)
const hideMenu = computed(() => appStore.hideMenu)
const menuWidth = computed(() => {
  return appStore.menuCollapse ? 64 : appStore.menuWidth
})
const paddingStyle = computed(() => {
  const paddingLeft = !hideMenu.value
    ? { paddingLeft: `${menuWidth.value}px` }
    : {}
  const paddingTop = navbar.value ? { paddingTop: `${NAV_HEIGHT}px` } : {}
  return { ...paddingLeft, ...paddingTop }
})

const drawerVisible = ref(false)
const drawerClose = () => {
  drawerVisible.value = false
}
watch(
  () => hideMenu.value,
  () => {
    drawerClose()
  },
)
defaultLayoutContextHelper.provide({
  toggleDrawerMenu: () => {
    drawerVisible.value = !drawerVisible.value
  },
})
</script>

<style scoped lang="less">
.layout {
  width: 100%;
  height: 100%;
}

.layout-navbar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: @nav-size-height;
}

.layout-aside {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  height: 100%;
  transition: all 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
  border-right: 1px solid var(--td-gray-color-2);
}

.menu-wrapper {
  height: 100%;
  overflow: auto;
  overflow-x: hidden;
}

.layout-content {
  height: 100vh;
  overflow-y: hidden;
  transition: padding 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);

  .t-layout__content {
    padding: 20px;
    overflow-y: auto;
  }
}

:global(.layout-menu-drawer .t-drawer__body) {
  padding: 0;
}
</style>
