import { BubbleMenuPlugin, prefixClass, isNodeSelection, isTextSelection } from '@isle/editor'
import { AllSelection, TextSelection } from 'prosemirror-state'
import { CellSelection } from 'prosemirror-tables'
import { sortArrayByPropertyArray } from '../../utils/array.js'
import { getIcon } from '../../icons/index.js'
import {
  defineComponent,
  h,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
  computed
} from 'vue'

const BUBBLE_MENU_SORT = [
  'bold',
  'italic',
  'underline',
  'strike',
  'code',
  'subscript',
  'superscript',
]

export default defineComponent({
  name: 'IsleEditorBubble',
  props: {
    pluginKey: {
      type: [String, Object],
      default: 'isleEditorBubble',
    },

    editor: {
      type: Object,
      required: true,
    },

    updateDelay: {
      type: Number,
      default: 100,
    },

    tippyOptions: {
      type: Object,
      default: () => ({
        appendTo: () => document.body,
        maxWidth: 'none',
        moveTransition: 'transform 0.15s ease-out',
        onHidden: () => {
          // console.log('IsleEditor bubbleMenu onhidden')
        }
      }),
    },

    shouldShow: {
      type: [Function, null],
      default: null,
    },
  },
  setup(props, { slots }) {
    const root = ref(null)
    const registered = ref(false)

    // 判断当前选中是否为链接
    const isLink = computed(() =>
      !props.editor ? false : props.editor.isActive('link')
    )
    // 判断当前选中是否为表格
    const isTable = computed(() =>
      !props.editor ? false : props.editor.state.selection instanceof CellSelection
    )
    // 判断当前选中是否为文本
    const isText = computed(() =>!props.editor
      ? false
      : props.editor.state.selection instanceof TextSelection ||
        props.editor.state.selection instanceof AllSelection
    )

    const shouldShowDefault = ({ state, from, to, editor }) => {
      const { doc, selection } = state
      const { empty } = selection
      const isEmptyTextBlock =
        !doc.textBetween(from, to).length && isTextSelection(state.selection)
    
      // 内容为空或空文本块不展示气泡菜单
      if (empty || isEmptyTextBlock) return false
    
      // 如果出现以下情况，则不显示气泡菜单：
      // 代码块 / 图片 / 该选择是一个节点选择（对于拖动控制柄）
      // 图片也是节点选择之一
      // if (editor.isActive('image')) {
      //   console.log(selection.node)
      //   return !!node.attrs?.src
      // }
      if (editor.isActive('codeblock') || isNodeSelection(selection)) {
        return false
      }
    
      console.log(isText.value, isLink.value, isTable.value)
      return isText.value || isLink.value || isTable.value
    }

    const registerPlugin = () => {
      if (registered.value) return
      const {
        updateDelay,
        editor,
        pluginKey,
        shouldShow,
        tippyOptions,
      } = props

      editor.registerPlugin(BubbleMenuPlugin({
        updateDelay,
        editor,
        element: root.value,
        pluginKey,
        shouldShow: shouldShow || shouldShowDefault,
        tippyOptions,
      }))

      registered.value = true
    }


    const bubbleMenus = computed(() => {
      if (!props.editor?.extensionManager?.extensions) {
        return []
      }
  
      const markExtensions = props.editor.extensionManager.extensions.filter(
        item => item.type === 'mark'
      )
      
      const sortedExtensions = sortArrayByPropertyArray(
        markExtensions,
        BUBBLE_MENU_SORT,
        'name'
      )
  
      return sortedExtensions.map(item => ({
        name: item.name,
        ...item?.options
      }))
    })

    const init = () => {
      if (!props?.editor) return
      registerPlugin()
      console.log(bubbleMenus.value)
    }

    watch(() => props.editor, () => {
      init()
    })
    onMounted(() => {
      init()
    })

    onBeforeUnmount(() => {
      const { pluginKey, editor } = props
      editor.unregisterPlugin(pluginKey)
      registered.value = false
    })

    return () => h('div', { ref: root, class: `${prefixClass}-bubble-menu` }, [
      ...bubbleMenus.value.map(menu => {
        // 检查是否存在对应的具名插槽
        const slotName = slots[menu.name]
        
        if (slotName) {
          // 如果存在具名插槽，使用插槽内容
          return slotName({
            ...menu
          })
        }
        
        // 默认渲染逻辑
        return h('button', {
          class: [`${prefixClass}-bubble-menu__btn`, { active: menu?.isActive ? menu.isActive({ editor: props.editor }) : false }],
          onClick: () => menu.command({editor: props.editor}),
          onMouseDown: (evt) => evt.preventDefault()
        }, [
          h(getIcon(menu.name), { class: `${prefixClass}-bubble-menu__icon`, size: 17, strokeWidth: 2.5 })
        ])
      })
    ])
  }
})
