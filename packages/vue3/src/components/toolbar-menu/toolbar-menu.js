import { defineComponent } from 'vue'
import { prefixClass } from '@isle-editor/core'

export default defineComponent({
  name: 'IsleEditorToolbar',
  setup() {
    return () => h('div', { class: `${prefixClass}-toolbar-menu` }, 'toolbar-menu')
  }
})
