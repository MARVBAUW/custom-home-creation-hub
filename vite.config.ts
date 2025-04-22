
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
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
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@/components/ui'],
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
  },
}));
