import { defineMutation, useMutation, useQueryCache } from '@pinia/colada'
import { LoginPayload } from '@/types'
import { loginUser } from '@/api/auth'
import { useTokenStore } from '@/stores/token'

export const useLogin = defineMutation(() => {
  const queryCache = useQueryCache()
  const tokenStore = useTokenStore()

  const {
    mutateAsync: login,
    isLoading,
    error,
    data,
  } = useMutation({
    mutation: async (cred: LoginPayload) => {
      const response = await loginUser(cred)
      return response.data
    },
    onSuccess: (data) => {
      tokenStore.setToken(data.acces_token)
    },
    onError: (error) => {
      console.error('Login failed:', error)
    },
    onSettled: async () => {
      await queryCache.invalidateQueries({ key: ['auth'] })
    },
  })

  return {
    login,
    isLoading,
    error,
    data,
  }
})
