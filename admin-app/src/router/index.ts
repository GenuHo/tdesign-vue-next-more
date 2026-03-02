import { createRouter, createWebHistory } from 'vue-router'
import createRouteGuard from './guard'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue'),
    },
    {
      path: '/',
      redirect: '/home',
      component: () => import('@/layout/default-layout.vue'),
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('@/views/home/index.vue'),
        },
        {
          path: '/user-management',
          name: 'user-management',
          component: () => import('@/views/user-management/index.vue'),
        },
      ],
    },
  ],
})

createRouteGuard(router)

export default router
