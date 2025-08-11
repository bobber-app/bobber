import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import { useTokenStore } from '@/stores/token'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to) => {
  const tokenStore = useTokenStore()

  if (to.meta.requiresAuth && !tokenStore.isAuthenticated) {
    return '/login'
  } else if (to.meta.requiresGuest && tokenStore.isAuthenticated) {
    return '/dashboard'
  }
})

export default router
