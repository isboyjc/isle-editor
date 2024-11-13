import { defineComponent, ref, h, onMounted } from 'vue'
import { prefixClass } from '@isle/editor'
import { getIcon } from '@/utils/icon'
import BubbleLink from './bubble-menu-link'
import BubbleColor from './bubble-menu-color'
import BubbleBackground from './bubble-menu-background'
import BubbleStyle from './bubble-menu-style'
export default defineComponent({
  name: 'BubbleSelector',
  props: {
    menus: {
      type: Array,
      required: true
    },
    editor: {
      type: Object,
      required: true
    }
  },
  setup(props, { slots }) {
    return () => h('div', {  class: `${prefixClass}-bubble-menu` }, [
      ...props.menus.map(menu => {
        // 检查是否存在对应的具名插槽
        const slotName = slots[menu.name]
        
        if (slotName) {
          // 如果存在具名插槽，使用插槽内容
          return slotName({
            ...menu
          })
        }

        if (menu.name === 'link') {
          return h(BubbleLink, { editor: props.editor, menu: props.menus.find(menu => menu.name === 'link') })
        }

        if (menu.name === 'color') {
          return h(BubbleColor, { editor: props.editor, menu: props.menus.find(menu => menu.name === 'color') })
        }

        if (menu.name === 'background') {
          return h(BubbleBackground, { editor: props.editor, menu: props.menus.find(menu => menu.name === 'background') })
        }

        if (menu.name === 'style') {
          return h(BubbleStyle, { editor: props.editor, menu: props.menus.find(menu => menu.name === 'style') })
        }
        
        // 默认渲染逻辑
        return h('button', {
          class: [`${prefixClass}-bubble-menu__btn`, { active: menu?.isActive ? menu.isActive({ editor: props.editor }) : false }],
          onClick: () => menu.command({editor: props.editor}),
          onMouseDown: (evt) => evt.preventDefault()
        }, [
          h(getIcon(menu.name), { class: `${prefixClass}-bubble-menu__icon`, size: 16, strokeWidth: 2.5 })
        ])
      }),
    ])
  }
})