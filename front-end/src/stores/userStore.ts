import { defineStore } from 'pinia'

export const StoreUser = defineStore({
  id: 'StoreUser',
  state: () => ({
    token: '',
  }),

  getters: {
    getToken(): any {
      return this.token
    },
  },
  actions: {
    setToken(token: string) {
      this.token = token
    },
  },
})
