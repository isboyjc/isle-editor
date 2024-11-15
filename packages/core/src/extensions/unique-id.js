import { Extension, combineTransactionSteps, findChildrenInRange, getChangedRanges, findDuplicates } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import { v4 as uuidv4 } from 'uuid'

export default Extension.create({
  name: 'uniqueID',

  // 定义扩展的默认选项
  addOptions() {
    return {
      attributeName: 'id',      
      types: ['paragraph'],                  
      filterTransaction: null,         
      generateID: () => uuidv4(), 
    }
  },

  // 添加全局属性配置
  addGlobalAttributes() {
    const { attributeName, types } = this.options

    return [
      {
        types: types,
        attributes: {
          [attributeName]: {
            default: null,
            isRequired: true,
            keepOnSplit: false,
            // 从 HTML 元素中解析属性
            parseHTML: element => element.getAttribute(`data-${attributeName}`),
            // 渲染到 HTML 时的属性
            renderHTML: attributes => ({
              [`data-${attributeName}`]: attributes[attributeName]
            })
          }
        }
      }
    ]
  },

  // 编辑器初始化时执行
  onCreate() {
    const { tr, doc } = this.editor.state
    const { attributeName, types, generateID } = this.options

    // 遍历文档中的所有节点
    doc.descendants((node, pos) => {
      // 跳过文本节点 & 跳过不需要处理的节点类型
      if (node.isText || (Array.isArray(types) && !types?.includes(node.type.name)))
        return

      if (!node.attrs[attributeName])
        tr.setNodeAttribute(pos, attributeName, generateID())
    })

    // 提交更改
    this.editor.view.dispatch(tr)
  },

  // 添加 ProseMirror 插件
  addProseMirrorPlugins() {
    const { attributeName, types, generateID } = this.options

    return [
      new Plugin({
        key: new PluginKey(this.name),
        // 处理文档变更
        appendTransaction: (transactions, oldState, newState) => {
          // 如果配置了事务过滤器，先进行过滤
          if (this.options.filterTransaction) {
            const shouldProcess = transactions.some(tr => 
              this.options.filterTransaction(tr, oldState, newState)
            )
            if (!shouldProcess) return null
          }

          // 检查是否有文档变更
          if (!transactions.some(tr => tr.docChanged) || oldState.doc.eq(newState.doc)) {
            return null
          }

          const tr = newState.tr

          const transform = combineTransactionSteps(oldState.doc, transactions)
          // 获取变更范围
          getChangedRanges(transform).forEach(({ newRange }) => {
            // 在变更范围内查找需要处理的节点
            const newNodes = findChildrenInRange(
              newState.doc,
              newRange,
              node => types.includes(node.type.name)
            )

            const newIds = newNodes.map(({ node }) => node.attrs[attributeName]).filter(item => !!item)
            // 处理每个新节点
            newNodes.forEach(({ node, pos }) => {
              if(node.attrs[attributeName]){
                tr.setNodeAttribute(pos, attributeName, generateID())
                return
              }

              // 如果当前节点在变更范围内，并且新 ID 列表中包含当前节点的 ID，则生成新的 ID
              if (tr.mapping.invert().mapResult(pos) && findDuplicates(newIds).includes(node.attrs[attributeName]))
                tr.setNodeAttribute(pos, attributeName, generateID())
            })
          })

          if (!transform.steps.length)
            return null

          return tr
        },
      }),
    ]
  },
})