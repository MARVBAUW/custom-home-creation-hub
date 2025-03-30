
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Ensure proper handling of static files
  publicDir: 'public',
  
  // Add explicit configuration for serving XML files with the correct content type
  server: {
    port: 8080,
    fs: {
      // Allow serving files from the project root
      allow: ['.'],
    },
  },
  
  // Configure path aliases without modifying tsconfig.node.json
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
