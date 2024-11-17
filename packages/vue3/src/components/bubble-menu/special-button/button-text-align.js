import { defineComponent, ref, h, onMounted, onBeforeUnmount, computed } from 'vue'
import { prefixClass, t } from '@isle-editor/core'
import { getIcon } from '@/utils/icon'
import { createTippy } from '@/utils/tippy'
import Tooltip from '@/components/tooltip'

export default defineComponent({
  name: 'ButtonTextAlign',
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

    const activeAlign = computed(() => {
      return props.menu.list?.find(v => v.isActive({ editor: props.editor }))
    })

    onMounted(() => {
      tippyInstance.value = createTippy(triggerRef.value, {
        content: contentRef.value,
        trigger: 'click',
        hideOnClick: true,
        placement: 'top',
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
      h(Tooltip, { text: t(props.menu.title) }, {
        default: () => h('button', {
          ref: triggerRef,
          class: [`${prefixClass}-bubble-menu__btn`, { 'semi-active': isShown.value }],
          onMouseDown: (evt) => evt.preventDefault()
        }, [
          h(getIcon(activeAlign.value?.title || 'alignLeft'), { class: `${prefixClass}-bubble-menu__icon`, size: 15, strokeWidth: 2.5 })
        ])
      }),
      h('div', { ref: contentRef, class: `${prefixClass}-bubble-menu-text-align` }, [
        ...props.menu.list.map(item => h(Tooltip, { text: t(item.title), shortcutkeys: item.shortcutkeys }, {
          default: () => h('button', { class: [`${prefixClass}-bubble-menu__btn`, { 'active': activeAlign.value?.title === item.title }], onClick: () => item.command({ editor: props.editor }) }, [
            h(getIcon(item.title), { class: `${prefixClass}-bubble-menu__icon`, size: 15, strokeWidth: 2.5 })
          ])
        }))
      ])
    ])
  }
})
