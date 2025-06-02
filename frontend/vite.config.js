import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    proxy: {
      '/auth': {
        target: `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}`, 
        changeOrigin: true, 
      },
    },
  },
})
