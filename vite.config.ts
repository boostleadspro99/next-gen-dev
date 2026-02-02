import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import topLevelAwait from "vite-plugin-top-level-await";
import wasm from "vite-plugin-wasm";

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        react(),
        tailwindcss(),
        wasm(),
        topLevelAwait()
      ],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        chunkSizeWarningLimit: 800, // Set to 800 kB to catch very large chunks
        rollupOptions: {
              output: {
            manualChunks(id) {
              // Separate large dependencies into their own chunks
              if (id.includes('node_modules')) {
                // Split three.js into its own chunk
                if (id.includes('three')) {
                  return 'vendor-three';
                }
                // Split Firebase into smaller chunks
                if (id.includes('firebase')) {
                  if (id.includes('firestore')) {
                    return 'vendor-firebase-firestore';
                  }
                  if (id.includes('auth')) {
                    return 'vendor-firebase-auth';
                  }
                  if (id.includes('database')) {
                    return 'vendor-firebase-database';
                  }
                  return 'vendor-firebase-core';
                }
                // Split React core packages into their own chunk
                // Be specific to avoid circular dependencies
                if (id.includes('node_modules/react/') || 
                    id.includes('node_modules/react-dom/') ||
                    id.includes('node_modules/scheduler/') ||
                    id.includes('node_modules/@remix-run/router') ||
                    id.includes('node_modules/react-router') ||
                    id.includes('node_modules/react-router-dom')) {
                  return 'vendor-react';
                }
                // Split icon library
                if (id.includes('lucide-react')) {
                  return 'vendor-icons';
                }
                // Group remaining node_modules into vendor chunk
                return 'vendor';
              }
              // Split large local components if needed
              if (id.includes('components/') && (id.includes('Three') || id.includes('3D'))) {
                return 'components-3d';
              }
            }
          }
        }
      }
    };
});
