import { inject, onBeforeMount, onBeforeUnmount, onMounted, provide } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { useAppStore } from '@/stores'

const defaultLayoutSymbol = Symbol('defaultLayoutSymbol')
export interface DefaultLayoutContext {
  toggleDrawerMenu: () => void
}
const useProvideDefaultLayout = (provideData: DefaultLayoutContext) => {
  provide(defaultLayoutSymbol, {
    toggleDrawerMenu: provideData.toggleDrawerMenu,
  })
}
const useInjectDefaultLayout = (): DefaultLayoutContext => {
  return inject(defaultLayoutSymbol)!
}
export const defaultLayoutContextHelper = {
  provide: useProvideDefaultLayout,
  inject: useInjectDefaultLayout,
}

const WIDTH = 992
const queryDevice = () => {
  const rect = document.body.getBoundingClientRect()
  return rect.width - 1 < WIDTH
}
export const useResponsive = (immediate?: boolean) => {
  const appStore = useAppStore()
  const resizeHandler = () => {
    const isMobile = queryDevice()
    appStore.toggleDevice(isMobile ? 'mobile' : 'desktop')
    appStore.toggleMenu(isMobile)
  }
  const debounceResizeHandler = useDebounceFn(resizeHandler, 100)
  onMounted(() => {
    if (immediate) {
      resizeHandler()
    }
  })
  onBeforeMount(() => {
    window.addEventListener('resize', debounceResizeHandler)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('resize', debounceResizeHandler)
  })
}

// 对应的css变量是 @nav-size-height
export const NAV_HEIGHT = 60
