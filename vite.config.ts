
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [
      react(),
    ],
    publicDir: 'public',
    server: {
      host: '0.0.0.0',
      port: 3000,
      fs: {
        allow: ['..']
      },
      middlewareMode: false,
      https: false,
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
  };
});
