
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        maintenance: resolve(__dirname, 'maintenance.html'),
        404: resolve(__dirname, '404.html'),
      },
    },
  },
});
