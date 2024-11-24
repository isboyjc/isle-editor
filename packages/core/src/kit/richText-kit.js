import BasicKit from "./basic-kit.js";

export default BasicKit.extend({
  name: "richTextKit",

  addOptions() {
    return {
      ...this.parent?.(),
    };
  },

  addExtensions() {
    const extensions = [...this.parent?.()];

    return extensions;
  },
});
