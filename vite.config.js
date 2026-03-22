import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import process from 'node:process'

export default defineConfig(({ mode }) => {
  // تحميل متغيرات البيئة
  const env = loadEnv(mode, process.cwd(), '')

  // التحقق مما إذا كنا على Netlify أو أي بيئة استضافة جذرية أخرى
  // Netlify يضع متغير NETLIFY كـ true بشكل افتراضي في بيئة البناء
  const isNetlify = process.env.NETLIFY === 'true' || env.VITE_NETLIFY === 'true';

  return {
    plugins: [react()],
    // إذا كنت على Netlify استخدم '/' وإذا كنت على GitHub Pages استخدم اسم المستودع
    base: isNetlify ? '/' : '/thinkboard_website/',
    server: {
      port: 5173,
      host: true,
      open: true
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
      // تأكد من تنظيف المجلد قبل البناء
      emptyOutDir: true,
    }
  }
})