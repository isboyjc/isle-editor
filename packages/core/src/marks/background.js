import { prefixClass } from '@/utils/prefix.js'
import {
  Mark,
  markInputRule,
  markPasteRule,
  mergeAttributes,
} from '@tiptap/core'

/**
 * Matches a highlight to a ==highlight== on input.
 */
export const inputRegex = /(?:^|\s)(==(?!\s+==)((?:[^=]+))==(?!\s+==))$/

/**
 * Matches a highlight to a ==highlight== on paste.
 */
export const pasteRegex = /(?:^|\s)(==(?!\s+==)((?:[^=]+))==(?!\s+==))/g


export default Mark.create({
  name: 'background',

  addOptions() {
    return {
      title: 'background',
      desc: '',
      bubble: true,
      multicolor: true,
      HTMLAttributes: {},
      command: ({ editor, color = '' }) => {
        if (editor.isActive('background', { color }) || !color) {
          editor.chain().focus().unsetBackground().run()
        } else {
          editor.chain().focus().setBackground({ color }).run()
        }
      },
      isActive: ({ editor, color }) => editor.isActive('background', { color }),
      colors: [
        {
          name: 'white',
          color: `var(--${prefixClass}-background-white)`
        },
        {
          name: 'black',
          color: `var(--${prefixClass}-background-black)`
        },
        {
          name: 'purple',
          color: `var(--${prefixClass}-background-purple)`
        },
        {
          name: 'red',
          color: `var(--${prefixClass}-background-red)`
        },
        {
          name: 'yellow',
          color: `var(--${prefixClass}-background-yellow)`
        },
        {
          name: 'blue',
          color: `var(--${prefixClass}-background-blue)`
        },
        {
          name: 'green',
          color: `var(--${prefixClass}-background-green)`
        },
        {
          name: 'orange',
          color: `var(--${prefixClass}-background-orange)`
        },
        {
          name: 'pink',
          color: `var(--${prefixClass}-background-pink)`
        },
        {
          name: 'gray',
          color: `var(--${prefixClass}-background-gray)`
        }
      ],
      shortcutkeys: 'Mod-Shift-H'
    }
  },

  addAttributes() {
    if (!this.options.multicolor) {
      return {}
    }

    return {
      color: {
        default: null,
        parseHTML: element => element.getAttribute('data-color') || element.style.backgroundColor,
        renderHTML: attributes => {
          if (!attributes.color) {
            return {}
          }

          return {
            'data-color': attributes.color,
            style: `background-color: ${attributes.color}; color: inherit`,
          }
        },
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'mark',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['mark', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },

  addCommands() {
    return {
      setBackground: attributes => ({ commands }) => {
        return commands.setMark(this.name, attributes)
      },
      toggleBackground: attributes => ({ commands }) => {
        return commands.toggleMark(this.name, attributes)
      },
      unsetBackground: () => ({ commands }) => {
        return commands.unsetMark(this.name)
      },
    }
  },

  addKeyboardShortcuts() {
    return {
      'Mod-Shift-h': () => this.editor.commands.toggleHighlight(),
    }
  },

  addInputRules() {
    return [
      markInputRule({
        find: inputRegex,
        type: this.type,
      }),
    ]
  },

  addPasteRules() {
    return [
      markPasteRule({
        find: pasteRegex,
        type: this.type,
      }),
    ]
  },
})