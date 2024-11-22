import { mergeAttributes, Node, textblockTypeInputRule } from "@tiptap/core";
import { prefixClass } from "@/utils/prefix.js";

function command({ editor, range, level }) {
  range
    ? editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level })
        .run()
    : editor.commands.setHeading({ level });
}

const source = {
  slash: true,
  name: "heading",
  command: ({ editor, range, level }) => command({ editor, range, level }),
  isActive: ({ editor, level }) => editor.isActive("heading", { level }),
  HTMLAttributes: {
    class: `${prefixClass}__heading`,
  },
  list: [
    {
      name: "heading1",
      desc: "# isle",
      command: ({ editor, range }) => command({ editor, range, level: 1 }),
      isActive: ({ editor }) => editor.isActive("heading", { level: 1 }),
      shortcutkeys: "Mod-Alt-1",
    },
    {
      name: "heading2",
      desc: "## isle",
      command: ({ editor, range }) => command({ editor, range, level: 2 }),
      isActive: ({ editor }) => editor.isActive("heading", { level: 2 }),
      shortcutkeys: "Mod-Alt-2",
    },
    {
      name: "heading3",
      desc: "### isle",
      command: ({ editor, range }) => command({ editor, range, level: 3 }),
      isActive: ({ editor }) => editor.isActive("heading", { level: 3 }),
      shortcutkeys: "Mod-Alt-3",
    },
    {
      name: "heading4",
      desc: "#### isle",
      command: ({ editor, range }) => command({ editor, range, level: 4 }),
      isActive: ({ editor }) => editor.isActive("heading", { level: 4 }),
      shortcutkeys: "Mod-Alt-4",
    },
    {
      name: "heading5",
      desc: "##### isle",
      command: ({ editor, range }) => command({ editor, range, level: 5 }),
      isActive: ({ editor }) => editor.isActive("heading", { level: 5 }),
      shortcutkeys: "Mod-Alt-5",
    },
    {
      name: "heading6",
      desc: "###### isle",
      command: ({ editor, range }) => command({ editor, range, level: 6 }),
      isActive: ({ editor }) => editor.isActive("heading", { level: 6 }),
      shortcutkeys: "Mod-Alt-6",
    },
  ],
};

export default Node.create({
  name: "heading",

  addOptions() {
    return {
      levels: [1, 2, 3, 4, 5, 6],
      ...source,
    };
  },

  content: "inline*",

  group: "block",

  defining: true,

  addAttributes() {
    return {
      level: {
        default: 1,
        rendered: false,
      },
    };
  },

  parseHTML() {
    return this.options.levels.map((level) => ({
      tag: `h${level}`,
      attrs: { level },
    }));
  },

  renderHTML({ node, HTMLAttributes }) {
    const hasLevel = this.options.levels.includes(node.attrs.level);
    const level = hasLevel ? node.attrs.level : this.options.levels[0];

    return [
      `h${level}`,
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  addCommands() {
    return {
      setHeading:
        (attributes) =>
        ({ commands }) => {
          if (!this.options.levels.includes(attributes.level)) {
            return false;
          }

          return commands.setNode(this.name, attributes);
        },
      toggleHeading:
        (attributes) =>
        ({ commands }) => {
          if (!this.options.levels.includes(attributes.level)) {
            return false;
          }

          return commands.toggleNode(this.name, "paragraph", attributes);
        },
    };
  },

  addKeyboardShortcuts() {
    return this.options.levels.reduce(
      (items, level) => ({
        ...items,
        ...{
          [`Mod-Alt-${level}`]: () =>
            this.editor.commands.toggleHeading({ level }),
        },
      }),
      {},
    );
  },

  addInputRules() {
    return this.options.levels.map((level) => {
      return textblockTypeInputRule({
        // 处理标题回车和标签冲突问题
        // find: new RegExp(`^(#{1,${level}})\\s$`),
        find: new RegExp(`^(#{1,${level}}) $`),
        type: this.type,
        getAttributes: {
          level,
        },
      });
    });
  },
});
