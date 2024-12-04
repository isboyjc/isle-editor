import { getMarkAttributes, Mark, mergeAttributes } from "@tiptap/core";

export default Mark.create({
  name: "textStyle",
  priority: 101,

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  parseHTML() {
    return [
      {
        tag: "span",
        getAttrs: (element) => {
          const hasStyles = element.hasAttribute("style");

          if (!hasStyles) {
            return false;
          }

          return {};
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "span",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  addCommands() {
    return {
      removeEmptyTextStyle:
        () =>
        ({ state, commands }) => {
          const attributes = getMarkAttributes(state, this.type);
          const hasStyles = Object.entries(attributes).some(
            ([, value]) => !!value,
          );

          if (hasStyles) {
            return true;
          }

          return commands.unsetMark(this.name);
        },
    };
  },
});
