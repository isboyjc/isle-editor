import Superscript from "@tiptap/extension-superscript";

export default Superscript.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      name: "superscript",
      desc: "",
      bubble: true,
      toolbar: true,
      command: ({ editor }) => editor.chain().focus().toggleSuperscript().run(),
      isActive: ({ editor }) => editor.isActive("superscript"),
      shortcutkeys: "Mod-.",
    };
  },
});
