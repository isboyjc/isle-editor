import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import { isEqual } from 'lodash' 

export default Extension.create({
  name: 'toc',

  addOptions() {
    return {
      levels: [1, 2, 3, 4, 5, 6],
      headingType: 'heading',
    }
  },

  addStorage() {
    return {
      tocItems: [],
    }
  },

  onCreate() {
    this.editor.commands.updateToc()
  },

  addCommands() {
    return {
      updateToc: () => ({ editor }) => {
        const { levels, headingType } = this.options
        const items = []
        const stack = []
        
        editor.state.doc.descendants((node, pos) => {
          if (node.type.name === headingType && levels.includes(node.attrs.level)) {
            const item = {
              level: node.attrs.level,
              text: node.textContent,
              pos,
              id: node.attrs.id,
              children: []
            }
  
            // 找到当前标题应该插入的位置
            while (
              stack.length > 0 && 
              stack[stack.length - 1].level >= item.level
            ) {
              stack.pop()
            }
  
            if (stack.length === 0) {
              items.push(item)
            } else {
              stack[stack.length - 1].children.push(item)
            }
            
            stack.push(item)
          }
        })

        if (!isEqual(this.storage.tocItems, items)) {
          this.storage.tocItems = items
        }
        
        return true
      },
    }
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('toc'),
        view: () => {
          return {
            update: (view, prevState) => {
              // 文档无变更时，不更新
              if (view.state.doc.eq(prevState.doc)) return

              try {
                // 获取发生变化的范围
                const changes = view.state.doc.content.findDiffStart(prevState.doc.content)
                if (changes === null) return

                // 计算文档结束位置
                const docSize = view.state.doc.content.size

                // 检查变化的范围内是否包含标题
                let hasHeadingChange = false
                const { headingType, levels } = this.options

                // 限制检查范围不超过文档大小
                const endPos = Math.min(changes + 100, docSize)

                view.state.doc.nodesBetween(changes, endPos, (node) => {
                  if (node.type.name === headingType && levels.includes(node.attrs.level)) {
                    hasHeadingChange = true
                    return false // 停止遍历
                  }
                })

                // 只有当标题发生变化时才更新 TOC
                if (hasHeadingChange) {
                  this.editor.commands.updateToc()
                }
              } catch (error) {
                // 发生错误时，为安全起见更新整个 TOC
                this.editor.commands.updateToc()
              }
            },
          }
        },
      }),
    ]
  },
})