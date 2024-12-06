import {
  Mark,
  markInputRule,
  markPasteRule,
  mergeAttributes,
} from "@tiptap/core";

/**
 * Matches a highlight to a ==highlight== on input.
 */
export const inputRegex = /(?:^|\s)(==(?!\s+==)((?:[^=]+))==(?!\s+==))$/;

/**
 * Matches a highlight to a ==highlight== on paste.
 */
export const pasteRegex = /(?:^|\s)(==(?!\s+==)((?:[^=]+))==(?!\s+==))/g;

export default Mark.create({
  name: "background",

  addOptions() {
    return {
      name: "background",
      desc: "",
      type: "default", // picker
      multicolor: true,
      HTMLAttributes: {},
      command: ({ editor, background = "" }) => {
        if (editor.isActive("background", { background }) || !background) {
          editor.chain().focus().unsetBackground().run();
        } else {
          editor.chain().focus().setBackground({ background }).run();
        }
      },
      isDisabled: ({ editor }) => !editor.can().toggleBackground(),
      isActive: ({ editor, background }) =>
        editor.isActive("background", { background }),
      shortcutkeys: "Mod-Shift-H",
    };
  },

  addAttributes() {
    if (!this.options.multicolor) {
      return {};
    }

    return {
      background: {
        default: null,
        parseHTML: (element) =>
          element.getAttribute("data-background-color") ||
          element.style.backgroundColor,
        renderHTML: (attributes) => {
          if (!attributes.background) {
            return {};
          }

          return {
            "data-background-color": attributes.background,
            style: `background-color: ${attributes.background}; color: inherit`,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "mark",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "mark",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  addCommands() {
    return {
      setBackground:
        (attributes) =>
        ({ commands }) => {
          return commands.setMark(this.name, attributes);
        },
      toggleBackground:
        (attributes) =>
        ({ commands }) => {
          return commands.toggleMark(this.name, attributes);
        },
      unsetBackground:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name);
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      "Mod-Shift-h": () => this.editor.commands.toggleHighlight(),
    };
  },

  addInputRules() {
    return [
      markInputRule({
        find: inputRegex,
        type: this.type,
      }),
    ];
  },

  addPasteRules() {
    return [
      markPasteRule({
        find: pasteRegex,
        type: this.type,
      }),
    ];
  },
});
