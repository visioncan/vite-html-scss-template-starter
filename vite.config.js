import path from 'path'
import glob from 'fast-glob'
import { defineConfig } from 'vite'
import { fileURLToPath } from 'url'

export default defineConfig({
  server: {
    port: 3000
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  css: {
    devSourcemap: true // sourcemap
  },
  base: '',
  build: {
    rollupOptions: {
      output: {
        // assetFileNames: 'assets/[name][extname]', // 不帶版號
        // chunkFileNames: 'assets/[name].js'
      },
      input: Object.fromEntries(
        glob
          .sync(['./*.html', './pages/**/*.html'])
          .map(file => [
            path.relative(__dirname, file.slice(0, file.length - path.extname(file).length)),
            fileURLToPath(new URL(file, import.meta.url))
          ])
      )
    }
  }
})
