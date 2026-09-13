import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/2026-UIABD4-lecture/',
  plugins: [react()],
  server: {host:'127.0.0.1'},
  build: {sourcemap:false},
})

