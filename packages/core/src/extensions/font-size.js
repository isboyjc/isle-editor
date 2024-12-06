import { Extension } from "@tiptap/core";

const SIZE_TYPES = {
  default: [
    {
      label: "tiny",
      value: "0.65em",
    },
    {
      label: "small",
      value: "0.85em",
    },
    {
      label: "normal",
      value: "",
    },
    {
      label: "large",
      value: "1.2em",
    },
    {
      label: "huge",
      value: "1.5em",
    },
  ],
  complex: [
    {
      label: "10px",
      value: "10px",
    },
    {
      label: "12px",
      value: "12px",
    },
    {
      label: "13px",
      value: "13px",
    },
    {
      label: "14px",
      value: "14px",
    },
    {
      label: "15px",
      value: "15px",
    },
    {
      label: "16px",
      value: "16px",
    },
    {
      label: "18px",
      value: "18px",
    },
    {
      label: "20px",
      value: "20px",
    },
    {
      label: "24px",
      value: "24px",
    },
    {
      label: "28px",
      value: "28px",
    },
    {
      label: "32px",
      value: "32px",
    },
    {
      label: "36px",
      value: "36px",
    },
  ],
};

export default Extension.create({
  name: "fontSize",

  addOptions() {
    return {
      types: ["textStyle"],
      name: "fontSize",
      desc: "",
      command: ({ editor, fontSize }) => {
        if (editor.isActive("textStyle", { fontSize }) || !fontSize) {
          editor.chain().focus().unsetFontSize().run();
        } else {
          editor.chain().focus().setFontSize(fontSize).run();
        }
      },
      isActive: ({ editor, fontSize }) =>
        editor.isActive("textStyle", { fontSize }),
      isDisabled: ({ editor }) => !editor.can().setFontSize(),
      type: "default",
      get sizes() {
        return SIZE_TYPES[this.type] || SIZE_TYPES.default;
      },
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) =>
              element.style.fontSize?.replace(/['"]+/g, ""),
            renderHTML: (attributes) => {
              if (!attributes.fontSize) {
                return {};
              }

              return {
                style: `font-size: ${attributes.fontSize}`,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setFontSize:
        (fontSize) =>
        ({ chain }) => {
          return chain().setMark("textStyle", { fontSize }).run();
        },
      unsetFontSize:
        () =>
        ({ chain }) => {
          return chain()
            .setMark("textStyle", { fontSize: null })
            .removeEmptyTextStyle()
            .run();
        },
    };
  },
});
