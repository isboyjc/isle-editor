import Locales from 'i18next'
import zhCN from './zh-CN.json'
import en from './en.json'

const NS = 'translation'

Locales.init({
  lng: 'zh-CN',
  // debug: true,
  resources: {}, 
})
addLocale('zh-CN', zhCN)
addLocale('en', en)

export function addLocale(lng, resources) {
  Locales.addResourceBundle(lng, NS, resources, true, true)
}

export function changeLocale(lng) {
  Locales.changeLanguage(lng)
}

export function getLocale(lng) {
  return Locales.getResourceBundle(lng, NS)
}

export const t = Locales.t.bind(Locales)

export const te = Locales.exists.bind(Locales)

export default Locales