import { ref } from "vue";
import {
  PICKER_STANDARD_COLORS,
  PICKER_BASE_COLORS,
  DEFAULT_COLORS,
} from "../constants";

// 获取所有颜色
export const getDefaultColors = () => {
  return DEFAULT_COLORS;
};

// 获取标准颜色
export const getPickerStandardColors = () => {
  return PICKER_STANDARD_COLORS;
};

// 获取所有基础颜色
export const getPickerColors = () => {
  return PICKER_BASE_COLORS;
};

// 获取所有基础颜色的扁平数组
export const getPickerColorsFlat = () => {
  return PICKER_BASE_COLORS.reduce((acc, color) => {
    return acc.concat(color.shades);
  }, []);
};

// 获取特定色阶的所有颜色
export const getPickerColorsByShade = (shade) => {
  return PICKER_BASE_COLORS.map((color) => {
    const found = color.shades.find((c) => c === shade);
    return found || null;
  }).filter(Boolean);
};

// 获取某个颜色系列的所有色阶
export const getPickerShadesByColor = (colorName) => {
  const color = PICKER_BASE_COLORS.find((c) => c.name === colorName);
  return color ? color.shades : [];
};

const recentColorsMap = new Map();
// 获取或创建一个最近使用颜色的响应式引用
export function getRecentColors(key = "default", maxItems = 9) {
  if (!recentColorsMap.has(key)) {
    const colors = ref([]);

    // 初始化时从 localStorage 读取数据
    const stored = localStorage.getItem(key);
    if (stored && Array.isArray(JSON.parse(stored))) {
      colors.value = JSON.parse(stored).slice(0, maxItems);
    }

    recentColorsMap.set(key, colors);
  }

  return recentColorsMap.get(key);
}

// 添加最近使用的颜色
export function addRecentColor(color, key = "default", maxItems = 9) {
  const recentColors = getRecentColors(key, maxItems);

  // 如果颜色已存在，先移除它
  const index = recentColors.value.indexOf(color);
  if (index > -1) {
    recentColors.value.splice(index, 1);
  }

  // 添加到开头
  recentColors.value.unshift(color);

  // 限制数量
  if (recentColors.value.length > maxItems) {
    recentColors.value = recentColors.value.slice(0, maxItems);
  }

  // 保存到 localStorage
  localStorage.setItem(key, JSON.stringify(recentColors.value));

  return recentColors;
}
