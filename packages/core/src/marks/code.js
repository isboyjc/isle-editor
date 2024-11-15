import Code from '@tiptap/extension-code'
import { prefixClass } from '../utils/prefix.js'

export default Code.extend({
  exitable: true,
  addOptions() {
    return {
      ...this.parent?.(),
      title: 'code',
      desc: '`isle`',
      bubble: true,
      command: ({ editor }) => editor.chain().focus().toggleCode().run(),
      isActive: ({ editor }) => editor.isActive('code'),
      shortcutkeys: 'Mod-E',
      HTMLAttributes: {
        class: `${prefixClass}__code`
      }
    }
  }
})
