export default defineComponent({
  name: 'IsleEditorDirectory',
  props: {
    editor: {
      type: Object,
      required: true
    }
  },
  setup() {
    return () => h('div', { class: `${prefixClass}-directory-menu` }, 'directory-menu')
  }
})
