import { Extension } from '@tiptap/core'
import { history, redo, undo } from '@tiptap/pm/history'

const source = {
  title: 'history',
  list: [
    {
      title: 'undo',
      icon: 'Undo',
      shortcutkeys: 'Mod-Z',
      command: ({ editor }) => editor.commands.undo(),
      isActive: ({ editor }) => editor.can().undo()
    },
    {
      title: 'redo',
      icon: 'Redo',
      shortcutkeys: 'Mod-Shift-Z',
      command: ({ editor }) => editor.commands.redo(),
      isActive: ({ editor }) => editor.can().redo()
    }
  ]
}

export default Extension.create({
  name: 'history',
  addOptions() {
    return {
      depth: 100,
      newGroupDelay: 500,
      ...source
    }
  },

  addCommands() {
    return {
      // clearHistory:
      //   () =>
      //   ({ state, dispatch }) => {
      //     console.log(this, state, dispatch)
      //   },
      undo:
        () =>
        ({ state, dispatch }) => {
          return undo(state, dispatch)
        },
      redo:
        () =>
        ({ state, dispatch }) => {
          return redo(state, dispatch)
        }
    }
  },

  addProseMirrorPlugins() {
    return [history(this.options)]
  },

  addKeyboardShortcuts() {
    return {
      'Mod-z': () => this.editor.commands.undo(),
      'Shift-Mod-z': () => this.editor.commands.redo(),
      'Mod-y': () => this.editor.commands.redo(),

      // Russian keyboard layouts
      'Mod-я': () => this.editor.commands.undo(),
      'Shift-Mod-я': () => this.editor.commands.redo()
    }
  }
})
