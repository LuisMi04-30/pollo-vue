// ANTES
// import { createRouter, createWebHistory } from 'vue-router'

// DESPUÉS
import { createRouter, createWebHashHistory } from 'vue-router'
import Inicio from '@/views/inicio.vue'
import Menu from '@/views/menu.vue'
import Pedido from '@/views/pedido.vue'

const routes = [
  { path: '/', component: Inicio, name: 'inicio' },
  { path: '/menu', component: Menu, name: 'menu' },
  { path: '/pedido', component: Pedido, name: 'pedido' },
]

export default createRouter({
  // ANTES: createWebHistory(import.meta.env.BASE_URL)
  history: createWebHashHistory(),   // 👈 compatible 100% con GitHub Pages
  routes,
})