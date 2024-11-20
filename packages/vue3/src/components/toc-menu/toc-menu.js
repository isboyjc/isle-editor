import { defineComponent, computed, h, watch, onMounted, onUnmounted } from 'vue'
import { prefixClass, t } from '@isle-editor/core'

export default defineComponent({
  name: 'IsleEditorToc',
  props: {
    editor: {
      type: Object,
      required: true
    },
    scrollView: {
      type: Object,
      default: null
    }
  },
  setup(props) {
    const tocItems = computed(() => {
      return props.editor?.storage?.toc?.tocItems || []
    })

    const activeId = ref('')
    let observer = null

     // 点击滚动到目标位置
     const scrollToTarget = (id) => {
      const target = document.querySelector(`[data-id="${id}"]`)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
        activeId.value = id
      }
    }

    // 创建观察器
    const createObserver = () => {
      // 如果已存在观察器，先断开连接
      if (observer) observer.disconnect()

      observer = new IntersectionObserver(
        (entries) => {
          if(entries[0].isIntersecting){
            activeId.value = entries[0].target.getAttribute('data-id')
          }
        },
        {
          root: props.scrollView || null,
          threshold: 0
        }
      )

      // 递归观察所有标题元素
      const observeItems = (items) => {
        items.forEach(item => {
          const element = document.querySelector(`[data-id="${item.id}"]`)
          if (element) {
            observer.observe(element)
          }
          if (item?.children?.length) {
            observeItems(item.children)
          }
        })
      }
      observeItems(tocItems.value)
    }

    // 监听 tocItems 的变化
    watch(
      () => tocItems.value,
      () => {
        // 当 tocItems 更新时，重新设置观察器
        createObserver()
      },
      { deep: true } 
    )

    onMounted(() => {
      createObserver()
    })
    
    onUnmounted(() => {
      if (observer) {
        observer.disconnect()
      }
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
          class: `${prefixClass}-toc-box`,
          style: {
            paddingLeft: `${item.level == 1 ? '0' : '1rem'}`
          }
        },
        [
          h('div',
            {
              class: [`${prefixClass}-toc-item`, {
                'active': activeId.value === item.id
              }],
              onClick: () => {
                scrollToTarget(item.id)
              }
            },
            item.text?.trim() || t('empty')
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
        h('div', { class: `${prefixClass}-toc-title` }, 'TOC'),
        ...renderTocList()
      ]
    )
  }
})
