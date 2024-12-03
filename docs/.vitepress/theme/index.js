import DefaultTheme from "vitepress/theme";
import CustomLayout from "./components/CustomLayout.vue";
import { IsleEditor } from "@isle-editor/vue3";
import "@isle-editor/vue3/dist/style.css";
import {
  AntDesignContainer,
  ElementPlusContainer,
} from "@vitepress-demo-preview/component";
import "@vitepress-demo-preview/component/dist/style.css";

import { MotionPlugin } from "@vueuse/motion";

import "./styles/vars.css";
import "./styles/main.css";
import "uno.css";

export default {
  extends: DefaultTheme,
  Layout: CustomLayout,
  enhanceApp({ app }) {
    app.component("IsleEditor", IsleEditor);
    app.component("demo-preview", ElementPlusContainer);
    app.use(MotionPlugin);
  },
};
