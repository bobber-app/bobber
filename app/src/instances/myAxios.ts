import axios from 'axios'
import { useRouter } from 'vue-router'

const myAxios = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api`,
  withCredentials: true,
  withXSRFToken: true,
})

myAxios.interceptors.response.use(
  (response) => response, // Return successful responses as-is
  async (error) => {
    // Handle common error cases
    const { response } = error

    if (!response) {
      // Network error or server not reachable
      console.error('Network Error: Server unreachable')
      // You could also use a notification system here
    } else {
      // Handle specific HTTP status codes
      switch (response.status) {
        case 401:
          // Unauthorized - handle auth errors (redirect to login, etc.)
          console.error('Authentication error')
          break
        case 403:
          // Forbidden
          await useRouter().push({ name: 'forbidden' })
          console.error('Permission denied')
          break
        case 404:
          // Not found
          console.error('Resource not found')
          break
        case 422:
          // Validation errors
          console.error('Validation error', response.data)
          break
        case 500:
          // Server errors
          console.error('Server error')
          break
        default:
          console.error(`API Error: ${response.status}`, response.data)
      }
    }

    // Return the error for further handling in individual requests
    return Promise.reject(error)
  },
)

// export and use in your code
export { myAxios }
