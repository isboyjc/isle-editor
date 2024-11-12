
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import autoExternal from 'rollup-plugin-auto-external'
import sourcemaps from 'rollup-plugin-sourcemaps'
import copy from 'rollup-plugin-copy'
import sass from 'rollup-plugin-sass'
import vue from '@vitejs/plugin-vue'
import { nodeResolve } from '@rollup/plugin-node-resolve'
// import terser from '@rollup/plugin-terser'
import alias from '@rollup/plugin-alias'
import path from 'path'

export const baseConfig = ({ input = 'src/index.js', pkg }) => ({
  input,
  output: [
    {
      name: pkg.name,
      file: pkg.umd,
      format: 'umd',
      sourcemap: true,
      exports: 'named'
    },
    {
      name: pkg.name,
      file: pkg.main,
      format: 'cjs',
      interop: 'compat',
      sourcemap: true,
      exports: 'named'
    },
    {
      name: pkg.name,
      file: pkg.module,
      format: 'es',
      sourcemap: true,
      exports: 'named'
    }
  ],
  external: ['vue'],
  plugins: [
    alias({
      entries: [
        { find: '@', replacement: path.resolve(process.cwd(), 'src')  }
      ]
    }),
    autoExternal({
      packagePath: './package.json'
    }),
    sourcemaps(),
    resolve(),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      exclude: '../../node_modules/**'
    }),
    sass({
      // 输出单独的 css 文件
      output: 'dist/style.css',
      // 压缩输出
      outputStyle: 'compressed'
    }),
    nodeResolve(),
    vue({
      // vue 插件配置
      template: {
        isProduction: true,
        compilerOptions: {
          whitespace: 'condense'
        }
      }
    })
  ]
})

export const i18nConfig = ({ input = 'src/locales/index.js'}) => ({
  input,
  output: {
    dir: 'dist/locales',
    format: 'es',
    preserveModules: true,
  },
  plugins: [
    // 复制所有语言 JSON 文件到输出目录
    copy({
      targets: [
        {
          src: 'src/locales/*.json',
          dest: 'dist/locales'
        }
      ]
    })
  ]
})