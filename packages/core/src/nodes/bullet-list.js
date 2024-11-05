/*
 * @LastEditTime: 2024-11-01 17:06:16
 * @Description: 无序列表
 * @Date: 2024-04-01 21:02:18
 * @Author: isboyjc
 * @LastEditors: isboyjc
 */
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
  shortcutkeys: {
    mac: ['⌘', 'Shift', '8'],
    win: ['Ctrl', 'Shift', '8']
  },
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
