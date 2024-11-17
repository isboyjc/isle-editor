import { defineComponent, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { prefixClass, t } from '@isle-editor/core'
import { createTippy } from '@/utils/tippy'
import { getIcon } from '@/utils/icon'
import Tooltip from '@/components/tooltip'

export default defineComponent({
  name: 'ButtonLink',
  props: {
    editor: {
      type: Object,
      required: true
    },
    menu: {
      type: Object,
      required: true
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { expose}) {
    const linkTriggerRef = ref(null)
    const linkContentRef = ref(null)
    const linkInputRef = ref(null)
    const tippyInstance = ref(null)
    const isShown = ref(false)
    const openInNewTab = ref(true)

    watchEffect(() => {
      if (props.isEdit) {
        const linkData = props.editor.getAttributes('link')
        if (linkInputRef.value && linkData.href) {
          linkInputRef.value.value = linkData.href
        }
      }
    })

    onMounted(() => {
      tippyInstance.value = createTippy(linkTriggerRef.value, {
        content: linkContentRef.value,
        trigger: 'click',
        hideOnClick: true,
        placement: 'bottom',
        // getReferenceClientRect: () => {
        //   Get the coordinates of the selection so that the bubble menu follows the selection.
        //   const { view } = props.editor
        //   const { from, to } = props.editor.state.selection
        //   if (from === to) return null          
        //   const domRect = view.coordsAtPos(from)
        //   const domRectEnd = view.coordsAtPos(to)
        //   return {
        //     top: domRect.top,
        //     bottom: domRect.bottom,
        //     left: domRect.left,
        //     right: domRectEnd.right,
        //     width: domRectEnd.right - domRect.left,
        //     height: domRect.bottom - domRect.top,
        //   }
        // },
        // appendTo: document.body,
        onShown: () => {
          isShown.value = true

          nextTick(() => {
            linkInputRef.value.focus()
          })
        },
        onHide: () => {
          isShown.value = false
        }
      })
    })

    onBeforeUnmount(() => {
      tippyInstance.value && tippyInstance.value.destroy()
    })

    expose({
      show: () => tippyInstance.value?.show(),
      hide: () => tippyInstance.value?.hide(),
      isShown
    })

    return () => h('div', {}, [
      h(Tooltip, { text: props.isEdit ? t('edit') : t(props.menu.title) }, {
        default: () => h('div', {ref: linkTriggerRef }, [
          props.isEdit ? (
            h('button', {
              class: [`${prefixClass}-bubble-menu__btn`, { active: isShown.value }],
              onMouseDown: (evt) => evt.preventDefault()
            }, [
              h(getIcon('edit'), { class: `${prefixClass}-bubble-menu__icon`, size: 15, strokeWidth: 2.5 })
            ])
          ) : (
            h('button', {
              class: [`${prefixClass}-bubble-menu__btn`, { active: isShown.value }],
              onMouseDown: (evt) => evt.preventDefault()
            }, [
              h(getIcon(props.menu.name), { class: `${prefixClass}-bubble-menu__icon`, size: 15, strokeWidth: 2.5 })
            ])
          )
        ])
      }),
      h('div', { ref: linkContentRef, class: `${prefixClass}-bubble-menu-link` }, [
        h('div', { class: `${prefixClass}-bubble-menu-link__input` }, [
          h(getIcon(props.menu.name || 'link'), { class: `${prefixClass}-bubble-menu-link__icon`, size: 15, strokeWidth: 2.5 }),
          h('input', {
            ref: linkInputRef,
            class: `${prefixClass}-bubble-menu-link__input-inner`,
            placeholder: t('linkPlaceholder'),
            onKeydown: (event) => {
              if (event.key === 'Enter') {
                const url = event.target.value
                if (url && url.trim()) {
                  props.menu.command({ editor: props.editor, href: url, target: openInNewTab.value ? '_blank' : null })
                  tippyInstance.value?.hide()
                }
              }
            }
          })
        ])
      ])
    ])
  }
})