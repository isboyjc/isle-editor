export function isMacOS() {
  if (typeof navigator === "undefined") return false;

  if (navigator.userAgentData?.platform) {
    return navigator.userAgentData.platform === "macOS";
  }

  return /macintosh|mac os x/i.test(navigator.userAgent);
}

export function isArray(value) {
  return Array.isArray(value);
}

export function isObject(value) {
  return value !== null && typeof value === "object" && !isArray(value);
}

export function isString(value) {
  return typeof value === "string";
}

/**
 * 判断是否为空（null、undefined、空字符串、空数组、空对象）
 * @param {*} value 要判断的值
 * @returns {boolean}
 */
export function isEmpty(value) {
  if (value === null || value === undefined) return true;
  if (isString(value)) return value.trim().length === 0;
  if (isArray(value)) return value.length === 0;
  if (isObject(value)) return Object.keys(value).length === 0;
  return false;
}
