/*
 * @LastEditTime: 2024-11-03 19:18:09
 * @Description: 删除线
 * @Date: 2024-03-26 22:12:55
 * @Author: isboyjc
 * @LastEditors: isboyjc
 */
import Strike from '@tiptap/extension-strike'

const source = {
  title: 'strike',
  desc: '~~isle~~',
  sort: 3,
  bubble: true,
  icon: 'Strikethrough',
  command: ({ editor }) => editor.commands.toggleStrike(),
  isActive: ({ editor }) => editor.isActive('strike'),
  shortcutkeys: {
    mac: ['⌘', 'Shift', 'S'],
    win: ['Ctrl', 'Shift', 'S']
  }
}
export default Strike.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      ...source
    }
  }
})
