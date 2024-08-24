import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import { presetUno, presetIcons } from 'unocss'

export default defineConfig({
  plugins: [
    vue(),
    Unocss({
      theme: {
        colors: {
          soDeepGray: 'var(--so-deep-gray)',
          deepGray: 'var(--deep-gary)',
          midGray: 'var(--mid-gary)',
          lightGray: 'var(--light-gary)',
          myBlue: 'var(--my-blue)',
          myRed: 'var(--my-red)'
        }
      },
      presets: [
        presetUno({
          dark: 'class'
        }),
        presetIcons({
          scale: 1.4,
          cdn: 'https://esm.sh'
        })
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
