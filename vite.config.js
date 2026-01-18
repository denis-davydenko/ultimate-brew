import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    svelte(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'script',
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.js',
      includeAssets: ['assets/icons/*.png', 'assets/icons/*.webp', '*.mp3', '*.webm'],
      devOptions: {
        enabled: true
      },
      manifest: {
        name: 'Ultimate Brew',
        short_name: 'Ultimate Brew',
        start_url: '/',
        scope: '/',
        description: 'App for brewing V60 coffee',
        display: 'standalone',
        orientation: 'portrait',
        theme_color: '#7f7571',
        background_color: '#7f7571',
        icons: [
          {
            src: '/assets/icons/icon-96x96.webp',
            sizes: '96x96',
            type: 'image/webp'
          },
          {
            src: '/assets/icons/icon-96x96.png',
            sizes: '96x96',
            type: 'image/png'
          },
          {
            src: '/assets/icons/icon-152x152.webp',
            sizes: '152x152',
            type: 'image/webp'
          },
          {
            src: '/assets/icons/icon-152x152.png',
            sizes: '152x152',
            type: 'image/png'
          },
          {
            src: '/assets/icons/icon-192x192.webp',
            sizes: '192x192',
            type: 'image/webp'
          },
          {
            src: '/assets/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/assets/icons/icon-384x384.webp',
            sizes: '384x384',
            type: 'image/webp'
          },
          {
            src: '/assets/icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png'
          },
          {
            src: '/assets/icons/icon-512x512.webp',
            sizes: '512x512',
            type: 'image/webp'
          },
          {
            src: '/assets/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{html,js,css,jpg,png,webp,mp3,webm,ico}'],
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [/^\/api/],
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ]
});
