import { createRouter, createWebHistory } from 'vue-router'
import tela1 from '../views/tela1.vue'
import tela2 from '../views/tela2.vue'
import tela3 from '../views/tela3.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'tela1',
      component: tela1
    },
    {
      path: '/tela2',
      name: 'tela2',
      component: tela2
    },
    {
      path: '/tela3',
      name: 'tela3',
      component: tela3
    }, 
  ]
})

export default router
