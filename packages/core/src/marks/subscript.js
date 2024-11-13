import Subscript from '@tiptap/extension-subscript'

export default Subscript.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      title: 'subscript',
      desc: '',
      bubble: true,
      command: ({ editor }) => editor.chain().focus().toggleSubscript().run(),
      isActive: ({ editor }) => editor.isActive('subscript'),
      shortcutkeys: 'Mod-,'
    }
  }
})
