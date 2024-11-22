import DefaultTheme from "vitepress/theme";
import { IsleEditor } from "@isle-editor/vue3";
import "@isle-editor/vue3/dist/style.css";
import {
  AntDesignContainer,
  ElementPlusContainer,
} from "@vitepress-demo-preview/component";
import "@vitepress-demo-preview/component/dist/style.css";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("IsleEditor", IsleEditor);
    app.component("demo-preview", ElementPlusContainer);
  },
};
