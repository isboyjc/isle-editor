import { defineComponent, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { prefixClass } from '@isle/editor'
import { createTippy } from '@/utils/tippy'
import { getIcon } from '@/utils/icon'

export default defineComponent({
  name: 'BubbleLink',
  props: {
    editor: {
      type: Object,
      required: true
    },
    menu: {
      type: Object,
      required: true
    },
    triggerElement: {
      type: Object,
      required: true
    }
  },
  setup(props, { expose}) {
    const rootRef = ref(null)
    const linkInputRef = ref(null)
    const tippyInstance = ref(null)
    const isShown = ref(false)
    const openInNewTab = ref(true)

    onMounted(() => {
      tippyInstance.value = createTippy(props.triggerElement, {
        content: rootRef.value,
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

    return () => h('div', { ref: rootRef, class: `${prefixClass}-bubble-menu-link` }, [
      h('div', { class: `${prefixClass}-bubble-menu-link__input` }, [
        h(getIcon(props.menu?.name || 'link'), { class: `${prefixClass}-bubble-menu-link__icon`, size: 15, strokeWidth: 2.5 }),
        h('input', {
          ref: linkInputRef,
          class: `${prefixClass}-bubble-menu-link__input-inner`,
          placeholder: '请输入链接',
          onFocus: () => {
            console.log('focus')
          },
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
  }
})