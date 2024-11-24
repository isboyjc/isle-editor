import { mergeAttributes, Node } from "@tiptap/core";

export default Node.create({
  name: "hardBreak",

  addOptions() {
    return {
      keepMarks: true,
      HTMLAttributes: {},
      name: "hardBreak",
      toolbar: true,
      command: ({ editor }) => editor.chain().focus().setHardBreak().run(),
      isActive: ({ editor }) => editor.isActive("hardBreak"),
      isDisabled: ({ editor }) => !editor.can().setHardBreak(),
      shortcutkeys: "Mod-Enter",
    };
  },

  inline: true,

  group: "inline",

  selectable: false,

  linebreakReplacement: true,

  parseHTML() {
    return [{ tag: "br" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["br", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)];
  },

  renderText() {
    return "\n";
  },

  addCommands() {
    return {
      setHardBreak:
        () =>
        ({ commands, chain, state, editor }) => {
          return commands.first([
            () => commands.exitCode(),
            () =>
              commands.command(() => {
                const { selection, storedMarks } = state;

                if (selection.$from.parent.type.spec.isolating) {
                  return false;
                }

                const { keepMarks } = this.options;
                const { splittableMarks } = editor.extensionManager;
                const marks =
                  storedMarks ||
                  (selection.$to.parentOffset && selection.$from.marks());

                return chain()
                  .insertContent({ type: this.name })
                  .command(({ tr, dispatch }) => {
                    if (dispatch && marks && keepMarks) {
                      const filteredMarks = marks.filter((mark) =>
                        splittableMarks.includes(mark.type.name),
                      );

                      tr.ensureMarks(filteredMarks);
                    }

                    return true;
                  })
                  .run();
              }),
          ]);
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      "Mod-Enter": () => this.editor.commands.setHardBreak(),
      "Shift-Enter": () => this.editor.commands.setHardBreak(),
    };
  },
});
