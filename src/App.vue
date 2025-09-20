<template>
  <!-- Estado de horario -->
  <div :class="['badge', abierto ? 'ok' : 'off']">
    {{ abierto ? 'ABIERTO' : 'CERRADO' }} • 15:00–21:00 (Llallagua)
  </div>

  <!-- Hero -->
  <header class="hero">
    <div class="hero-card">
      <img class="logo" :src="logo" alt="Pollos Dumbo" />
      <h1 class="brand title">Pollos Dumbo</h1>
      <p class="subtitle">¡El mejor pollo de Llallagua!</p>

      <nav class="actions">
        <RouterLink class="btn btn-light" to="/">Inicio</RouterLink>
        <RouterLink class="btn btn-dark" to="/menu">Ver Menú</RouterLink>
        <RouterLink class="btn btn-success" to="/pedido">Hacer Pedido</RouterLink>
      </nav>
    </div>
  </header>

  <!-- Contenido de las vistas -->
  <main class="container">
    <RouterView />
  </main>

  <footer style="text-align:center; padding:14px 10px 28px; color:#6b7280">
    © {{ year }} Pollos Dumbo • Llallagua
  </footer>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

const logo = new URL('@/assets/img/escudo.png', import.meta.url).href
const year = new Date().getFullYear()

const abierto = ref(false)
onMounted(()=>{
  const toMin = s => { const [h,m]=s.split(':').map(Number); return h*60+m }
  const now = new Date()
  const mins = now.getHours()*60 + now.getMinutes()
  abierto.value = mins >= toMin('15:00') && mins <= toMin('21:00')
})
</script>
