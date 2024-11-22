import Italic from "@tiptap/extension-italic";

export default Italic.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      name: "italic",
      desc: "*isle*",
      bubble: true,
      toolbar: true,
      command: ({ editor }) => editor.chain().focus().toggleItalic().run(),
      isActive: ({ editor }) => editor.isActive("italic"),
      shortcutkeys: "Mod-I",
    };
  },
});
