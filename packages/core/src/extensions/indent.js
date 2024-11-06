/*
 * @LastEditTime: 2024-11-01 12:46:30
 * @Description: 缩进
 * @Date: 2024-04-02 04:27:26
 * @Author: isboyjc
 * @LastEditors: isboyjc
 */
import { Extension, isList } from '@tiptap/core'
import { AllSelection, TextSelection } from 'prosemirror-state'
import { clamp } from '../utils/clamp.js'

const source = {
  title: 'indent',
  // bubble: true,
  sort: 12,
  list: [
    {
      title: 'indent',
      icon: 'IndentIncrease',
      command: ({ editor }) => editor.commands.indent(),
      shortcutkeys: {
        mac: ['Tab'],
        win: ['Tab']
      }
    },
    {
      title: 'outdent',
      icon: 'IndentDecrease',
      command: ({ editor }) => editor.commands.outdent(),
      shortcutkeys: {
        mac: ['Shift', 'Tab'],
        win: ['Shift', 'Tab']
      }
    }
  ]
}

const IndentProps = {
  max: 7,
  min: 0,

  more: 1,
  less: -1
}

const Indent = Extension.create({
  name: 'indent',

  addOptions() {
    return {
      types: ['paragraph', 'heading', 'blockquote'],
      minIndent: IndentProps.min,
      maxIndent: IndentProps.max,
      ...source
    }
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          indent: {
            default: 0,
            parseHTML: element => {
              const identAttr = element.getAttribute('data-indent')
              return (identAttr ? Number.parseInt(identAttr, 10) : 0) || 0
            },
            renderHTML: attributes => {
              if (!attributes.indent) return {}
              return { 'data-indent': attributes.indent }
            }
          }
        }
      }
    ]
  },

  addCommands() {
    return {
      indent: () =>
        createIndentCommand({
          delta: IndentProps.more,
          types: this.options.types
        }),
      outdent: () =>
        createIndentCommand({
          delta: IndentProps.less,
          types: this.options.types
        })
    }
  },

  addKeyboardShortcuts() {
    return {
      Tab: () => this.editor.commands.indent(),
      'Shift-Tab': () => this.editor.commands.outdent()
    }
  }
})

function updateIndentLevel(tr, delta, types, editor) {
  const { doc, selection } = tr
  if (!doc || !selection) return tr
  if (
    !(selection instanceof TextSelection || selection instanceof AllSelection)
  )
    return tr
  const { from, to } = selection
  doc.nodesBetween(from, to, (node, pos) => {
    const nodeType = node.type
    if (types.includes(nodeType.name)) {
      tr = setNodeIndentMarkup(tr, pos, delta)
      return false
    } else if (isList(node.type.name, editor.extensionManager.extensions)) {
      return false
    }
    return true
  })

  return tr
}

function setNodeIndentMarkup(tr, pos, delta) {
  if (!tr.doc) return tr
  const node = tr.doc.nodeAt(pos)
  if (!node) return tr
  const minIndent = IndentProps.min
  const maxIndent = IndentProps.max

  const indent = clamp((node.attrs.indent || 0) + delta, minIndent, maxIndent)
  if (indent === node.attrs.indent) return tr
  const nodeAttrs = {
    ...node.attrs,
    indent
  }

  return tr.setNodeMarkup(pos, node.type, nodeAttrs, node.marks)
}

function createIndentCommand({ delta, types }) {
  return ({ state, dispatch, editor }) => {
    const { selection } = state
    let { tr } = state
    tr = tr.setSelection(selection)
    tr = updateIndentLevel(tr, delta, types, editor)

    if (tr.docChanged) {
      dispatch && dispatch(tr)
      return true
    }

    return true
  }
}

export default Indent