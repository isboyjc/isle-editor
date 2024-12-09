import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";

export default Table.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      slash: true,
      name: "table",
      resizable: true,
      desc: "",
      command: ({ editor, range, params }) => {
        range
          ? editor
              .chain()
              .focus()
              .deleteRange(range)
              .insertTable({
                rows: params?.rows || 3,
                cols: params?.cols || 3,
                withHeaderRow: params?.withHeaderRow || false,
              })
              .run()
          : editor.commands.insertTable({
              rows: params?.rows || 3,
              cols: params?.cols || 3,
              withHeaderRow: params?.withHeaderRow || false,
            });
      },
      isActive: ({ editor }) => editor.isActive("table"),
      isDisabled: ({ editor }) => !editor.can().insertTable(),
      HTMLAttributes: {
        class: "table",
      },
    };
  },

  addExtensions() {
    return [TableRow, TableHeader, TableCell];
  },
});
