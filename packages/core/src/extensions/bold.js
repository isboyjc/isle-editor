import Bold from "@tiptap/extension-bold";

export default Bold.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      name: "bold",
      desc: "**isle**",
      command: ({ editor }) => editor.chain().focus().toggleBold().run(),
      isActive: ({ editor }) => editor.isActive("bold"),
      isDisabled: ({ editor }) => !editor.can().toggleBold(),
      shortcutkeys: "Mod-B",
    };
  },
});
