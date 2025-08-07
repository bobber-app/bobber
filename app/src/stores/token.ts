import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { myAxios } from '@/instances/myAxios'

export const useTokenStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('auth_token'))

  const isAuthenticated = computed(() => !!token.value)

  const setToken = (newToken: string) => {
    token.value = newToken
    localStorage.setItem('auth_token', newToken)
    myAxios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
  }

  const clearAuth = () => {
    token.value = null
    localStorage.removeItem('auth_token')
    delete myAxios.defaults.headers.common['Authorization']
  }

  return {
    token,
    isAuthenticated,
    setToken,
    clearAuth,
  }
})
