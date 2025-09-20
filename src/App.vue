<template>
  <!-- Badge horario -->
  <div :class="['badge', abierto ? 'ok' : 'off']">
    {{ abierto ? 'ABIERTO' : 'CERRADO' }} • 15:00–21:00 (Llallagua)
  </div>

  <!-- Hero SOLO fuera de Inicio -->
  <header v-if="!isHome" class="hero">
    <div class="hero-card">
      <!-- quitamos el logo aquí para no duplicar -->
      <h1 class="brand title" style="margin:6px 0 0">Pollos Dumbo</h1>
      <p class="subtitle">¡El mejor pollo de Llallagua!</p>

      <nav class="actions">
        <RouterLink class="btn btn-light" to="/">Inicio</RouterLink>
        <RouterLink class="btn btn-dark" to="/menu">Ver Menú</RouterLink>
        <RouterLink class="btn btn-success" to="/pedido">Hacer Pedido</RouterLink>
      </nav>
    </div>
  </header>

  <!-- Contenido de cada vista -->
  <main class="container">
    <RouterView />
  </main>

  <footer style="text-align:center; padding:14px 10px 28px; color:#6b7280">
    © {{ year }} Pollos Dumbo • Llallagua
  </footer>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'

const year = new Date().getFullYear()
const route = useRoute()
const isHome = computed(() => route.path === '/')  // si estás en Inicio, ocultamos el hero

const abierto = ref(false)
onMounted(()=>{
  const toMin = s => { const [h,m]=s.split(':').map(Number); return h*60+m }
  const now = new Date()
  const mins = now.getHours()*60 + now.getMinutes()
  abierto.value = mins >= toMin('15:00') && mins <= toMin('21:00')
})
</script>