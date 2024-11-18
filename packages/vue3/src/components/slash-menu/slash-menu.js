import { defineComponent, h, computed } from 'vue'
import { prefixClass, t } from '@isle-editor/core'
import { getIcon } from '@/utils/icon'

export default defineComponent({
  name: 'IsleEditorSlash',
  props: {
    editor: {
      type: Object,
      required: true
    },
    query: {
      type: String,
      default: ''
    }
  },
  setup(props, { expose}) {
    const slashNodes = props.editor.extensionManager.extensions.filter((item) => item?.options?.slash).map(item => item.options)

    function getItems(query){
      return slashNodes.filter((item) => item.title.includes(query) || t(item.title).includes(query))
    }

    const items = computed(() => {
      return getItems(props.query)
    })

    function onKeyDown({ event }){}

    expose({
      onKeyDown
    })
    return () => h('div', { class: `${prefixClass}-slash-menu` }, [
      items.value.map((item) => h('div', { class: `${prefixClass}-slash-menu-item` }, [
        h(getIcon(item.title), { class: `${prefixClass}-slash-menu-item-icon`, size: 15, strokeWidth: 2.5 }),
        h('span', { class: `${prefixClass}-slash-menu-item-title` }, t(item.title)),
      ]))
    ])
  }
})
