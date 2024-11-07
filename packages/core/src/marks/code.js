/*
 * @LastEditTime: 2024-05-27 16:29:28
 * @Description: 行内代码块
 * @Date: 2024-03-27 03:40:28
 * @Author: isboyjc
 * @LastEditors: isboyjc
 */
import Code from '@tiptap/extension-code'
import { prefixClass } from '../utils/prefix.js'

const source = {
  title: 'code',
  desc: '`isle`',
  command: ({ editor }) => editor.chain().focus().toggleCode().run(),
  isActive: ({ editor }) => editor.isActive('code'),
  shortcutkeys: {
    mac: ['⌘', 'E'],
    win: ['Ctrl', 'E']
  },
  HTMLAttributes: {
    class: `${prefixClass}__code`
  }
}

export default Code.extend({
  exitable: true,
  addOptions() {
    return {
      ...this.parent?.(),
      ...source
    }
  }
})
