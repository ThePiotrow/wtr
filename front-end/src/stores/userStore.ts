import { defineStore } from 'pinia'
import { ModelUser } from '~/models/userModel'

export const StoreUser = defineStore({
  id: 'StoreUser',
  state: () => ({
    token: '',
    user: {} as ModelUser,
  }),

  getters: {
    getToken(): any {
      return this.token
    },
    getUser(): any {
      return this.user
    },
  },
  actions: {
    setToken(token: string) {
      this.token = token
    },
    setUser(user: ModelUser) {
      this.user = user
    },
  },
})
