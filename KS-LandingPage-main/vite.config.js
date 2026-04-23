import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import compression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    react(),

    // Gzip — for servers that don't support brotli
    compression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024,
      deleteOriginFile: false,
      filter: /\.(js|css|html|json|svg)$/,
    }),

    // Brotli — 20-30% smaller than gzip, supported by all modern browsers
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024,
      deleteOriginFile: false,
      filter: /\.(js|css|html|json|svg)$/,
    }),
  ],

  build: {
    // Use esbuild for minification (faster) but terser for advanced dead-code elim
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,       // remove all console.* in production
        drop_debugger: true,      // remove debugger statements
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        passes: 2,                // two compression passes for smaller output
      },
      mangle: {
        safari10: true,           // avoid Safari 10 bug with let in for loops
      },
      format: {
        comments: false,          // strip all comments from output
      },
    },

    // CSS
    cssCodeSplit: false,          // single CSS file → fewer requests for a landing page
    cssMinify: true,

    // Chunk strategy
    rollupOptions: {
      output: {
        // Separate React runtime so it can be cached independently of app code
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

    // Report actual gzip sizes in terminal output
    reportCompressedSize: true,

    // Warn when any chunk > 400KB (default is 500KB)
    chunkSizeWarningLimit: 400,

    // Source maps for production debugging (switch to false to save bytes)
    sourcemap: false,

    // Target modern browsers — enables smaller output (no legacy polyfills)
    target: ['es2020', 'chrome90', 'firefox88', 'safari14', 'edge90'],
  },

  // Preview server mirrors a real CDN response.
  // Keep these in sync with public/_headers and vercel.json.
  preview: {
    headers: {
      'Cache-Control': 'public, max-age=31536000, immutable', // 1 year for hashed assets
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
