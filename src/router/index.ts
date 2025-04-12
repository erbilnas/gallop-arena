import GallopArena from '@/pages/gallop-arena'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: GallopArena,
    },
  ],
})

export default router
