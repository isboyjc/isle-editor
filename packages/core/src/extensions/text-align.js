import { Extension } from "@tiptap/core";

export default Extension.create({
  name: "textAlign",

  addOptions() {
    return {
      alignments: ["left", "center", "right", "justify"],
      defaultAlignment: "left",
      name: "textAlign",
      bubble: true,
      types: ["heading", "paragraph"],
      list: [
        {
          name: "alignLeft",
          shortcutkeys: "Mod-Shift-L",
          command: ({ editor }) =>
            editor.chain().focus().setTextAlign("left").run(),
          isActive: ({ editor }) => editor.isActive({ textAlign: "left" }),
        },
        {
          name: "alignCenter",
          shortcutkeys: "Mod-Shift-E",
          command: ({ editor }) =>
            editor.chain().focus().setTextAlign("center").run(),
          isActive: ({ editor }) => editor.isActive({ textAlign: "center" }),
        },
        {
          name: "alignRight",
          shortcutkeys: "Mod-Shift-R",
          command: ({ editor }) =>
            editor.chain().focus().setTextAlign("right").run(),
          isActive: ({ editor }) => editor.isActive({ textAlign: "right" }),
        },
        {
          name: "alignJustify",
          shortcutkeys: "Mod-Shift-J",
          command: ({ editor }) =>
            editor.chain().focus().setTextAlign("justify").run(),
          isActive: ({ editor }) => editor.isActive({ textAlign: "justify" }),
        },
      ],
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          textAlign: {
            default: this.options.defaultAlignment,
            parseHTML: (element) => {
              const alignment =
                element.style.textAlign || this.options.defaultAlignment;

              return this.options.alignments.includes(alignment)
                ? alignment
                : this.options.defaultAlignment;
            },
            renderHTML: (attributes) => {
              if (attributes.textAlign === this.options.defaultAlignment) {
                return {};
              }

              return { style: `text-align: ${attributes.textAlign}` };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setTextAlign:
        (alignment) =>
        ({ commands }) => {
          if (!this.options.alignments.includes(alignment)) {
            return false;
          }

          return this.options.types
            .map((type) =>
              commands.updateAttributes(type, { textAlign: alignment }),
            )
            .every((response) => response);
        },

      unsetTextAlign:
        () =>
        ({ commands }) => {
          return this.options.types
            .map((type) => commands.resetAttributes(type, "textAlign"))
            .every((response) => response);
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      "Mod-Shift-l": () => this.editor.commands.setTextAlign("left"),
      "Mod-Shift-e": () => this.editor.commands.setTextAlign("center"),
      "Mod-Shift-r": () => this.editor.commands.setTextAlign("right"),
      "Mod-Shift-j": () => this.editor.commands.setTextAlign("justify"),
    };
  },
});
