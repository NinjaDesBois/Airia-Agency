import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('@react-three') || id.includes('/three/')) return 'vendor-three'
          if (id.includes('/gsap/') || id.includes('/lenis/')) return 'vendor-gsap'
          if (id.includes('/i18next') || id.includes('react-i18next') || id.includes('i18next-browser-languagedetector')) return 'vendor-i18n'
          if (id.includes('/react/') || id.includes('/react-dom/')) return 'vendor-react'
        },
      },
    },
  },
})
