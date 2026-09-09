import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      webp: { quality: 82, effort: 6 },
      png:  { quality: 82 },
      jpg:  { quality: 82 },
      jpeg: { quality: 82 },
    }),
  ],
})
