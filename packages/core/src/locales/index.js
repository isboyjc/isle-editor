let messages = {}
let currentLocale = 'zh-CN'

export function setLocaleMessages(locale, messageObject) {
  messages[locale] = messageObject;
}

export function setLocale(locale) {
  currentLocale = locale;
}

export function t(key, params = {}) {
  const message = key.split('.').reduce((obj, k) => obj?.[k], messages[currentLocale])
  if (!message) return key
  return message.replace(/\{(\w+)\}/g, (_, key) => params[key] || '')
}
