import { defineComponent, ref, h, onMounted, onBeforeUnmount, computed } from 'vue'
import { prefixClass, t } from '@isle-editor/core'
import { getIcon } from '@/utils/icon'
import { createTippy } from '@/utils/tippy'
import Tooltip from '@/components/tooltip'

export default defineComponent({
  name: 'ButtonStyle',
  props: {
    editor: {
      type: Object,
      required: true
    },
    menu: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const triggerRef = ref(null)
    const contentRef = ref(null)
    const tippyInstance = ref(null)
    const isShown = ref(false)

    const activeColor = computed(() => {
      return props.menu.color.colors.find(v =>
        props.menu.color.isActive({ editor: props.editor, color: v.color })
      )
    })
    const activeBackground = computed(() => {
      return props.menu.background.colors.find(v =>
        props.menu.background.isActive({ editor: props.editor, color: v.color })
      )
    })

    onMounted(() => {
      tippyInstance.value = createTippy(triggerRef.value, {
        content: contentRef.value,
        trigger: 'click',
        hideOnClick: true,
        placement: 'bottom',
        onShown: () => {
          isShown.value = true
        },
        onHide: () => {
          isShown.value = false
        }
      })
    })

    onBeforeUnmount(() => {
      tippyInstance.value && tippyInstance.value.destroy()
    })

    return () => h('div', {}, [
      h(Tooltip, { text: '文字样式', shortcutkeys: 'Mod-B', tippyOptions: { disabled: isShown.value } }, {
        default: () => h('button', {
          ref: triggerRef,
          class: [`${prefixClass}-bubble-menu__btn`, { 'semi-active': isShown.value }],
          onMouseDown: (evt) => evt.preventDefault()
        }, [
          h('div', { class: `${prefixClass}-bubble-menu__icon-box`, style: { color: activeColor.value?.color, background: activeBackground.value?.color } }, [
            h(getIcon(props.menu.color.name || 'color'), { class: `${prefixClass}-bubble-menu__icon`, size: 15, strokeWidth: 2.5 })
          ])
        ])
      }),
      h('div', { ref: contentRef, class: `${prefixClass}-bubble-menu-style` }, [
        h('div', { class: `${prefixClass}-bubble-menu-style__title` }, [
          h('span', { class: `${prefixClass}-bubble-menu-style__title-text` }, t(props.menu.color.name)),
          h('span', { class: `${prefixClass}-bubble-menu-style__default`, onClick: () => props.menu.color.command({ color: '', editor: props.editor }) })
        ]),
        h('div', { class: `${prefixClass}-bubble-menu-style__box` }, [
          ...props.menu.color.colors.map(({color}) => h(
            'div',
            {
              class: `${prefixClass}-bubble-menu-style__box-item`,
              style: { color },
              onClick: () => props.menu.color.command({ color: color, editor: props.editor })
            },
            [
              h(getIcon(props.menu.color.name), { class: `${prefixClass}-bubble-menu-style__box-item-icon`, size: 14, strokeWidth: 2 })
            ]
          ))
        ]),
        h('div', { class: `${prefixClass}-bubble-menu-style__title mt-2` }, [
          h('span', { class: `${prefixClass}-bubble-menu-style__title-text` }, t(props.menu.background.name)),
          h('span', { class: `${prefixClass}-bubble-menu-style__default`, onClick: () => props.menu.background.command({ color: '', editor: props.editor }) })
        ]),
        h('div', { class: `${prefixClass}-bubble-menu-style__box` }, [
          ...props.menu.background.colors.map(({color}) => h(
            'div',
            {
              class: `${prefixClass}-bubble-menu-style__box-item`,
              style: { background: color },
              onClick: () => props.menu.background.command({ color: color, editor: props.editor })
            }
          ))
        ])
      ])
    ])
  }
})
