import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Ensure proper handling of static files
  publicDir: 'public',
  
  // Add explicit configuration for serving XML files with the correct content type
  server: {
    
    fs: {
      // Allow serving files from the project root
      allow: ['.'],
    },
  },
})
