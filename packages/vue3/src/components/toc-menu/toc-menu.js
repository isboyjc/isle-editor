import { defineComponent, computed, h } from 'vue'
import { prefixClass } from '@isle-editor/core'

export default defineComponent({
  name: 'IsleEditorToc',
  props: {
    editor: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const tocItems = computed(() => {
      return props.editor?.storage?.toc?.tocItems || []
    })

    // 渲染单个 TOC 项及其子项
    const renderTocItem = (item) => {
      const children = []
      
      // 如果有子项则递归渲染
      if (item.children && item.children.length > 0) {
        children.push(
          ...item.children.map(child => renderTocItem(child))
        )
      }

      return h('div', 
        { 
          class: `${prefixClass}-toc-item`,
        },
        [
          h('div',
            {
              class: `${prefixClass}-toc-item-content`,
              onClick: () => {
                const pos = item.pos
                props.editor?.commands.setTextSelection({ from: pos, to: pos })
              }
            },
            item.text
          ),
          ...children
        ]
      )
    }

    // 渲染整个 TOC 列表
    const renderTocList = () => {
      return tocItems.value.map(item => renderTocItem(item))
    }

    return () => h('div', 
      { 
        class: `${prefixClass}-toc` 
      }, 
      [
        h('div', { class: `${prefixClass}-toc-title` }, '目录'),
        ...renderTocList()
      ]
    )
  }
})
