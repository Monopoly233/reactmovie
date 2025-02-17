import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/reactmovie/',  // 改成你的仓库名
  plugins: [react()],
})
