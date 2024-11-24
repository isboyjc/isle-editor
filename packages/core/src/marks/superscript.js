import Superscript from "@tiptap/extension-superscript";

export default Superscript.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      name: "superscript",
      desc: "",
      toolbar: true,
      command: ({ editor }) => editor.chain().focus().toggleSuperscript().run(),
      isActive: ({ editor }) => editor.isActive("superscript"),
      isDisabled: ({ editor }) => !editor.can().toggleSuperscript(),
      shortcutkeys: "Mod-.",
    };
  },
});
