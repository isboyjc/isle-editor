/*
 * @LastEditTime: 2024-11-03 19:16:21
 * @Description: 加粗
 * @Date: 2024-03-26 18:12:39
 * @Author: isboyjc
 * @LastEditors: isboyjc
 */
import Bold from '@tiptap/extension-bold'

const source = {
  title: 'bold',
  desc: '**isle**',
  command: ({ editor }) => editor.chain().focus().toggleBold().run(),
  isActive: ({ editor }) => editor.isActive('bold'),
  shortcutkeys: {
    mac: ['⌘', 'B'],
    win: ['Ctrl', 'B']
  }
}

export default Bold.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      ...source
    }
  }
})
