/*
 * @LastEditTime: 2024-10-31 19:34:18
 * @Description: 段落
 * @Date: 2024-03-31 20:03:40
 * @Author: isboyjc
 * @LastEditors: isboyjc
 */
import { mergeAttributes, Node } from '@tiptap/core'
import { prefixClass } from '../utils/prefix.js'

const source = {
  title: 'paragraph',
  icon: 'Pilcrow',
  command: ({ editor, range }) => {
    range
      ? editor.chain().focus().deleteRange(range).setNode('paragraph').run()
      : editor.commands.setParagraph()
  },
  isActive: ({ editor }) => editor.isActive('paragraph'),
  HTMLAttributes: {
    class: `${prefixClass}__paragraph`
  },
  shortcutkeys: {
    mac: ['⌘', 'Alt', '0'],
    win: ['Ctrl', 'Alt', '0']
  }
}

export default Node.create({
  name: 'paragraph',

  priority: 1000,

  addOptions() {
    return {
      HTMLAttributes: {},
      ...source
    }
  },

  group: 'block',

  content: 'inline*',

  parseHTML() {
    return [{ tag: 'p' }]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'p',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0
    ]
  },

  addCommands() {
    return {
      setParagraph:
        () =>
        ({ commands }) => {
          return commands.setNode(this.name)
        }
    }
  },

  addKeyboardShortcuts() {
    return {
      'Mod-Alt-0': () => this.editor.commands.setParagraph()
    }
  }
})
