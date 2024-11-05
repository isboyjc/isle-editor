/*
 * @LastEditTime: 2024-11-01 17:05:53
 * @Description: 有序列表
 * @Date: 2024-04-01 21:23:04
 * @Author: isboyjc
 * @LastEditors: isboyjc
 */
import OrderedList from '@tiptap/extension-ordered-list'
import { prefixClass } from '../utils/prefix.js'

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
  shortcutkeys: {
    mac: ['⌘', 'Shift', '7'],
    win: ['Ctrl', 'Shift', '7']
  },
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
