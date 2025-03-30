
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { componentTagger } from "lovable-tagger"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  
  // Ensure proper handling of static files
  publicDir: 'public',
  
  // Add explicit configuration for serving XML files with the correct content type
  server: {
    host: "::",
    port: 8080,
    fs: {
      // Allow serving files from the project root
      allow: ['.'],
    },
  },
  
  // Configure path aliases
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
}))
