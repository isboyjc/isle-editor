/*
 * @LastEditTime: 2024-11-03 19:17:45
 * @Description: 斜体
 * @Date: 2024-03-26 18:57:34
 * @Author: isboyjc
 * @LastEditors: isboyjc
 */
import Italic from '@tiptap/extension-italic'

export default Italic.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      title: 'italic',
      desc: '*isle*',
      bubble: true,
      command: ({ editor }) => editor.chain().focus().toggleItalic().run(),
      isActive: ({ editor }) => editor.isActive('italic'),
      shortcutkeys: 'Mod-I'
    }
  }
})
