import { defineStore } from 'pinia'
import type { UserState } from './types'

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    name: undefined,
  }),

  getters: {
    userInfo(state: UserState): UserState {
      return { ...state }
    },
  },

  actions: {},
})
