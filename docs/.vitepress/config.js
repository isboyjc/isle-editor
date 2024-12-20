import { defineConfig } from "vitepress";
import path from "path";
import { fileURLToPath } from "url";
import {
  containerPreview,
  componentPreview,
} from "@vitepress-demo-preview/plugin";

import UnoCSS from "unocss/vite";
import Components from "unplugin-vue-components/vite";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import { FileSystemIconLoader } from "unplugin-icons/loaders";

import { getMeta } from "./meta";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const resolve = (dir) =>
  dir ? path.resolve(__dirname, "../", dir) : __dirname;

export default defineConfig({
  sitemap: {
    hostname: getMeta("site"),
  },
  lastUpdated: true,
  ignoreDeadLinks: true,

  locales: {
    root: {
      label: "English",
      lang: "en",
      title: getMeta("en.title"),
      description: getMeta("en.description"),
      head: [
        ["meta", { name: "referrer", content: "no-referrer-when-downgrade" }],
        ["meta", { name: "keywords", content: getMeta("keywords") }],
        ["meta", { name: "author", content: getMeta("author") }],

        ["link", { rel: "shortcut icon", href: getMeta("ico") }],
        ["link", { rel: "icon", type: "image/x-icon", href: getMeta("ico") }],

        // webfont
        ["link", { rel: "dns-prefetch", href: "https://fonts.googleapis.com" }],
        ["link", { rel: "dns-prefetch", href: "https://fonts.gstatic.com" }],
        [
          "link",
          {
            rel: "preconnect",
            crossorigin: "anonymous",
            href: "https://fonts.googleapis.com",
          },
        ],
        [
          "link",
          {
            rel: "preconnect",
            crossorigin: "anonymous",
            href: "https://fonts.gstatic.com",
          },
        ],

        // og
        ["meta", { property: "og:type", content: "website" }],
        [
          "meta",
          { property: "og:description", content: getMeta("en.description") },
        ],
        ["meta", { property: "og:url", content: getMeta("site") }],
        ["meta", { property: "og:locale", content: "en" }],
      ],
      themeConfig: {
        nav: [
          {
            text: "Guide",
            items: [
              {
                text: "Getting Started",
                items: [
                  { text: "Introduction", link: "/guide/introduction" },
                  { text: "Installation", link: "/guide/installation" },
                  { text: "Quick Start", link: "/guide/quick-start" },
                ],
              },
            ],
          },
          { text: "Playground", link: "https://playground.islenote.com" },
          {
            text: "About",
            items: [
              { text: "FAQ", link: "/about/faq" },
              { text: "Changelog", link: "/about/changelog" },
              { text: "About Us", link: "/about/about-us" },
              { text: "Contact Us", link: "/about/contact-us" },
            ],
          },
        ],

        sidebar: [
          {
            text: "Getting Started",
            items: [
              { text: "Introduction", link: "/guide/introduction" },
              { text: "Installation", link: "/guide/installation" },
              { text: "Quick Start", link: "/guide/quick-start" },
            ],
          },
          {
            text: "Core",
            items: [
              { text: "Instance", link: "" },
              { text: "Events", link: "" },
              { text: "Commands", link: "" },
            ],
          },
          {
            text: "Extensions",
            items: [
              {
                text: "Node Extensions",
                collapsed: true,
                collapsible: true,
                items: [
                  { text: "Document", link: "" },
                  { text: "Paragraph", link: "" },
                  { text: "Heading", link: "" },
                  { text: "Divider", link: "" },
                  { text: "Blockquote", link: "" },
                  { text: "BulletList", link: "" },
                  { text: "OrderedList", link: "" },
                  { text: "ListItem", link: "" },
                  { text: "TaskList", link: "" },
                  { text: "CodeBlock", link: "" },
                  { text: "Image", link: "" },
                  { text: "Video", link: "" },
                  { text: "File", link: "" },
                  { text: "Table", link: "" },
                  { text: "Indent", link: "" },
                ],
              },
              {
                text: "Mark Extensions",
                collapsed: true,
                collapsible: true,
                items: [
                  { text: "Bold", link: "" },
                  { text: "Italic", link: "" },
                  { text: "Strike", link: "" },
                  { text: "Underline", link: "" },
                  { text: "Code", link: "" },
                  { text: "Subscript", link: "" },
                  { text: "Superscript", link: "" },
                  { text: "Link", link: "" },
                  { text: "TextStyle", link: "" },
                  { text: "TextAlign", link: "" },
                  { text: "FontFamily", link: "" },
                  { text: "FontSize", link: "" },
                  { text: "Color", link: "" },
                  { text: "Background", link: "" },
                ],
              },
              {
                text: "Feature Extensions",
                collapsed: true,
                collapsible: true,
                items: [
                  { text: "BubbleMenu", link: "" },
                  { text: "CommandSlash", link: "" },
                  { text: "CommandAKeymap", link: "" },
                  { text: "CharacterCount", link: "" },
                  { text: "Dropcursor", link: "" },
                  { text: "DragHandle", link: "" },
                  { text: "Gapcursor", link: "" },
                  { text: "History", link: "" },
                  { text: "Placeholder", link: "" },
                  { text: "Selection", link: "" },
                  { text: "Toc", link: "" },
                  { text: "Typography", link: "" },
                  { text: "UniqueID", link: "" },
                ],
              },
              {
                text: "Custom Extensions",
                collapsed: true,
                collapsible: true,
                items: [{ text: "How to customize extensions", link: "" }],
              },
            ],
          },
          {
            text: "View",
            items: [
              {
                text: "Vue3",
                collapsed: true,
                collapsible: true,
                items: [
                  { text: "Installation", link: "" },
                  { text: "Quick Start", link: "" },
                ],
              },
            ],
          },
          {
            text: "About",
            items: [
              { text: "FAQ", link: "/about/faq" },
              { text: "Changelog", link: "/about/changelog" },
              { text: "About Us", link: "/about/about-us" },
              { text: "Contact Us", link: "/about/contact-us" },
            ],
          },
        ],

        socialLinks: [{ icon: "github", link: getMeta("github") }],

        outline: "deep",

        editLink: {
          pattern: getMeta("github") + "/edit/main/docs/:path",
          text: "Edit this page on GitHub",
        },

        footer: {
          message: "Released under the MIT License.",
          copyright: "Copyright © 2024-present isle-editor contributors",
        },

        externalLinkIcon: true,

        search: {
          provider: "local",
        },
      },
    },
    zh: {
      label: "简体中文",
      lang: "zh-CN",
      link: "/zh/",
      title: getMeta("zh.title"),
      description: getMeta("zh.description"),
      head: [
        ["meta", { name: "referrer", content: "no-referrer-when-downgrade" }],
        ["meta", { name: "keywords", content: getMeta("keywords") }],
        ["meta", { name: "author", content: getMeta("author") }],

        ["link", { rel: "shortcut icon", href: getMeta("ico") }],
        ["link", { rel: "icon", type: "image/x-icon", href: getMeta("ico") }],

        // webfont
        ["link", { rel: "dns-prefetch", href: "https://fonts.googleapis.com" }],
        ["link", { rel: "dns-prefetch", href: "https://fonts.gstatic.com" }],
        [
          "link",
          {
            rel: "preconnect",
            crossorigin: "anonymous",
            href: "https://fonts.googleapis.com",
          },
        ],
        [
          "link",
          {
            rel: "preconnect",
            crossorigin: "anonymous",
            href: "https://fonts.gstatic.com",
          },
        ],

        // og
        ["meta", { property: "og:type", content: "website" }],
        [
          "meta",
          { property: "og:description", content: getMeta("zh.description") },
        ],
        ["meta", { property: "og:url", content: getMeta("site") }],
        ["meta", { property: "og:locale", content: "zh_CN" }],
      ],
      themeConfig: {
        nav: [
          {
            text: "指南",
            items: [
              {
                text: "开始",
                items: [
                  { text: "介绍", link: "/zh/guide/introduction" },
                  { text: "安装", link: "/zh/guide/installation" },
                  { text: "快速开始", link: "/zh/guide/quick-start" },
                ],
              },
            ],
          },
          { text: "演示", link: "https://playground.islenote.com" },
          {
            text: "关于",
            items: [
              { text: "FAQ", link: "/zh/about/faq" },
              { text: "变更日志", link: "/zh/about/changelog" },
              { text: "关于我们", link: "/zh/about/about-us" },
              { text: "联系我们", link: "/zh/about/contact-us" },
            ],
          },
        ],
        sidebar: [
          {
            text: "指南",
            items: [
              { text: "介绍", link: "/zh/guide/introduction" },
              { text: "安装", link: "/zh/guide/installation" },
              { text: "快速开始", link: "/zh/guide/quick-start" },
            ],
          },
          {
            text: "核心",
            items: [
              { text: "实例", link: "" },
              { text: "事件", link: "" },
              { text: "命令", link: "" },
            ],
          },
          {
            text: "扩展",
            items: [
              {
                text: "节点扩展",
                collapsed: true,
                collapsible: true,
                items: [
                  { text: "Document", link: "" },
                  { text: "Paragraph", link: "" },
                  { text: "Heading", link: "" },
                  { text: "Divider", link: "" },
                  { text: "Blockquote", link: "" },
                  { text: "BulletList", link: "" },
                  { text: "OrderedList", link: "" },
                  { text: "ListItem", link: "" },
                  { text: "TaskList", link: "" },
                  { text: "CodeBlock", link: "" },
                  { text: "Image", link: "" },
                  { text: "Video", link: "" },
                  { text: "File", link: "" },
                  { text: "Table", link: "" },
                  { text: "Indent", link: "" },
                ],
              },
              {
                text: "标记扩展",
                collapsed: true,
                collapsible: true,
                items: [
                  { text: "Bold", link: "" },
                  { text: "Italic", link: "" },
                  { text: "Strike", link: "" },
                  { text: "Underline", link: "" },
                  { text: "Code", link: "" },
                  { text: "Subscript", link: "" },
                  { text: "Superscript", link: "" },
                  { text: "Link", link: "" },
                  { text: "TextStyle", link: "" },
                  { text: "TextAlign", link: "" },
                  { text: "FontFamily", link: "" },
                  { text: "FontSize", link: "" },
                  { text: "Color", link: "" },
                  { text: "Background", link: "" },
                ],
              },
              {
                text: "功能扩展",
                collapsed: true,
                collapsible: true,
                items: [
                  { text: "BubbleMenu", link: "" },
                  { text: "CommandSlash", link: "" },
                  { text: "CommandAKeymap", link: "" },
                  { text: "CharacterCount", link: "" },
                  { text: "Dropcursor", link: "" },
                  { text: "DragHandle", link: "" },
                  { text: "Gapcursor", link: "" },
                  { text: "History", link: "" },
                  { text: "Placeholder", link: "" },
                  { text: "Selection", link: "" },
                  { text: "Toc", link: "" },
                  { text: "Typography", link: "" },
                  { text: "UniqueID", link: "" },
                ],
              },
              {
                text: "自定义扩展",
                collapsed: true,
                collapsible: true,
                items: [{ text: "如何自定义扩展", link: "" }],
              },
            ],
          },
          {
            text: "视图",
            items: [
              {
                text: "Vue3",
                collapsed: true,
                collapsible: true,
                items: [
                  { text: "安装", link: "" },
                  { text: "快速开始", link: "" },
                ],
              },
            ],
          },
          {
            text: "关于",
            items: [
              { text: "FAQ", link: "/zh/about/faq" },
              { text: "变更日志", link: "/zh/about/changelog" },
              { text: "关于我们", link: "/zh/about/about-us" },
              { text: "联系我们", link: "/zh/about/contact-us" },
            ],
          },
        ],
        outlineTitle: "目录...",
        returnToTopLabel: "返回顶部",
        darkModeSwitchLabel: "模式",
        sidebarMenuLabel: "归档",
        lastUpdatedText: "最后更新时间",
        docFooter: {
          prev: "上一页",
          next: "下一页",
        },

        socialLinks: [{ icon: "github", link: getMeta("github") }],

        outline: "deep",

        editLink: {
          pattern: getMeta("github") + "/edit/main/docs/:path",
          text: "在 GitHub 上编辑此页",
        },

        footer: {
          message: "根据 MIT 许可发布。",
          copyright: "Copyright © 2024-present isle-editor contributors",
        },

        externalLinkIcon: true,

        search: {
          provider: "local",
        },
      },
    },
  },

  markdown: {
    config(md) {
      md.use(containerPreview);
      md.use(componentPreview);
    },
  },

  vite: {
    plugins: [
      Components({
        dirs: [resolve(".vitepress/theme/components")],
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        resolvers: [
          IconsResolver({
            prefix: "icon",
            customCollections: ["custom"],
          }),
        ],
      }),
      Icons({
        compiler: "vue3",
        customCollections: {
          custom: FileSystemIconLoader("public/svg/custom", (svg) =>
            svg.replace(/^<svg /, '<svg fill="currentColor" '),
          ),
        },
        autoInstall: true,
      }),
      UnoCSS({
        // more config: unocss.config.js
      }),
    ],
  },
});
