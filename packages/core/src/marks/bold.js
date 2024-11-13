import Bold from '@tiptap/extension-bold'

export default Bold.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      title: 'bold',
      desc: '**isle**',
      bubble: true,
      command: ({ editor }) => editor.chain().focus().toggleBold().run(),
      isActive: ({ editor }) => editor.isActive('bold'),
      shortcutkeys: 'Mod-B'
    }
  }
})
