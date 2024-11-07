import * as TipTap from '@tiptap/core'
import { prefixClass } from './utils/prefix.js'

export * from '@tiptap/core'
export class Editor extends TipTap.Editor {
  constructor(options = {}) {
    super(options)

    return this
  }

  prependClass() {
    this.view.dom.className = `${prefixClass} ${this.view.dom.className}`
  }
}