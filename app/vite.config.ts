/// <reference types="vitest" />

import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [vue(), legacy()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: true, // listen on all interfaces (0.0.0.0) so Docker port mapping works
    port: 5173,
    strictPort: true,
    hmr: {
      host: 'localhost',
      clientPort: 5173,
    },
  },
})
