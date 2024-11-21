import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Isle Editor",
  description: "A powerful rich text editor based on Vue 3",

  themeConfig: {
    nav: [
      { text: "Guide", link: "/guide/getting-started" },
      { text: "Components", link: "/components/editor" },
    ],

    sidebar: {
      "/guide/": [
        {
          text: "Introduction",
          items: [{ text: "Getting Started", link: "/guide/getting-started" }],
        },
      ],
      "/components/": [
        {
          text: "Components",
          items: [
            { text: "Editor", link: "/components/editor" },
            { text: "Toolbar", link: "/components/toolbar" },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/isboyjc/isle-editor" },
    ],
  },
});
