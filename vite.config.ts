
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
    https: true, // Enable HTTPS in development
  },
  
  // Configure path aliases
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  
  // Configure proper MIME types for XML and handle routes correctly
  assetsInclude: ['**/*.xml', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg', '**/*.ico'],
  
  // Ensure the XML file and favicon files are served with the correct content type
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          // Check for XML files and favicon files
          if (assetInfo.name) {
            if (assetInfo.name.endsWith('.xml')) {
              return '[name][extname]';
            }
            if (assetInfo.name.includes('progineer-icon') || 
                assetInfo.name.includes('progineer-apple-touch-icon') || 
                assetInfo.name === 'site.webmanifest' || 
                assetInfo.name === 'progineer-favicon.ico' ||
                assetInfo.name === 'robots.txt') {
              return '[name][extname]';
            }
            // Handle image files in schemas directory
            if (/\.(png|jpg|jpeg|gif|svg)$/.test(assetInfo.name) && 
                assetInfo.name.includes('schemas')) {
              return 'images/[name][extname]';
            }
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    },
    // Ensure all files are properly handled with headers
    sourcemap: true,
  }
}))
