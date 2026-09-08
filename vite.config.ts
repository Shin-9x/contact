import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// `base: './'` keeps every emitted URL relative, so `dist/` can be dropped into the
// site root or any subfolder of an Apache/Aruba space without rebuilding.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})
