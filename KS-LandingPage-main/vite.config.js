import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import compression from 'vite-plugin-compression'
import { imagetools } from 'vite-imagetools'

export default defineConfig({
  plugins: [
    react(),
    // Auto-converts imported images on demand (e.g. `import url from './x.png?format=webp&w=800'`).
    // Existing references continue to work; opt-in per import for new ones.
    imagetools({
      defaultDirectives: (url) => {
        // When the import explicitly asks for ?optimize, default to webp + reasonable quality.
        if (url.searchParams.has('optimize')) {
          return new URLSearchParams({ format: 'webp', quality: '82' });
        }
        return new URLSearchParams();
      },
    }),
    compression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024,
      deleteOriginFile: false,
      filter: /\.(js|css|html|json|svg)$/,
    }),
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024,
      deleteOriginFile: false,
      filter: /\.(js|css|html|json|svg)$/,
    }),
  ],

  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 2,
      },
      mangle: { safari10: true },
      format: { comments: false },
    },

    // Split CSS per dynamic chunk → smaller above-the-fold CSS
    cssCodeSplit: true,
    cssMinify: 'lightningcss',

    // Inline small assets (icons) into JS/CSS to save HTTP requests
    assetsInlineLimit: 4096,

    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor-react';
          }
        },
        chunkFileNames:  'assets/js/[name]-[hash].js',
        entryFileNames:  'assets/js/[name]-[hash].js',
        assetFileNames:  'assets/[ext]/[name]-[hash].[ext]',
      },
    },

    reportCompressedSize: true,
    chunkSizeWarningLimit: 400,
    sourcemap: false,
    target: ['es2020', 'chrome90', 'firefox88', 'safari14', 'edge90'],
  },

  preview: {
    headers: {
      'Cache-Control': 'public, max-age=31536000, immutable',
      'Content-Security-Policy': [
        "default-src 'self'",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-ancestors 'none'",
        "object-src 'none'",
        "img-src 'self' data: https://www.google-analytics.com https://*.hotjar.com",
        "font-src 'self' data:",
        "style-src 'self' 'unsafe-inline'",
        "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://static.hotjar.com https://script.hotjar.com",
        "connect-src 'self' https://www.google-analytics.com https://*.analytics.google.com https://*.hotjar.com https://*.hotjar.io wss://*.hotjar.com",
        "frame-src https://vars.hotjar.com",
        'upgrade-insecure-requests',
      ].join('; '),
      'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'geolocation=(), microphone=(), camera=(), payment=(), usb=()',
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Resource-Policy': 'same-origin',
    },
  },
})
