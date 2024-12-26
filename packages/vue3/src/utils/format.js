/**
 * 将驼峰命名转换为短横线命名
 * @param {string} str - 要转换的字符串
 * @returns {string} - 转换后的字符串
 * @example
 * convertToKebabCase('addColumnAfter') // -> 'add-column-after'
 * convertToKebabCase('AddColumnBefore') // -> 'add-column-before'
 * convertToKebabCase('Bold') // -> 'bold'
 */
export const convertToKebabCase = (str) => {
  return str
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])([A-Z])(?=[a-z])/g, "$1-$2")
    .toLowerCase();
};
