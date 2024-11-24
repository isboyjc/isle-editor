import { Link } from "@tiptap/extension-link";
import { getMarkRange } from "@tiptap/core";
import { Plugin, PluginKey, TextSelection } from "@tiptap/pm/state";

export default Link.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      name: "link",
      desc: "",
      bubble: true,
      command: ({
        editor,
        href = "editor.islenote.com",
        target = "_blank",
        ...arg
      }) => {
        editor
          .chain()
          .focus()
          .setLink({
            href,
            target,
            ...arg,
          })
          .run();
      },
      isDisabled: ({ editor }) => !editor.can().setLink(),
      isActive: ({ editor }) => editor.isActive("link"),
    };
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("link-click-select-all"),
        props: {
          handleClick(view, pos) {
            const { schema, doc, tr } = view.state;

            const range = getMarkRange(doc.resolve(pos), schema.marks.link);

            if (!range) return false;

            const $start = doc.resolve(range.from);
            const $end = doc.resolve(range.to);

            const transaction = tr.setSelection(
              new TextSelection($start, $end),
            );

            view.dispatch(transaction);
            return true;
          },
        },
      }),
    ];
  },
});
