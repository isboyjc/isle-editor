import { prefixClass } from "@isle-editor/core";

// https://tailwindcss.com/docs/customizing-colors
// picker standard colors
export const PICKER_STANDARD_COLORS = [
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
// picker base colors
export const PICKER_BASE_COLORS = [
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
// default colors
export const DEFAULT_COLORS = [
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
