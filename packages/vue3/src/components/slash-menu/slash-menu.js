import { defineComponent, h, computed } from 'vue'
import { prefixClass, t } from '@isle-editor/core'
import { getIcon } from '@/utils/icon'
import { convertShortcutKeys } from '@/utils/shortcutkey'

export default defineComponent({
  name: 'IsleEditorSlash',
  props: {
    editor: {
      type: Object,
      required: true
    },
    command: {
      type: Function,
      required: true
    },
    query: {
      type: String,
      default: ''
    }
  },
  setup(props, { expose}) {
    function getItems(query){
      let slashNodes = props.editor.extensionManager.extensions.filter((item) => item?.options?.slash).map(item => item.options)
      const headingNode = slashNodes.find(item => item.title === 'heading')
      if(headingNode){
        slashNodes = [
          ...headingNode.levels.map(v => headingNode.list[v - 1]),
          ...slashNodes.filter(item => item.title !== 'heading')
        ]
      }

      return slashNodes.filter((item) => item.title.includes(query) || t(item.title).includes(query))
    }

    const selectedIndex = ref(0)
    const items = computed(() => {
      selectedIndex.value = 0
      return getItems(props.query)
    })

    const slashSimpleBarRef = ref(null)

    function onKeyDown({ event }){
      if (event.key === 'ArrowUp') {
        upHandler()
        return true
      }
    
      if (event.key === 'ArrowDown') {
        downHandler()
        return true
      }
    
      if (event.key === 'Enter') {
        enterHandler()
        return true
      }
    
      return false
    }

    function upHandler() {
      selectedIndex.value =
        (selectedIndex.value + items.value.length - 1) % items.value.length
    
      updateScrollView(
        slashSimpleBarRef.value,
        slashSimpleBarRef.value?.children[selectedIndex.value]
      )
    }

    function downHandler() {
      selectedIndex.value = (selectedIndex.value + 1) % items.value.length
    
      updateScrollView(
        slashSimpleBarRef.value,
        slashSimpleBarRef.value?.children[selectedIndex.value]
      )
    }
    
    function enterHandler() {
      selectItem(selectedIndex.value)
    }

    function onMouseLeave(){}
    function onMouseEnter(index) {
      selectedIndex.value = index
    }

    // 选中Node
    function selectItem(index) {
      const item = items.value[index]

      if (item) props.command(item)
    }

    function updateScrollView(container, item) {
      const containerHeight = container.offsetHeight
      const itemHeight = item ? item.offsetHeight : 0
    
      const top = item.offsetTop
      const bottom = top + itemHeight
    
      if (top < container.scrollTop) {
        container.scrollTop -= container.scrollTop - top + 5
      } else if (bottom > containerHeight + container.scrollTop) {
        container.scrollTop += bottom - containerHeight - container.scrollTop + 5
      }
    }

    expose({
      onKeyDown
    })
    return () => items.value.length ? h('div', { ref: slashSimpleBarRef, class: `${prefixClass}-slash-menu` }, [
      items.value.map((item, index) => h('div', { 
        class: [`${prefixClass}-slash-menu__item`, { 'active': selectedIndex.value === index }], 
        onClick: () => selectItem(index),
        onMouseenter: () => onMouseEnter(index),
        onMouseleave: onMouseLeave
      }, [
        h('div', { class: `${prefixClass}-slash-menu__item-left` }, [
          h(getIcon(item.title), { class: `${prefixClass}-slash-menu__item-left-icon`, size: 16, strokeWidth: 2.5 }),
          h('span', { class: `${prefixClass}-slash-menu__item-left-title` }, t(item.title)),
        ]),
        h('div', { class: `${prefixClass}-slash-menu__item-right` }, [
          convertShortcutKeys(item.shortcutkeys) && h('div', { class: `${prefixClass}-slash-menu__item-right-shortcutkeys` }, [
            ...convertShortcutKeys(item.shortcutkeys).split('-').map(key => {
              return h('span', { class: `${prefixClass}-slash-menu__item-right-shortcutkeys-key` }, key)
            })
          ])
        ])
      ]))
    ]) : null
  }
})
