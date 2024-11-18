import { Extension } from '@tiptap/core'
import Suggestion from '@tiptap/suggestion'

export default Extension.create({
  name: 'commandSlash',
  addOptions() {
    return {
      suggestion: {
        char: '/',
        command: ({ editor, range, props }) => {
          props.command({ editor, range })
        },
        items: () => [], 
        render: () => ({}), 
      }
    }
  },
  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion
      })
    ]
  }
})
