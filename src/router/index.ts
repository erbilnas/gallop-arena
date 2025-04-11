import { createRouter, createWebHistory } from 'vue-router'
import HorseRaceGame from '../components/HorseRaceGame.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HorseRaceGame,
    },
  ],
})

export default router
