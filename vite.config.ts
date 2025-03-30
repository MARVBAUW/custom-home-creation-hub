
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
  
  // Configure server options
  server: {
    host: "::",
    port: 8080,
    fs: {
      // Allow serving files from the project root
      allow: ['.'],
    },
    middlewareMode: false,
    headers: {
      // Correct format for headers
      'Content-Type': 'text/xml; charset=utf-8',
    }
  },
  
  // Configure path aliases
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  
  // Configure proper MIME types for XML
  assetsInclude: ['**/*.xml'],
  
  // Add specific headers for XML files in preview mode
  preview: {
    headers: {
      // Correct format for headers
      'Content-Type': 'text/xml; charset=utf-8',
    }
  }
}))
