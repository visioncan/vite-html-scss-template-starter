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
    devSourcemap: true // 產生 sourcemap
  },
  base: '',
  build: {
    rollupOptions: {
      output: {
        assetFileNames: ({ name }) => {
          if (name === 'main.css') {
            return 'assets/style.css'
          }
          return 'assets/[name][extname]'
        }
      },
      input: Object.fromEntries([
        ...glob
          .sync(['./*.html', './pages/**/*.html'])
          .map((file) => [
            path.relative(__dirname, file.slice(0, file.length - path.extname(file).length)),
            fileURLToPath(new URL(file, import.meta.url))
          ]),
        ...glob
          .sync('./src/js/**/*.js')
          .map((file) => [
            path.relative(__dirname, file.slice(0, file.length - path.extname(file).length)),
            fileURLToPath(new URL(file, import.meta.url))
          ])
      ])
    }
  }
})
