import { defineComponent, ref, watchEffect } from 'vue'
import { prefixClass } from '@isle/editor'
import { getIcon } from '@/utils/icon'

export default defineComponent({
  name: 'BubbleLinkSelector',
  props: {
    editor: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const href = ref(null)
    const target = ref('_blank')

    watchEffect(() => {
      const linkData = props.editor.getAttributes('link')
      href.value = linkData.href
      target.value = linkData.target || ''
    })

    const copyOk = ref(false)
    function clipboardLink() {
      navigator.clipboard.writeText(href.value)
      copyOk.value = true
      setTimeout(() => {
        copyOk.value = false
      }, 300)
    }

    function unLink() {
      if (!props.editor) return
      props.editor.chain().focus().unsetLink().run()
    }

    function openLink() {
      window.open(href.value, target.value)
    }

    return () => h('div', { class: `${prefixClass}-bubble-menu` }, [
      h('button', {
        class: [`${prefixClass}-bubble-menu__btn`],
        onClick: openLink,
        onMouseDown: (evt) => evt.preventDefault()
      }, [
        h(getIcon('openRight'), { class: `${prefixClass}-bubble-menu__icon`, size: 15, strokeWidth: 2.5 }),
        h('span', { class: `${prefixClass}-bubble-menu__btn-text` }, href.value)
      ]),
      h('div', { class: `${prefixClass}-bubble-menu__divider` }),
      h('button', {
        class: [`${prefixClass}-bubble-menu__btn`],
        onMouseDown: (evt) => evt.preventDefault()
      }, [
        h(getIcon('edit'), { class: `${prefixClass}-bubble-menu__icon`, size: 15, strokeWidth: 2.5 })
      ]),
      h('button', {
        class: [`${prefixClass}-bubble-menu__btn`],
        onClick: clipboardLink,
        onMouseDown: (evt) => evt.preventDefault()
      }, [
        copyOk.value ? 
          h(getIcon('check'), { class: `${prefixClass}-bubble-menu__icon`, size: 15, strokeWidth: 2.5 }) : 
          h(getIcon('copy'), { class: `${prefixClass}-bubble-menu__icon`, size: 15, strokeWidth: 2.5 })
      ]),
      h('div', { class: `${prefixClass}-bubble-menu__divider` }),
      h('button', {
        class: [`${prefixClass}-bubble-menu__btn`, 'red'],
        onClick: unLink,
        onMouseDown: (evt) => evt.preventDefault()
      }, [
        h(getIcon('unlink'), { class: `${prefixClass}-bubble-menu__icon`, size: 15, strokeWidth: 2.5 })
      ])
    ])
  }
})