import { createRouter, createWebHistory } from 'vue-router'
import Inicio from '@/views/Inicio.vue'
import Menu from '@/views/Menu.vue'
import Pedido from '@/views/Pedido.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Inicio },
    { path: '/menu', component: Menu },
    { path: '/pedido', component: Pedido },
  ],
  scrollBehavior: () => ({ top: 0 })
})

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
