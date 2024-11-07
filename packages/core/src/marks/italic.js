/*
 * @LastEditTime: 2024-11-03 19:17:45
 * @Description: 斜体
 * @Date: 2024-03-26 18:57:34
 * @Author: isboyjc
 * @LastEditors: isboyjc
 */
import Italic from '@tiptap/extension-italic'

const source = {
  title: 'italic',
  desc: '*isle*',
  command: ({ editor }) => editor.chain().focus().toggleItalic().run(),
  isActive: ({ editor }) => editor.isActive('italic'),
  shortcutkeys: {
    mac: ['⌘', 'I'],
    win: ['Ctrl', 'I']
  }
}

export default Italic.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      ...source
    }
  }
})
