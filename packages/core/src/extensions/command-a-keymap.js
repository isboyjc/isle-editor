/*
 * @LastEditTime: 2024-04-29 16:11:57
 * @Description: CMD+A
 * @Date: 2024-03-29 18:06:21
 * @Author: isboyjc
 * @LastEditors: isboyjc
 */
import { Extension } from '@tiptap/core'

const CommandAKeymap = Extension.create({
  name: 'commandAKeymap',

  addCommands() {
    return {
      selectTextWithinNodeBoundaries:
        () =>
        ({ editor, commands }) => {
          const { state } = editor
          const { tr } = state
          const startNodePos = tr.selection.$from.start()
          const endNodePos = tr.selection.$to.end()
          return commands.setTextSelection({
            from: startNodePos,
            to: endNodePos
          })
        }
    }
  },

  addKeyboardShortcuts() {
    return {
      'Mod-a': ({ editor }) => {
        const { state } = editor
        const { tr } = state
        const startSelectionPos = tr.selection.from
        const endSelectionPos = tr.selection.to
        const startNodePos = tr.selection.$from.start()
        const endNodePos = tr.selection.$to.end()
        const isCurrentTextSelectionNotExtendedToNodeBoundaries =
          startSelectionPos > startNodePos || endSelectionPos < endNodePos
        if (isCurrentTextSelectionNotExtendedToNodeBoundaries) {
          editor.chain().selectTextWithinNodeBoundaries().run()
          return true
        }
        return false
      }
    }
  }
})

export default CommandAKeymap