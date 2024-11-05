/*
 * @LastEditTime: 2024-10-31 19:00:28
 * @Description: 标题
 * @Date: 2024-03-26 00:59:27
 * @Author: isboyjc
 * @LastEditors: isboyjc
 */
import { Node, mergeAttributes } from '@tiptap/core'
import { prefixClass } from '../utils/prefix.js'

export default Node.create({
  name: 'title',
  // schema
  content: 'inline*',
  draggable: false,
  group: 'block',
  addOptions() {
    return {
      ...this.parent?.(),
      HTMLAttributes: {
        class: `${prefixClass}__title`
      }
    }
  },
  parseHTML() {
    return [{ tag: 'h1' }]
  },
  renderHTML({ HTMLAttributes }) {
    return [
      'h1',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0
    ]
  }
})
