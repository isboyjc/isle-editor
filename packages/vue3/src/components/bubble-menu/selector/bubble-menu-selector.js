import { defineComponent, ref, h, onMounted } from 'vue'
import { prefixClass } from '@isle-editor/core'
import { getIcon } from '@/utils/icon'
import ButtonLink from '../special-button/button-link'
import ButtonColor from '../special-button/button-color'
import ButtonBackground from '../special-button/button-background'
import ButtonStyle from '../special-button/button-style'
import ButtonTextAlign from '../special-button/button-text-align'

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
    const slotPrefix = slots['prefix']
    const slotSuffix = slots['suffix']
    const slotMore = slots['more']

    return () => h('div', {  class: `${prefixClass}-bubble-menu` }, [
      slotPrefix && slotPrefix({ editor: props.editor }),
      ...props.menus.map(menu => {
        // 检查是否存在对应的具名插槽
        const slotName = slots[menu.name]
        
        if (slotName) {
          // 如果存在具名插槽，使用插槽内容
          return slotName({
            editor: props.editor,
            ...menu
          })
        }

        if (menu.name === 'link') {
          return h(ButtonLink, { editor: props.editor, menu: props.menus.find(menu => menu.name === 'link') })
        }

        if (menu.name === 'color') {
          return h(ButtonColor, { editor: props.editor, menu: props.menus.find(menu => menu.name === 'color') })
        }

        if (menu.name === 'background') {
          return h(ButtonBackground, { editor: props.editor, menu: props.menus.find(menu => menu.name === 'background') })
        }

        if (menu.name === 'style') {
          return h(ButtonStyle, { editor: props.editor, menu: props.menus.find(menu => menu.name === 'style') })
        }

        if (menu.name === 'textAlign') {
          return h(ButtonTextAlign, { editor: props.editor, menu: props.menus.find(menu => menu.name === 'textAlign') })
        }
        
        // 默认渲染逻辑
        return h('button', {
          class: [`${prefixClass}-bubble-menu__btn`, { active: menu?.isActive({ editor: props.editor }) }],
          onClick: () => menu.command({editor: props.editor}),
          onMouseDown: (evt) => evt.preventDefault()
        }, [
          h(getIcon(menu.name), { class: `${prefixClass}-bubble-menu__icon`, size: 16, strokeWidth: 2.5 })
        ])
      }),
      slotSuffix && slotSuffix({ editor: props.editor }),
      h('div', { class: `${prefixClass}-bubble-menu__divider` }),
      h('button', {
        class: [`${prefixClass}-bubble-menu__btn`],
        onClick: () => props.editor.chain().focus().unsetAllMarks().run(),
        onMouseDown: (evt) => evt.preventDefault()
      }, [
        h(getIcon('textClear'), { class: `${prefixClass}-bubble-menu__icon`, size: 16, strokeWidth: 2.5 })
      ]),
      slotMore && slotMore({ editor: props.editor })
    ])
  }
})