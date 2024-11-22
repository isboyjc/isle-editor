import Strike from "@tiptap/extension-strike";

export default Strike.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      name: "strike",
      desc: "~~isle~~",
      bubble: true,
      toolbar: true,
      command: ({ editor }) => editor.chain().focus().toggleStrike().run(),
      isActive: ({ editor }) => editor.isActive("strike"),
      shortcutkeys: "Mod-Shift-S",
    };
  },
});
