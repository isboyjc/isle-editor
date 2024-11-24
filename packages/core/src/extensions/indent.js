import { Extension, isList } from "@tiptap/core";
import { clamp } from "@/utils/clamp.js";

const IndentProps = {
  max: 7,
  min: 0,

  more: 1,
  less: -1,
};

export default Extension.create({
  name: "indent",

  addOptions() {
    return {
      types: ["paragraph", "heading"],
      minIndent: IndentProps.min,
      maxIndent: IndentProps.max,
      name: "indent",
      toolbar: true,
      list: [
        {
          name: "indent",
          command: ({ editor }) => editor.chain().focus().indent().run(),
          isDisabled: ({ editor }) => {
            const { selection } = editor.state;
            const { from, to } = selection;
            let canIndent = false;
            const types = editor.extensionManager.extensions.find(
              (ext) => ext.name === "indent",
            ).options.types;

            editor.state.doc.nodesBetween(from, to, (node) => {
              if (types.includes(node.type.name)) {
                canIndent = (node.attrs.indent || 0) < IndentProps.max;
                return false;
              }
              return true;
            });

            return !canIndent;
          },
          shortcutkeys: "Tab",
        },
        {
          name: "outdent",
          command: ({ editor }) => editor.chain().focus().outdent().run(),
          isDisabled: ({ editor }) => {
            const { selection } = editor.state;
            const { from, to } = selection;
            let canOutdent = false;
            const types = editor.extensionManager.extensions.find(
              (ext) => ext.name === "indent",
            ).options.types;

            editor.state.doc.nodesBetween(from, to, (node) => {
              if (types.includes(node.type.name)) {
                // 检查是否达到最小缩进级别
                canOutdent = (node.attrs.indent || 0) > IndentProps.min;
                return false;
              }
              return true;
            });

            return !canOutdent;
          },
          shortcutkeys: "Shift-Tab",
        },
      ],
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          indent: {
            default: 0,
            parseHTML: (element) => {
              const identAttr = element.getAttribute("data-indent");
              return (identAttr ? Number.parseInt(identAttr, 10) : 0) || 0;
            },
            renderHTML: (attributes) => {
              if (!attributes.indent) return {};
              return { "data-indent": attributes.indent };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      indent: () =>
        createIndentCommand({
          delta: IndentProps.more,
          types: this.options.types,
        }),
      outdent: () =>
        createIndentCommand({
          delta: IndentProps.less,
          types: this.options.types,
        }),
    };
  },

  addKeyboardShortcuts() {
    return {
      Tab: () => this.editor.commands.indent(),
      "Shift-Tab": () => this.editor.commands.outdent(),
    };
  },
});

function updateIndentLevel(tr, delta, types, editor) {
  const { doc, selection } = tr;
  if (!doc || !selection) return tr;
  if (
    !(
      /TextSelection$/.test(selection.constructor.name) ||
      /AllSelection$/.test(selection.constructor.name)
    )
  )
    return tr;
  const { from, to } = selection;
  doc.nodesBetween(from, to, (node, pos) => {
    const nodeType = node.type;
    if (types.includes(nodeType.name)) {
      tr = setNodeIndentMarkup(tr, pos, delta);
      return false;
    } else if (isList(node.type.name, editor.extensionManager.extensions)) {
      return false;
    }
    return true;
  });

  return tr;
}

function setNodeIndentMarkup(tr, pos, delta) {
  if (!tr.doc) return tr;
  const node = tr.doc.nodeAt(pos);
  if (!node) return tr;
  const minIndent = IndentProps.min;
  const maxIndent = IndentProps.max;

  const indent = clamp((node.attrs.indent || 0) + delta, minIndent, maxIndent);
  if (indent === node.attrs.indent) return tr;
  const nodeAttrs = {
    ...node.attrs,
    indent,
  };

  return tr.setNodeMarkup(pos, node.type, nodeAttrs, node.marks);
}

function createIndentCommand({ delta, types }) {
  return ({ state, dispatch, editor }) => {
    const { selection } = state;
    let { tr } = state;
    tr = tr.setSelection(selection);
    tr = updateIndentLevel(tr, delta, types, editor);

    if (tr.docChanged) {
      dispatch && dispatch(tr);
      return true;
    }

    return true;
  };
}
