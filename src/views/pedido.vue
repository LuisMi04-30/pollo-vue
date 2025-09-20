<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import catalogo from '@/data/catalogo.js'

const logo = new URL('@/assest/img/escudo.png', import.meta.url).href
const qr   = new URL('@/assest/img/QR.jpg', import.meta.url).href

const nombre = ref(''), direccion = ref(''), telefono = ref('')
const producto = ref(''), porcion = ref('')
const refrescoTipo = ref('')        // '', 'maracuya', 'limonada', 'gaseosa'
const gaseosaMarca = ref('coca')    // coca | fanta | sprite
const gaseosaTam = ref('mini')      // mini | popular | mediana
const pago = ref('caja')            // caja | qr
const qrRef = ref('')

function precioProducto(){ return catalogo.pollo[producto.value] || 0 }
function precioPorcion(){ return catalogo.porciones[porcion.value] || 0 }
function precioRefresco(){
  if (refrescoTipo.value === 'gaseosa'){
    const g = catalogo.bebidas.gaseosa
    return g[gaseosaMarca.value][gaseosaTam.value] || 0
  }
  return (catalogo.bebidas[refrescoTipo.value]) || 0
}
const total = computed(()=> Number(precioProducto()) + Number(precioPorcion()) + Number(precioRefresco()) )

function enviarPedido(){ enviarWhatsApp() }
function onTipoChange(){ if (refrescoTipo.value!=='gaseosa'){ gaseosaMarca.value='coca'; gaseosaTam.value='mini' } }

function enviarWhatsApp(){
  const nombres = {entero:'Pollo Entero Frito', broaster:'Pollo Broaster', frito:'Pollo Frito Tradicional'}
  const porcs   = {arroz:'Arroz', papa:'Papa frita', fideo:'Fideo', salsa:'Salsa'}
  let bebida='-', pRef=0
  if (refrescoTipo.value==='gaseosa'){
    const nTam={mini:'Mini',popular:'Popular',mediana:'Mediana'}
    const nMar={coca:'Coca-Cola',fanta:'Fanta',sprite:'Sprite'}
    bebida = `${nMar[gaseosaMarca.value]} ${nTam[gaseosaTam.value]}`
    pRef = precioRefresco()
  } else if (refrescoTipo.value) {
    const map = { maracuya: 'Refresco de maracuyá', limonada: 'Limonada' }
    bebida = map[refrescoTipo.value] || refrescoTipo.value
    pRef = precioRefresco()
  }
  const pagoTxt = pago.value === 'caja' ? 'Pagar en caja (efectivo)' : 'QR'
  const refPago = pago.value === 'qr' && qrRef.value ? `Ref QR: ${qrRef.value}` : ''

  const lineas = [
    '*Pedido – Llallagua*',
    `Cliente: ${nombre.value}`,
    `Dirección: ${direccion.value}`,
    `Tel: ${telefono.value}`,
    `Producto: ${nombres[producto.value] || '-'} (Bs ${precioProducto()})`,
    `Porción: ${porcs[porcion.value] || '-'} (Bs ${precioPorcion()})`,
    `Bebida: ${bebida} (Bs ${pRef})`,
    `Método de pago: ${pagoTxt}`,
    ...(refPago ? [refPago] : []),
    `Total: Bs ${total.value.toFixed(2)}`
  ].join('\n')

  window.open(`https://wa.me/59174148930?text=${encodeURIComponent(lineas)}`, '_blank')
}
</script>

<template>
  <section class="container">
    <div class="pedido-grid">
      <!-- Lateral -->
      <aside class="side card">
        <img :src="logo" alt="Logo" />
        <h2 class="brand logo-title">Pollos Dumbo</h2>
        <p>Atendemos de <b>15:00</b> a <b>21:00</b><br>Llallagua</p>
        <div class="side-actions">
          <RouterLink class="btn btn-light" to="/">Inicio</RouterLink>
          <RouterLink class="btn btn-dark" to="/menu">Ver Menú</RouterLink>
        </div>
      </aside>

      <!-- Formulario -->
      <article class="form card">
        <div class="form-head">Pedido de Pollos Dumbo</div>

        <form class="form-body" @submit.prevent="enviarPedido">
          <label>Nombre completo</label>
          <input v-model="nombre" required />

          <label>Dirección</label>
          <input v-model="direccion" required />

          <label>Teléfono</label>
          <input v-model="telefono" inputmode="numeric" />

          <label>Producto</label>
          <select v-model="producto" required>
            <option value="">Seleccione...</option>
            <option value="entero">Pollo Entero</option>
            <option value="broaster">Pollo Broaster</option>
            <option value="frito">Pollo Frito Tradicional</option>
          </select>
   <label>Porción</label>
          <select v-model="porcion">
            <option value="">Ninguna</option>
            <option value="arroz">Arroz</option>
            <option value="papa">Papa frita</option>
            <option value="fideo">Fideo</option>
            <option value="salsa">Salsa</option>
          </select>

          <label>Refresco</label>
          <select v-model="refrescoTipo" @change="onTipoChange">
            <option value="">Ninguno</option>
            <option value="maracuya">Refresco de maracuyá</option>
            <option value="limonada">Limonada</option>
            <option value="gaseosa">Gaseosa (elige marca y tamaño)</option>
          </select>

          <div v-if="refrescoTipo==='gaseosa'" class="two">
            <div>
              <label>Marca</label>
              <select v-model="gaseosaMarca">
                <option value="coca">Coca-Cola</option>
                <option value="fanta">Fanta</option>
                <option value="sprite">Sprite</option>
              </select>
            </div>
            <div>
              <label>Tamaño</label>
              <select v-model="gaseosaTam">
                <option value="mini">Mini (2.50)</option>
                <option value="popular">Popular (8.00)</option>
                <option value="mediana">Mediana (18.00)</option>
              </select>
            </div>
          </div>

          <label>Método de pago</label>
          <div class="pay">
            <label><input type="radio" value="caja" v-model="pago" /> Caja (efectivo)</label>
            <label><input type="radio" value="qr" v-model="pago" /> QR</label>
          </div>

          <div v-if="pago==='qr'" class="qr card">
            <strong>Pago por QR</strong>
            <p>Escanea el código y coloca una referencia si deseas.</p>
            <img :src="qr" alt="QR" />
            <input v-model="qrRef" placeholder="Referencia (opcional)" />
          </div>

          <div class="total">
            <span>Total estimado</span>
            <span>Bs {{ total.toFixed(2) }}</span>
          </div>

          <div class="actions">
            <button class="btn btn-primary" type="submit">Realizar pedido</button>
            <button class="btn btn-dark" type="button" @click="enviarWhatsApp">Enviar por WhatsApp</button>
          </div>
        </form>
      </article>
    </div>
  </section>
</template>

<style scoped>
.pedido-grid{
  display:grid; gap:24px;
  grid-template-columns: 1fr;       /* móvil */
}
@media (min-width: 880px){
  .pedido-grid{ grid-template-columns: 320px 1fr; }  /* desktop */
}

/* Lateral */
.side{
  padding:16px; text-align:center; display:flex; flex-direction:column; align-items:center; gap:8px;
  background:#fff8f0;
}
.side img{ width:140px; }
.logo-title{ color:#ff6600; margin:.25rem 0 0; }
.side p{ color:#555; margin:0 0 6px; }
.side-actions{ display:flex; gap:10px; flex-wrap:wrap; justify-content:center; }

/* Formulario */
.form{ overflow:hidden; }
.form-head{
  background:#ff6600; color:#fff; text-align:center; font-weight:800; padding:12px;
}
.form-body{ padding:16px; display:grid; gap:10px; }
.two{ display:grid; gap:10px; grid-template-columns:1fr 1fr; }
.pay{ display:flex; gap:14px; flex-wrap:wrap; }
.qr{ background:#f8fafc; border:1px solid #e5e7eb; padding:12px; }
.qr img{ max-width:100%; border-radius:8px; }
.total{
  background:#fff8e6; border:1px dashed #f59e0b; padding:10px 12px; border-radius:12px;
  display:flex; justify-content:space-between; font-weight:800;
}
.actions{ display:grid; gap:10px; }
</style>