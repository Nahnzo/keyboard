import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      pages: '/src/pages',
      shared: '/src/shared',
      entities: '/src/entities',
      widgets: '/src/widgets',
      features: '/src/features',
      app: '/src/app',
    },
  },
})
