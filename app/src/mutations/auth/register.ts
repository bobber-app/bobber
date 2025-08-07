import { defineMutation, useMutation, useQueryCache } from '@pinia/colada'
import { useTokenStore } from '@/stores/token'
import { RegisterPayload } from '@/types'
import { registerUser } from '@/api/auth'

export const useRegister = defineMutation(() => {
  const queryCache = useQueryCache()
  const tokenStore = useTokenStore()

  const {
    mutateAsync: register,
    isLoading,
    error,
    data,
  } = useMutation({
    mutation: async (userData: RegisterPayload) => {
      const response = await registerUser(userData)
      return response.data
    },
    onSuccess: (data) => {
      tokenStore.setToken(data.acces_token)
    },
    onError: (error) => {
      console.error('Registration failed:', error)
    },
    onSettled: async () => {
      await queryCache.invalidateQueries({ key: ['auth'] })
    },
  })

  return {
    register,
    isLoading,
    error,
    data,
  }
})
