import { defineStore } from 'pinia'
import type { AppState } from './types'

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    theme: 'light', // 主题
    themeColor: '#165DFF', // 主题颜色
    navbar: true, // 顶栏显示
    menuCollapse: false, // 侧栏折叠
    menuWidth: 220, // 侧栏宽度
    hideMenu: false, // 侧栏隐藏
    device: 'desktop',
  }),

  getters: {
    appCurrentSetting(state: AppState): AppState {
      return { ...state }
    },
  },

  actions: {
    // Update app settings
    updateSettings(partial: Partial<AppState>) {
      this.$patch(partial)
    },
    toggleDevice(device: DeviceType) {
      this.device = device
    },
    toggleMenu(value: boolean) {
      this.hideMenu = value
    },
    // Change theme color
    toggleTheme(dark: boolean) {
      if (dark) {
        this.theme = 'dark'
        document.body.setAttribute('theme-mode', 'dark')
      } else {
        this.theme = 'light'
        document.body.removeAttribute('theme-mode')
      }
    },
  },
})
