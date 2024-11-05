/*
 * @LastEditTime: 2024-10-31 19:19:24
 * @Description: 文档节点 - 根节点
 * @Date: 2024-03-26 00:58:47
 * @Author: isboyjc
 * @LastEditors: isboyjc
 */
import Document from '@tiptap/extension-document'
import Title from '../nodes/title.js'
import { prefixClass } from '../utils/prefix.js'

export default Document.extend({
  addOptions() {
    return {
      title: false,
      HTMLAttributes: {
        class: `${prefixClass}__doc`
      }
    }
  },

  content() {
    return this.options.title ? 'title block+' : 'block+'
  },

  addExtensions() {
    // 处理 title 节点传参
    if (this.options.title) {
      return [Title]
    }
    return []
  }
})
