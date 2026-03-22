import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import process from 'node:process' // <--- This fixes the "unknown" error

export default defineConfig(({ mode }) => {
  // Now process.cwd() will work correctly
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    // If we are on Netlify, use the root. Otherwise, use your GitHub path.
    base: env.NETLIFY === 'true' ? '/' : '/thinkboard_website/',
    server: {
      port: 5173,
      host: true,
      open: true
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
    }
  }
})