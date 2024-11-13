import OrderedList from '@tiptap/extension-ordered-list'
import { prefixClass } from '@/utils/prefix.js'

const source = {
  title: 'orderedlist',
  icon: 'ListOrdered',
  desc: '1. isle',
  command: ({ editor, range }) => {
    range
      ? editor.chain().focus().deleteRange(range).toggleOrderedList().run()
      : editor.commands.toggleOrderedList()
  },
  isActive: ({ editor }) => editor.isActive('orderedList'),
  shortcutkeys: 'Mod-Shift-7',
  HTMLAttributes: {
    class: `${prefixClass}__ordered-list`
  }
}

export default OrderedList.extend({
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
