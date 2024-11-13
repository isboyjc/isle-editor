import { mergeAttributes, Node } from '@tiptap/core'
import { prefixClass } from '@/utils/prefix.js'

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
  shortcutkeys: 'Mod-Alt-0'
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
