
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
  },
  
  // Configure path aliases
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  
  // Configure proper MIME types for XML and handle routes correctly
  assetsInclude: ['**/*.xml'],
  
  // Ensure the XML file is served with the correct content type
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          // Vérifier si name existe et s'il se termine par .xml
          if (assetInfo.name && assetInfo.name.endsWith('.xml')) {
            return '[name][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    },
  }
}))
