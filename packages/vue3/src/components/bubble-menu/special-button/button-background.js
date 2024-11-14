import { defineComponent, ref, h, onMounted, onBeforeUnmount, computed } from 'vue'
import { prefixClass, t } from '@isle/editor'
import { getIcon } from '@/utils/icon'
import { createTippy } from '@/utils/tippy'

export default defineComponent({
  name: 'ButtonBackground',
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
    const backgroundTriggerRef = ref(null)
    const backgroundContentRef = ref(null)
    const tippyInstance = ref(null)
    const isShown = ref(false)

    const activeColor = computed(() => {
      return props.menu.colors.find(v =>
        props.menu.isActive({ editor: props.editor, color: v.color })
      )
    })

    onMounted(() => {
      tippyInstance.value = createTippy(backgroundTriggerRef.value, {
        content: backgroundContentRef.value,
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
        ref: backgroundTriggerRef,
        class: [`${prefixClass}-bubble-menu__btn`, { 'semi-active': isShown.value }],
        onMouseDown: (evt) => evt.preventDefault()
      }, [
        h('div', { class: `${prefixClass}-bubble-menu__icon-box`, style: { backgroundColor: activeColor.value?.color } }, [
          h(getIcon(props.menu.name || 'background'), { class: `${prefixClass}-bubble-menu__icon`, size: 15, strokeWidth: 2.5 })
        ])
      ]),
      h('div', { ref: backgroundContentRef, class: `${prefixClass}-bubble-menu-background` }, [
        h('div', { class: `${prefixClass}-bubble-menu-background__title` }, [
          h('span', { class: `${prefixClass}-bubble-menu-background__title-text` }, t(props.menu.name)),
          h('span', { class: `${prefixClass}-bubble-menu-background__default`, onClick: () => props.menu.command({ color: '', editor: props.editor }) })
        ]),
        h('div', { class: `${prefixClass}-bubble-menu-background__box` }, [
          ...props.menu.colors.map(({color}) => h(
            'div',
            {
              class: `${prefixClass}-bubble-menu-background__box-item`,
              style: { backgroundColor: color },
              onClick: () => props.menu.command({ color: color, editor: props.editor })
            }
          ))
        ])
      ])
    ])
  }
})
