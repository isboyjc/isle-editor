import Strike from "@tiptap/extension-strike";

export default Strike.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      name: "strike",
      desc: "~~isle~~",
      command: ({ editor }) => editor.chain().focus().toggleStrike().run(),
      isActive: ({ editor }) => editor.isActive("strike"),
      isDisabled: ({ editor }) => !editor.can().toggleStrike(),
      shortcutkeys: "Mod-Shift-S",
    };
  },
});
