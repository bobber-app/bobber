import { computed } from 'vue'
import { useTokenStore } from '@/stores/token'
import { useLogin } from '@/mutations/auth/login'
import { useRegister } from '@/mutations/auth/register'
import { useLogout } from '@/mutations/auth/logout'

export const useAuth = () => {
  const tokenStore = useTokenStore()

  // Get mutation and query composables
  const { login, isLoading: isLoggingIn, error: loginError } = useLogin()
  const { register, isLoading: isRegistering, error: registerError } = useRegister()
  const { logout, isLoading: isLoggingOut } = useLogout()

  // Computed properties
  const isAuthenticated = computed(() => tokenStore.isAuthenticated)
  const currentUser = computed(() => tokenStore.user)
  const token = computed(() => tokenStore.token)

  // Loading states
  const isLoading = computed(() => isLoggingIn.value || isRegistering.value || isLoggingOut.value)

  return {
    // State
    isAuthenticated,
    currentUser,
    token,
    isLoading,

    // Actions
    login,
    register,
    logout,

    // Loading states
    isLoggingIn,
    isRegistering,
    isLoggingOut,

    // Errors
    loginError,
    registerError,
  }
}
