import Bold from "@tiptap/extension-bold";

export default Bold.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      name: "bold",
      desc: "**isle**",
      bubble: true,
      toolbar: true,
      command: ({ editor }) => editor.chain().focus().toggleBold().run(),
      isActive: ({ editor }) => editor.isActive("bold"),
      shortcutkeys: "Mod-B",
    };
  },
});
