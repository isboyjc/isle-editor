import Subscript from "@tiptap/extension-subscript";

export default Subscript.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      name: "subscript",
      desc: "",
      bubble: true,
      toolbar: true,
      command: ({ editor }) => editor.chain().focus().toggleSubscript().run(),
      isActive: ({ editor }) => editor.isActive("subscript"),
      isDisabled: ({ editor }) => !editor.can().toggleSubscript(),
      shortcutkeys: "Mod-,",
    };
  },
});
