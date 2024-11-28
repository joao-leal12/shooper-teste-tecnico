import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: { 
    port: 80
  },
  server: {
    host: '0.0.0.0',
    port: 80
  }
  
})
