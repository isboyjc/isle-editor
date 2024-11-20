import Placeholder from '@tiptap/extension-placeholder'
import { prefixClass } from '@/utils/prefix'
import { t } from '@/locales'

export default Placeholder.extend({
  addOptions() {
    return {
      emptyEditorClass: `${prefixClass}-empty`,
      emptyNodeClass: `${prefixClass}-node-empty`,
      placeholder: t('placeholder'),
      showOnlyCurrent: true,
      showOnlyWhenEditable: true
    }
  }
})
