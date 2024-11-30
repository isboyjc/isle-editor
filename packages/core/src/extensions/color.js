import { prefixClass } from "@/utils/prefix.js";
import { Extension } from "@tiptap/core";

export default Extension.create({
  name: "color",

  addOptions() {
    return {
      types: ["textStyle"],
      title: "color",
      desc: "",
      bubble: true,
      toolbar: true,
      command: ({ editor, color = "" }) => {
        if (editor.isActive("textStyle", { color })) {
          editor.chain().focus().unsetColor().run();
        } else {
          editor.chain().focus().setColor(color).run();
        }
      },
      isDisabled: ({ editor }) => !editor.can().setColor(),
      isActive: ({ editor, color }) => editor.isActive("textStyle", { color }),
      colors: [
        {
          name: "white",
          color: `var(--${prefixClass}-text-white)`,
        },
        {
          name: "black",
          color: `var(--${prefixClass}-text-black)`,
        },
        {
          name: "purple",
          color: `var(--${prefixClass}-text-purple)`,
        },
        {
          name: "red",
          color: `var(--${prefixClass}-text-red)`,
        },
        {
          name: "yellow",
          color: `var(--${prefixClass}-text-yellow)`,
        },
        {
          name: "blue",
          color: `var(--${prefixClass}-text-blue)`,
        },
        {
          name: "green",
          color: `var(--${prefixClass}-text-green)`,
        },
        {
          name: "orange",
          color: `var(--${prefixClass}-text-orange)`,
        },
        {
          name: "pink",
          color: `var(--${prefixClass}-text-pink)`,
        },
        {
          name: "gray",
          color: `var(--${prefixClass}-text-gray)`,
        },
      ],
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
