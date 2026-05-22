import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-vendor';
          }
          if (id.includes('node_modules/framer-motion')) {
            return 'framer-motion';
          }
          if (id.includes('node_modules/gsap') || id.includes('node_modules/@gsap')) {
            return 'gsap';
          }
          if (id.includes('node_modules/lenis')) {
            return 'lenis';
          }
          if (id.includes('node_modules/react-icons')) {
            return 'react-icons';
          }
          if (
            id.includes('node_modules/three') ||
            id.includes('node_modules/@react-three')
          ) {
            return 'three-vendor';
          }
        },
      },
    },
  },
  optimizeDeps: {
    include: ['gsap', 'framer-motion', 'lenis', 'three', '@react-three/fiber', '@react-three/drei'],
  },
})

