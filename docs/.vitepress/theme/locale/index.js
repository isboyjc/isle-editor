import en from "./en.js";
import zh from "./zh.js";

const hash = {
  en,
  zh,
};

export function t(locale, key, params = {}) {
  if (!hash[locale.split("-")[0]]) return "";
  let text = hash[locale.split("-")[0]][key];
  Object.keys(params).forEach((k) => {
    const regex = new RegExp(`{${k}}`, "g");
    text = text.replace(regex, params[k]);
  });
  return text;
}

export function routerPath(locale, path) {
  return (locale.split("-")[0] == "zh" ? "/zh" : "") + path;
}
