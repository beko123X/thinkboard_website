import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import process from 'node:process'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  // Netlify يضيف متغير بيئة اسمه NETLIFY ويكون true تلقائياً أثناء البناء
  // نستخدم || لضمان التحقق من كلا المصدرين
  const isNetlify = process.env.NETLIFY === 'true' || env.VITE_IS_NETLIFY === 'true';

  return {
    plugins: [react()],
    // إذا اكتشفنا أننا على Netlify نستخدم '/'، وإلا نستخدم مسار GitHub Pages
    base: isNetlify ? '/' : '/thinkboard_website/',
    server: {
      port: 5173,
      host: true,
      open: true
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      sourcemap: false,
    }
  }
})