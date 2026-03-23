import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // يجب أن تكون '/' للعمل على Netlify
  build: {
    outDir: 'dist',
  }
})