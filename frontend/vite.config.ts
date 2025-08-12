import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      },
      includeAssets: ['/favicons/favicon.ico', '/favicons/apple-touch-icon.png'],
      manifest: {
        name: 'Game Journal',
        short_name: 'GameJournal',
        description: 'A journal to track your video game backlog and progress.',
        theme_color: '#7c3aed',
        background_color: '#eef2fb',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/favicons/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/favicons/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/favicons/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable', // Add a maskable icon
          },
        ],
      },
    }),
  ],
  cacheDir: 'node_modules/.vite',
  server: {
    allowedHosts: ['choice-joint-ghost.ngrok-free.app'],
    // Add the proxy for API calls during development
    proxy: {
      '/api/v1': {
        target: 'http://localhost:9000', // Assuming your backend runs on 5001
        changeOrigin: true,
      },
    },
  },
});
