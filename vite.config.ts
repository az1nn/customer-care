import federation from '@originjs/vite-plugin-federation';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'templateApp',
      filename: 'remoteEntry.js',
      exposes: {
        './TemplateApp': './src/App',
      },
      shared: ['react', 'react-dom', 'react-router-dom'],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'mondrian-react': path.resolve(
        __dirname,
        'src/components/mondrian-react-compat'
      ),
    },
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: true,
    cssCodeSplit: false,
  },
});
