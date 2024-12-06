import { prefixClass } from "@isle-editor/core";
import { ref } from "vue";

// https://tailwindcss.com/docs/customizing-colors
const pickerStandardColors = [
  "#f03e3e",
  "#f76707",
  "#f59f00",
  "#37b24d",
  "#1c7ed6",
  "#1098ad",
  "#ae3ec9",
  "#d6336c",
  "#495057",
];
const pickerBaseColors = [
  {
    name: "black",
    shades: ["#000000", "#212529", "#868e96", "#dee2e6", "#f1f3f5", "#ffffff"],
  },
  {
    name: "pink",
    shades: ["#a61e4d", "#c2255c", "#f06595", "#faa2c1", "#fcc2d7", "#ffdeeb"],
  },
  {
    name: "red",
    shades: ["#c92a2a", "#e03131", "#ff6b6b", "#ffa8a8", "#ffc9c9", "#ffe3e3"],
  },
  {
    name: "orange",
    shades: ["#d9480f", "#e8590c", "#ff922b", "#ffc078", "#ffd8a8", "#ffe8cc"],
  },
  {
    name: "yellow",
    shades: ["#e67700", "#f59f00", "#ffd43b", "#ffe066", "#ffec99", "#fff3bf"],
  },
  {
    name: "green",
    shades: ["#2b8a3e", "#2f9e44", "#51cf66", "#8ce99a", "#b2f2bb", "#d3f9d8"],
  },
  {
    name: "cyan",
    shades: ["#0b7285", "#0c8599", "#22b8cf", "#66d9e8", "#99e9f2", "#c5f6fa"],
  },
  {
    name: "blue",
    shades: ["#1864ab", "#1971c2", "#339af0", "#74c0fc", "#a5d8ff", "#d0ebff"],
  },
  {
    name: "purple",
    shades: ["#862e9c", "#9c36b5", "#cc5de8", "#e599f7", "#eebefa", "#f3d9fa"],
  },
];

const colors = [
  {
    name: "base",
    color: `var(--${prefixClass}-color-base)`,
    background: `var(--${prefixClass}-background-base)`,
  },
  {
    name: "gray",
    color: `var(--${prefixClass}-color-gray)`,
    background: `var(--${prefixClass}-background-gray)`,
  },
  {
    name: "purple",
    color: `var(--${prefixClass}-color-purple)`,
    background: `var(--${prefixClass}-background-purple)`,
  },
  {
    name: "red",
    color: `var(--${prefixClass}-color-red)`,
    background: `var(--${prefixClass}-background-red)`,
  },
  {
    name: "yellow",
    color: `var(--${prefixClass}-color-yellow)`,
    background: `var(--${prefixClass}-background-yellow)`,
  },
  {
    name: "blue",
    color: `var(--${prefixClass}-color-blue)`,
    background: `var(--${prefixClass}-background-blue)`,
  },
  {
    name: "green",
    color: `var(--${prefixClass}-color-green)`,
    background: `var(--${prefixClass}-background-green)`,
  },
  {
    name: "orange",
    color: `var(--${prefixClass}-color-orange)`,
    background: `var(--${prefixClass}-background-orange)`,
  },
  {
    name: "pink",
    color: `var(--${prefixClass}-color-pink)`,
    background: `var(--${prefixClass}-background-pink)`,
  },
  {
    name: "brown",
    color: `var(--${prefixClass}-color-brown)`,
    background: `var(--${prefixClass}-background-brown)`,
  },
];

// 获取所有颜色
export const getColors = () => {
  return colors;
};

// 获取所有标准颜色
export const getAllStandardColors = () => {
  return pickerStandardColors;
};

// 获取所有基础颜色
export const getPickerAllColors = () => {
  return pickerBaseColors;
};

// 获取所有基础颜色的扁平数组
export const getPickerAllColorsFlat = () => {
  return pickerBaseColors.reduce((acc, color) => {
    return acc.concat(color.shades);
  }, []);
};

// 获取特定色阶的所有颜色
export const getPickerColorsByShade = (shade) => {
  return pickerBaseColors
    .map((color) => {
      const found = color.shades.find((c) => c === shade);
      return found || null;
    })
    .filter(Boolean);
};

// 获取某个颜色系列的所有色阶
export const getPickerShadesByColor = (colorName) => {
  const color = pickerBaseColors.find((c) => c.name === colorName);
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
