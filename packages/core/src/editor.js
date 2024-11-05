import { Editor as TiptapEditor } from '@tiptap/core'
import { prefixClass } from './utils/prefix.js'

export class Editor extends TiptapEditor {
  constructor(options = {}) {
    super(options)

    return this
  }

  prependClass() {
    this.view.dom.className = `${prefixClass} ${this.view.dom.className}`
  }
}