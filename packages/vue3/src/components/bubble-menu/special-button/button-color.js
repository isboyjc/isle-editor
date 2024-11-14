import { defineComponent, ref, h, onMounted, onBeforeUnmount, computed } from 'vue'
import { prefixClass, t } from '@isle/editor'
import { getIcon } from '@/utils/icon'
import { createTippy } from '@/utils/tippy'

export default defineComponent({
  name: 'ButtonColor',
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
    const colorTriggerRef = ref(null)
    const colorContentRef = ref(null)
    const tippyInstance = ref(null)
    const isShown = ref(false)

    const activeColor = computed(() => {
      return props.menu.colors.find(v =>
        props.menu.isActive({ editor: props.editor, color: v.color })
      )
    })

    onMounted(() => {
      tippyInstance.value = createTippy(colorTriggerRef.value, {
        content: colorContentRef.value,
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
      h('button', {
        ref: colorTriggerRef,
        class: [`${prefixClass}-bubble-menu__btn`, { 'semi-active': isShown.value }],
        onMouseDown: (evt) => evt.preventDefault()
      }, [
        h('div', { class: `${prefixClass}-bubble-menu__icon-box`, style: { color: activeColor.value?.color } }, [
          h(getIcon(props.menu.name || 'color'), { class: `${prefixClass}-bubble-menu__icon`, size: 15, strokeWidth: 2.5 })
        ])
      ]),
      h('div', { ref: colorContentRef, class: `${prefixClass}-bubble-menu-color` }, [
        h('div', { class: `${prefixClass}-bubble-menu-color__title` }, [
          h('span', { class: `${prefixClass}-bubble-menu-color__title-text` }, t(props.menu.name)),
          h('span', { class: `${prefixClass}-bubble-menu-color__default`, onClick: () => props.menu.command({ color: '', editor: props.editor }) })
        ]),
        h('div', { class: `${prefixClass}-bubble-menu-color__box` }, [
          ...props.menu.colors.map(({color}) => h(
            'div',
            {
              class: `${prefixClass}-bubble-menu-color__box-item`,
              style: { color },
              onClick: () => props.menu.command({ color: color, editor: props.editor })
            },
            [
              h(getIcon(props.menu.name), { class: `${prefixClass}-bubble-menu-color__box-item-icon`, size: 14, strokeWidth: 2 })
            ]
          ))
        ])
      ])
    ])
  }
})
