import { defineComponent, ref, h, onMounted } from 'vue'
import { prefixClass } from '@isle/editor'
import { getIcon } from '@/utils/icon'
import { createTippy } from '@/utils/tippy'
import BubbleLink from './bubble-menu-link'

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
    const linkTriggerRef = ref(null)
    const linkMenuBubbleRef = ref(null)
    const linkMenu = props.menus.find(menu => menu.name === 'link')

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
          return h('button', {
            ref: linkTriggerRef,
            class: [`${prefixClass}-bubble-menu__btn`, { active: linkMenuBubbleRef.value?.isShown }],
            onMouseDown: (evt) => evt.preventDefault()
          }, [
            h(getIcon(menu.name), { class: `${prefixClass}-bubble-menu__icon`, size: 15, strokeWidth: 2.5 })
          ])
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
      linkTriggerRef.value && linkMenu && h(BubbleLink, { ref: linkMenuBubbleRef, triggerElement: linkTriggerRef.value, editor: props.editor, menu: linkMenu })
    ])
  }
})