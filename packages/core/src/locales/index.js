import Locales from "i18next";
import zh from "./zh.json";
import en from "./en.json";

const NS = "translation";

Locales.init({
  lng: "zh",
  // debug: true,
  resources: {},
});
addLocale("zh", zh);
addLocale("en", en);

export function addLocale(lng, resources) {
  Locales.addResourceBundle(lng, NS, resources, true, true);
}

export function changeLocale(lng) {
  Locales.changeLanguage(lng);
}

export function getLocale(lng) {
  return Locales.getResourceBundle(lng, NS);
}

export function t(key, options = {}) {
  const result = Locales.t(key, options);
  if (result === key) {
    return key.split(".").pop();
  }
  return result;
}

export const te = Locales.exists.bind(Locales);

export default Locales;
