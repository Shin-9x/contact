import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// The dev server forwards /api to whatever answers on this port: `npm run dev:api`
// (Node mock) or `npm run dev:php` (the real endpoint, if PHP is installed).
const API_PORT = 8787

// `base: './'` keeps every emitted URL relative, so `dist/` can be dropped into the
// site root or any subfolder of an Apache/Aruba space without rebuilding.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      // Relative to the project root: one bundle per page, both at the site root.
      input: {
        main: 'index.html',
        privacy: 'privacy.html',
      },
    },
  },
  server: {
    proxy: {
      '/api': { target: `http://127.0.0.1:${API_PORT}`, changeOrigin: false },
    },
  },
})
