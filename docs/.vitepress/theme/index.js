import { h } from "vue";
import Theme from "vitepress/theme";
import { IsleEditor } from "@isle-editor/vue3";
import "@isle-editor/vue3/dist/style.css";

export default {
  extends: Theme,
  enhanceApp({ app }) {
    app.use(IsleEditor);
  },
};
