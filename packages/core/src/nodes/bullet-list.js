import BulletList from '@tiptap/extension-bullet-list'
import { prefixClass } from '../utils/prefix.js'

const source = {
  title: 'bulletlist',
  icon: 'List',
  desc: '- isle',
  command: ({ editor, range }) => {
    range
      ? editor.chain().focus().deleteRange(range).toggleBulletList().run()
      : editor.commands.toggleBulletList()
  },
  isActive: ({ editor }) => editor.isActive('bulletList'),
  shortcutkeys: 'Mod-Shift-8',
  HTMLAttributes: {
    class: `${prefixClass}__bullet-list`
  }
}

export default BulletList.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      ...source
    }
  }
  // addExtensions() {
  //   return [ListItem]
  // }
})
