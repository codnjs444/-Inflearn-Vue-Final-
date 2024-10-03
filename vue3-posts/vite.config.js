import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      // '/posts' 경로로 들어오는 API 요청을 'http://localhost:5000'으로 프록시 처리
      '/posts': 'http://localhost:5000'
    }
  }
})
