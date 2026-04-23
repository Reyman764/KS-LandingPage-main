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

  // Preview server mirrors a real CDN response
  preview: {
    headers: {
      'Cache-Control': 'public, max-age=31536000, immutable', // 1 year for hashed assets
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    },
  },
})
