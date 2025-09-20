<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import catalogo from '@/data/catalogo.js'

const img = {
  entero:  new URL('@/assest/img/entero.PNG', import.meta.url).href,
  broas:   new URL('@/assest/img/broaster.jpg', import.meta.url).href,
  frito:   new URL('@/assest/img/spiedo.jpg', import.meta.url).href,
  arroz:   new URL('@/assest/img/arroz.PNG', import.meta.url).href,
  papa:    new URL('@/assest/img/papa frita.PNG', import.meta.url).href, // si lo renombraste a papa-frita.png, cambia aquí
  fideo:   new URL('@/assest/img/fideo.PNG', import.meta.url).href,
  coca: {
    mini:    new URL('@/assest/img/coca_mini.jpg', import.meta.url).href,
    popular: new URL('@/assest/img/coca_popular.png', import.meta.url).href,
    mediana: new URL('@/assest/img/coca_popular.png', import.meta.url).href,
  },
  fanta: {
    mini:    new URL('@/assest/img/fanta_mini.jpg', import.meta.url).href,
    popular: new URL('@/assest/img/fanta_flaca.webp', import.meta.url).href,
    mediana: new URL('@/assest/img/fanta_flaca.webp', import.meta.url).href,
  },
  sprite: {
    mini:    new URL('@/assest/img/sprite_mini.jpg', import.meta.url).href,
    popular: new URL('@/assest/img/sprite_popular.webp', import.meta.url).href,
    mediana: new URL('@/assest/img/sprite_flaca.webp', import.meta.url).href,
  },
}

const productos = computed(() => [
  { key:'entero', nombre:'Pollo Entero Frito', desc:'Ideal para compartir.', img: img.entero, precio: catalogo.pollo.entero },
  { key:'broaster', nombre:'Pollo Broaster', desc:'Crujiente y sabroso.', img: img.broas, precio: catalogo.pollo.broaster },
  { key:'frito', nombre:'Pollo Frito Tradicional', desc:'Receta clásica de la casa.', img: img.frito, precio: catalogo.pollo.frito },
  { key:'arroz', nombre:'Porción de Arroz', desc:'Arroz blanco.', img: img.arroz, precio: catalogo.porciones.arroz },
  { key:'papa', nombre:'Papa Frita', desc:'Porción de papas.', img: img.papa, precio: catalogo.porciones.papa },
  { key:'fideo', nombre:'Porción de Fideo', desc:'Fideos al dente.', img: img.fideo, precio: catalogo.porciones.fideo },
])

const bebidas = computed(() => {
  const G = catalogo.bebidas.gaseosa
  const N = { mini:'Mini', popular:'Popular', mediana:'Mediana' }
  const M = { coca:'Coca-Cola', fanta:'Fanta', sprite:'Sprite' }
  const I = { coca: img.coca, fanta: img.fanta, sprite: img.sprite }
  const list = []
  Object.keys(G).forEach(m => {
    Object.keys(G[m]).forEach(t => {
      list.push({ nombre: `${M[m]} ${N[t]}`, img: I[m][t], precio: G[m][t] })
    })
  })
  return list
})
</script>

<template>
  <section class="container">
    <header class="menu-head">
      <h2 class="brand">Nuestro Menú</h2>
      <p>Pollo, porciones y refrescos</p>
    </header>

    <!-- Platos / porciones -->
    <div class="grid grid-3">
      <article v-for="p in productos" :key="p.key" class="menu-card">
        <div class="media"><img :src="p.img" :alt="p.nombre" /></div>
        <div class="body">
          <h3>{{ p.nombre }}</h3>
          <small class="muted">{{ p.desc }}</small>
          <div class="row">
            <b>Bs {{ p.precio.toFixed(2) }}</b>
            <RouterLink class="btn btn-primary" to="/pedido">Pedir</RouterLink>
          </div>
        </div>
      </article>
    </div>

    <!-- Gaseosas -->
    <h2 class="brand brand-green">Bebidas Gaseosas</h2>
    <div class="grid grid-3">
      <article v-for="b in bebidas" :key="b.nombre" class="menu-card">
        <div class="media contain"><img :src="b.img" :alt="b.nombre" /></div>
        <div class="body">
          <h3>{{ b.nombre }}</h3>
          <small class="muted">Refresco gaseoso</small>
          <div class="row">
            <b>Bs {{ b.precio.toFixed(2) }}</b>
            <RouterLink class="btn btn-light" to="/pedido">Pedir</RouterLink>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>
<style scoped>
.menu-head{ text-align:center; margin-bottom:10px; }
.menu-head .brand{ color:#ff6600; font-size:clamp(26px,4vw,40px); margin:0; }
.menu-head p{ margin:.25rem 0 0; color:#555; }

.brand-green{ color:#0f5132; text-align:center; margin:26px 0 10px; font-size:clamp(24px,4vw,36px); }

/* Todas las tarjetas con misma altura de imagen */
.media {
  width: 100%;
  height: 200px;         /* ← ajusta este valor si quieres más alto/bajo */
  background: #fff;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.media img {
  width: 100%;
  height: 100%;
  object-fit: cover;     /* recorta y rellena para que todas luzcan iguales */
  display: block;
  border-radius: 6px 6px 0 0;
}
</style>