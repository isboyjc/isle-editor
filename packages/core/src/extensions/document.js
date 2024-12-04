import Document from "@tiptap/extension-document";
import Title from "./title.js";
import { prefixClass } from "../utils/prefix.js";

export default Document.extend({
  addOptions() {
    return {
      title: false,
      HTMLAttributes: {
        class: `${prefixClass}__doc`,
      },
    };
  },

  content() {
    return this.options.title ? "title block+" : "block+";
  },

  addExtensions() {
    // 处理 title 节点传参
    if (this.options.title) {
      return [Title];
    }
    return [];
  },
});
