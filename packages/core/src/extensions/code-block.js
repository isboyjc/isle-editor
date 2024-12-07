import CodeBlock from "@tiptap/extension-code-block";

export default CodeBlock.extend({
  name: "codeBlock",

  addOptions() {
    return {
      ...this.parent?.(),
      languageClassPrefix: "language-",
      exitOnTripleEnter: true,
      exitOnArrowDown: true,
      defaultLanguage: null,
      tabSize: 2, // 默认缩进2个空格
      useTab: false, // 默认使用空格而不是制表符
      nodeView: undefined,
      HTMLAttributes: {},
      slash: true,
      name: "codeBlock",
      desc: "```javascript",
      command: ({ editor, range }) => {
        range
          ? editor.chain().focus().deleteRange(range).toggleCodeBlock().run()
          : editor.commands.toggleCodeBlock();
      },
      isActive: ({ editor }) => editor.isActive("codeBlock"),
      isDisabled: ({ editor }) => !editor.can().toggleCodeBlock(),
      shortcutkeys: "Mod-Shift-C",
    };
  },

  addNodeView() {
    // 如果提供了自定义的 nodeView 函数，使用它
    if (typeof this.options.nodeView === "function") {
      return this.options.nodeView;
    }

    return () => undefined;
  },

  addKeyboardShortcuts() {
    return {
      Tab: ({ editor }) => {
        // 只在代码块内处理
        if (!editor.isActive(this.name)) {
          return false;
        }

        const { selection } = editor.state;
        const { $from, $to } = selection;

        // 获取缩进字符
        const indentChar = this.options.useTab ? "\t" : " ";
        const indentSize = this.options.useTab ? 1 : this.options.tabSize;
        const indent = indentChar.repeat(indentSize);

        // 如果有选中文本，对选中的每一行进行缩进
        if (!selection.empty) {
          const lines = editor.state.doc
            .textBetween($from.pos, $to.pos)
            .split("\n");
          const indentedText = lines.map((line) => indent + line).join("\n");

          editor
            .chain()
            .focus()
            .deleteSelection()
            .insertContent(indentedText)
            .run();

          return true;
        }

        // 如果没有选中文本，直接插入缩进
        editor.chain().focus().insertContent(indent).run();

        return true;
      },
      // 支持 Shift-Tab 反向缩进
      "Shift-Tab": ({ editor }) => {
        if (!editor.isActive(this.name)) {
          return false;
        }

        const { selection } = editor.state;
        const { $from, $to } = selection;

        // 获取缩进字符
        const indentChar = this.options.useTab ? "\t" : " ";
        const indentSize = this.options.useTab ? 1 : this.options.tabSize;

        // 如果有选中文本，对选中的每一行进行反向缩进
        if (!selection.empty) {
          const lines = editor.state.doc
            .textBetween($from.pos, $to.pos)
            .split("\n");
          const unindentedText = lines
            .map((line) => {
              // 移除行首的缩进字符
              if (this.options.useTab) {
                return line.replace(/^\t/, "");
              }
              return line.replace(new RegExp(`^ {1,${indentSize}}`), "");
            })
            .join("\n");

          editor
            .chain()
            .focus()
            .deleteSelection()
            .insertContent(unindentedText)
            .run();

          return true;
        }

        // 如果没有选中文本，尝试移除当前行的缩进
        const line = editor.state.doc.textBetween(
          $from.before(),
          $from.after(),
        );

        const pos = $from.pos - $from.parentOffset;
        const currentIndent = line.match(/^[\t ]*/)?.[0];

        if (currentIndent) {
          const newIndent = this.options.useTab
            ? currentIndent.replace(/^\t/, "")
            : currentIndent.replace(new RegExp(` {1,${indentSize}}$`), "");

          editor
            .chain()
            .focus()
            .deleteRange({ from: pos, to: pos + currentIndent.length })
            .insertContent(newIndent)
            .run();
        }

        return true;
      },
    };
  },
});
