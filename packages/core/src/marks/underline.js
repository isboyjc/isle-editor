/*
 * @LastEditTime: 2024-11-03 19:18:35
 * @Description: 下划线
 * @Date: 2024-03-27 01:28:25
 * @Author: isboyjc
 * @LastEditors: isboyjc
 */
import Underline from '@tiptap/extension-underline'

const source = {
  title: 'underline',
  desc: '',
  command: ({ editor }) => editor.chain().focus().toggleUnderline().run(),
  isActive: ({ editor }) => editor.isActive('underline'),
  shortcutkeys: {
    mac: ['⌘', 'U'],
    win: ['Ctrl', 'U']
  }
}

export default Underline.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      ...source
    }
  }
})
