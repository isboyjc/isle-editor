import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import UnoCSS from 'unocss/vite'

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: '9999',
    open: true,
    strictPort: true,
    cors: true
  },
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    UnoCSS({
      configFile: './unocss.config.js'
    }),
    AutoImport({
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
      imports: ['vue', 'pinia', 'vue-router'],
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true
      },
      resolvers: []
    }),
    Components({
      dirs: ['src/components/', 'src/views/'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        IconsResolver({
          prefix: 'icon',
          customCollections: ['isle']
        })
      ]
    }),
    Icons({
      compiler: 'vue3',
      customCollections: {
        isle: FileSystemIconLoader('src/assets/svg/isle', svg =>
          svg.replace(/^<svg /, '<svg fill="currentColor" ')
        )
      },
      autoInstall: true
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        sassOptions: {
          outputStyle: 'compressed'
        }
      }
    }
  }
})
