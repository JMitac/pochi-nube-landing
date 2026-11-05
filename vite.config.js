import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/pochi-nube-landing/',
  // Tanto el transform interno de Tailwind v4 (Lightning CSS) como el
  // minificador final de Vite (esbuild) fusionan mal algunas reglas CSS:
  // el `animation:none` de `@media (prefers-reduced-motion)` termina
  // mezclado con la regla base de `.fly-pochi,.fly-nube`, dejando a los
  // patitos sin animación SOLO en el build de producción (ver
  // src/animations.css para más detalle). El CSS del sitio ya es chico,
  // así que desactivamos la minificación de CSS en vez de arriesgar más
  // fusiones incorrectas.
  build: {
    cssMinify: false,
  },
  plugins: [react(), tailwindcss()],
})
