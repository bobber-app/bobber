// mutations/auth/logout.ts
import { defineMutation, useMutation, useQueryCache } from '@pinia/colada'
import { logoutUser } from '@/api/auth'
import { useTokenStore } from '@/stores/token'

export const useLogout = defineMutation(() => {
  const queryCache = useQueryCache()
  const tokenStore = useTokenStore()

  const { mutateAsync: logout, isLoading } = useMutation({
    mutation: async () => {
      await logoutUser()
    },
    onSettled: async () => {
      // Clear auth state
      tokenStore.clearAuth()
      // Clear all cached queries
      await queryCache.invalidateQueries({ key: ['auth'] })
    },
  })

  return { logout, isLoading }
})
