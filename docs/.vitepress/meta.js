import { version, keywords, author } from "../package.json";

const BASE = {
  site: "https://editor.islenote.com",
  github: "https://github.com/isboyjc/isle-editor",
  ico: "/img/site/logo.png",
  logo: "/img/site/logo.png",
  version,
  author,
  keywords,
};

const meta = {
  ...BASE,
  zh: {
    title: "岛屿编辑器",
    description:
      "开源 Web 编辑器，支持富文本、块、markdown 编辑，高效且开箱即用，基于 ProseMirror 和 TipTap。",
  },
  en: {
    title: "Isle Editor",
    description:
      "Open source web editor, supports rich text, block, markdown editing, efficient and out-of-the-box, based on ProseMirror and TipTap.",
  },
};

/**
 * 通过路径获取对象值
 * @param {string} path - 点号分隔的路径，如 'zh.description' 或 'en.site.url'
 * @param {object} obj - 要查询的对象，默认为 meta
 * @returns {any} 找到的值或 undefined
 */
export function getMeta(path, obj = meta) {
  if (!path) return obj;
  const keys = path.split(".");

  return keys.reduce((value, key) => {
    return value && typeof value === "object" ? value[key] : undefined;
  }, obj);
}
