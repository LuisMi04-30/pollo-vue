<template>
  <section class="container center">
    <div class="inicio-page">
      <div class="inicio-header">
        <div class="logo-box">
          <img :src="logo" alt="Pollos Dumbo" class="logo" />
        </div>

        <h1>Pollos Dumbo</h1>
        <p class="slogan">¡El mejor pollo de Llallagua!</p>
        <p class="horario">Abierto • 15:00–21:00 (Llallagua)</p>
      </div>

      <div class="acciones">
        <RouterLink to="/menu" class="btn">Ver Menú</RouterLink>
        <RouterLink to="/pedido" class="btn pedido">Hacer Pedido</RouterLink>
      </div>

      <footer>© 2025 Pollos Dumbo - Llallagua</footer>
    </div>
  </section>
</template>

<script setup>
import logo from '@/assest/img/escudo.png'
</script>

<style scoped>
/* Fondo naranja en toda la página */
.container {
  background: #ff6600;   /* naranja principal */
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Caja central */
.inicio-page {
  text-align: center;
  background: #fff8f0; /* cuadro crema */
  padding: 30px 18px;
  border-radius: 12px;
  max-width: 640px;
  margin: 20px auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo-box {
  width: 180px;
  height: 180px;
  margin: 0 auto 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo {
  max-width: 100%;
  max-height: 100%;
  display: block;
  object-fit: contain;
  object-position: center;
}

h1 {
  font-size: 2em;
  margin: 10px 0;
  color: #ff6600;
}

.slogan {
  font-weight: bold;
  margin: 5px 0;
  color: #000;
}

.horario {
  font-size: 0.9em;
  color: #444;
}

.acciones {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin: 20px 0;
}

.btn {
  background: #ff6600;
  color: #fff;
  padding: 12px 20px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  transition: 0.2s;
}

.btn:hover {
  background: #e05500;
}

.btn.pedido {
  background: #4caf50;
}

.btn.pedido:hover {
  background: #3b8a3f;
}

footer {
  margin-top: 20px;
  font-size: 0.85em;
  color: #444;
}
</style>