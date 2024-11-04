import { presetAttributify, presetUno, defineConfig } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'
import transformerVariantGroup from '@unocss/transformer-variant-group'

export default defineConfig({
  shortcuts: {
    'bg-glass': 'blur-sm opacity-40',
    'flex-center': 'flex justify-center items-center',
    'flex-justify-center': 'flex justify-center',
    'flex-items-center': 'flex items-center'
  },
  rules: [
    // [/^p-(\d+)$/, match => ({ padding: `${match[1] / 4}rem` })],
  ],
  presets: [
    presetUno(),
    presetAttributify({
      prefix: 'uno-',
      prefixedOnly: true
    })
  ],
  // 主题
  theme: {
    colors: {
      primary: 'var(--isle-theme-primary)'
    },
    fontFamily: {
      // mono: 'var(--vt-font-family-mono)'
    }
  },
  transformers: [transformerDirectives(), transformerVariantGroup()]
})
