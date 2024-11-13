import Underline from '@tiptap/extension-underline'

export default Underline.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      title: 'underline',
      desc: '',
      bubble: true,
      command: ({ editor }) => editor.chain().focus().toggleUnderline().run(),
      isActive: ({ editor }) => editor.isActive('underline'),
      shortcutkeys: 'Mod-U'
    }
  }
})
