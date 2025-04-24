
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import { componentTagger } from "lovable-tagger";
import { compression } from 'vite-plugin-compression2';
import { exec } from 'child_process';

// Update browserslist database before build
if (process.env.NODE_ENV === 'production') {
  try {
    exec('npx update-browserslist-db@latest');
    console.log('Browserslist database updated successfully!');
  } catch (error) {
    console.warn('Failed to update browserslist database:', error);
  }
}

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    // Add compression plugin for production builds
    mode === 'production' && compression({
      include: [/\.(js|mjs|json|css|html)$/],
      threshold: 1024, // Only compress files larger than 1KB
    }),
  ].filter(Boolean),
  publicDir: 'public',
  server: {
    host: '::',
    port: 8080,
    fs: {
      allow: ['..']
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: '**/*.docx',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    cssCodeSplit: true,
    minify: 'terser', // Use Terser for better minification
    terserOptions: {
      compress: {
        drop_console: true,  // Remove console logs in production
        drop_debugger: true, // Remove debugger statements in production
      }
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Create separate chunks for better caching
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            } else if (id.includes('@radix-ui')) {
              return 'vendor-radix';
            } else if (id.includes('lucide')) {
              return 'vendor-lucide';
            } else if (id.includes('@tanstack')) {
              return 'vendor-tanstack';
            } else if (id.includes('recharts') || id.includes('chart.js')) {
              return 'vendor-charts';
            } else {
              return 'vendor-other';
            }
          }
          
          // Group UI components together
          if (id.includes('src/components/ui')) {
            return 'ui';
          }
          
          // Group pages together
          if (id.includes('src/pages')) {
            return 'pages';
          }
          
          // Keep common utilities separate
          if (id.includes('src/utils')) {
            return 'utils';
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss,
        autoprefixer,
      ],
    },
    // Minify CSS in production
    devSourcemap: true,
  },
  // Add split chunk optimization
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
  },
}));
