import { Extension } from "@tiptap/core";

export default Extension.create({
  name: "color",

  addOptions() {
    return {
      types: ["textStyle"],
      type: "default", // picker
      title: "color",
      desc: "",
      command: ({ editor, color = "" }) => {
        if (editor.isActive("textStyle", { color }) || !color) {
          editor.chain().focus().unsetColor().run();
        } else {
          editor.chain().focus().setColor(color).run();
        }
      },
      isDisabled: ({ editor }) => !editor.can().setColor(),
      isActive: ({ editor, color }) => editor.isActive("textStyle", { color }),
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          color: {
            default: null,
            parseHTML: (element) => element.style.color?.replace(/['"]+/g, ""),
            renderHTML: (attributes) => {
              if (!attributes.color) {
                return {};
              }

              return {
                style: `color: ${attributes.color}`,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setColor:
        (color) =>
        ({ chain }) => {
          return chain().setMark("textStyle", { color }).run();
        },
      unsetColor:
        () =>
        ({ chain }) => {
          return chain()
            .setMark("textStyle", { color: null })
            .removeEmptyTextStyle()
            .run();
        },
    };
  },
});
