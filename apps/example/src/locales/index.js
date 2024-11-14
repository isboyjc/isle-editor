import { createI18n } from 'vue-i18n'

import en from './en.json'
import zh from './zh.json'

export const LOCALE_OPTIONS = [
  { label: '中文', value: 'zh' },
  { label: 'English', value: 'en' }
]

const i18n = createI18n({
  legacy: false,
  allowComposition: true,
  locale: 'zh', // 默认显示语言
  fallbackLocale: 'zh', // 当前语言无法找到匹配的翻译时，使用的备选语言
  messages: {
    zh,
    en
  }
})

export default i18n
