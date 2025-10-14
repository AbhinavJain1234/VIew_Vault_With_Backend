import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1600
  },
  server: {
    proxy: {
      '/movies': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        bypass: (req) => {
          if (req.headers.accept && req.headers.accept.includes('text/html')) {
            return '/index.html'
          }
        }
      },
      '/tv': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        bypass: (req) => {
          if (req.headers.accept && req.headers.accept.includes('text/html')) {
            return '/index.html'
          }
        }
      }
    }
  }
})
