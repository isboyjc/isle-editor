// more info: https://github.com/vueditor/tiptap-extension-handle
import { Extension, isMacOS, createStyleTag } from '@tiptap/core'
import { NodeSelection, Plugin, PluginKey } from '@tiptap/pm/state'
import { computePosition, offset } from '@floating-ui/dom'
import { debounce } from 'lodash'

export const dragHandlePluginKey = new PluginKey('dragHandle')

// 生成样式
export function getStyle(handleId, handleBarId) {
  return `
    #${handleId} {
      position: fixed;
      left: 0;
      top: 0;
      font-size: 16px;
      width: 20px;
      height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: transform 0.3s ease;
    }

    #${handleBarId} {
      cursor: pointer;
      padding: 0.3rem;
      border-radius: 0.375rem;
      transition: background-color 0.3s ease;
    }

    #${handleBarId}::after {
      display: inline-block;
      width: 1em;
      height: 1em;
      vertical-align: -0.125em;
      content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Cpath fill='%23000' fill-rule='evenodd' d='M19 10a4 4 0 1 1-8 0a4 4 0 0 1 8 0m-4 18a4 4 0 1 0 0-8a4 4 0 0 0 0 8m0 14a4 4 0 1 0 0-8a4 4 0 0 0 0 8m22-32a4 4 0 1 1-8 0a4 4 0 0 1 8 0m-4 18a4 4 0 1 0 0-8a4 4 0 0 0 0 8m0 14a4 4 0 1 0 0-8a4 4 0 0 0 0 8' clip-rule='evenodd'/%3E%3C/svg%3E");
    }

    #${handleBarId}:hover {
      background-color:  rgba(var(--isle-editor-color-border-val), 0.5);
    }

    #${handleBarId}:active {
      background-color:  rgba(var(--isle-editor-color-border-val), 1);
    }
    `
}

// 鼠标进入编辑器
const onMouseenterDebounce = debounce((view) => {
  const editorDom = view.dom
  const { x, width } = editorDom.getBoundingClientRect()
  view.dispatch(view.state.tr.setMeta(dragHandlePluginKey, {
    minX: x,
    maxX: x + width,
    pos: null,
  }))
}, 10)
// 鼠标在编辑器中移动
const onMousemoveDebounce = debounce((view, e) => {
  view.dispatch(view.state.tr.setMeta(dragHandlePluginKey, {
    x: e.clientX,
    y: e.clientY,
    pos: null,
  }))
}, 10)
// 鼠标离开编辑器
const onMouseleaveDebounce = debounce((view, e, options) => {
  const toDom = e.relatedTarget
  const handleDom = document.getElementById(options.handleId)
  if (handleDom?.isEqualNode(toDom) || handleDom?.contains(toDom)) {
    return
  }

  view.dispatch(view.state.tr.setMeta(dragHandlePluginKey, {
    x: null,
    y: null,
    pos: null,
  }))
}, 10)

// 拖拽句柄视图类
export class HandleView {
  onDragStart = (e) => {
    if (!this.getTargetDom() || !this.getTargetPos()) {
      return
    }

    const nodeBox = this.getTargetDom().getBoundingClientRect()
    const handleBox = this.handleElement.getBoundingClientRect()

    const x = handleBox.x - nodeBox.x + e.offsetX
    const y = handleBox.y - nodeBox.y + e.offsetY
    e.dataTransfer?.setDragImage(this.getTargetDom(), x, y)

    const selection = NodeSelection.create(this.editorView.state.doc, this.getTargetPos() - 1)
    const transaction = this.editorView.state.tr.setSelection(selection)
    this.editorView.dispatch(transaction)

    this.editorView.dragging = {
      slice: selection.content(),
      move: !e[isMacOS() ? 'altKey' : 'ctrlKey'],
    }
  }

  constructor(options) {
    // 初始化拖拽句柄视图
    this.editorView = options.editorView
    this.handleElement = document.getElementById(options.handleId)
    this.handleBarElement = this.handleElement.querySelector(`#${options.handleBarId}`)
    this.dragHandlePluginKey = options.dragHandlePluginKey

    this.handleElement?.addEventListener('dragstart', this.onDragStart)
  }

  // 获取目标位置
  getTargetPos() {
    if (!this.editorView.editable) {
      return
    }

    const state = this.dragHandlePluginKey.getState(this.editorView.state)
    if (!state) {
      return null
    }

    if (state?.pos) {
      const { node } = this.editorView.domAtPos(state.pos)
      const { x, y } = node.getBoundingClientRect()

      this.editorView.dispatch(this.editorView.state.tr.setMeta(dragHandlePluginKey, {
        x,
        y,
        pos: null,
      }))

      return state.pos
    }

    const { x, y, minX, maxX } = state
    const left = Math.min(Math.max(x, minX), maxX)
    const top = y
    if (Number.isNaN(left) || Number.isNaN(top)) {
      return null
    }

    const posInfo = this.editorView.posAtCoords({
      left,
      top: top,
    })
    if (!posInfo) {
      return null
    }

    const { pos } = posInfo

    return this.editorView.state.doc.resolve(pos).start(1)
  }

  // 获取目标DOM元素
  getTargetDom() {
    const pos = this.getTargetPos()
    if (!pos) {
      return null
    }

    return this.editorView.nodeDOM(pos - 1)
  }

  // 更新拖拽句柄位置
  updatePosition(targetDom) {
    computePosition(targetDom, this.handleElement, {
      placement: 'left-start',
      strategy: 'fixed',
      middleware: [offset(8)],
    }).then(({ x, y }) => {
      Object.assign(this.handleElement.style, {
        transform: `translateX(${x}px) translateY(${y}px)`,
        opacity: 1,
      })
    })
  }

  // 更新视图
  update() {
    const targetDom = this.getTargetDom()

    if (targetDom) {
      this.updatePosition(targetDom)
    }
    else if (this.handleElement) {
      let transform = this.handleElement.style.transform
      let opacity = this.handleElement.style.opacity
      if (transform) {
        transform = transform.replace(/translateY\(.+\)/, 'translateY(-128px)')
        opacity = 0
      }
      else {
        transform = 'translateY(-128px)'
        opacity = 0
      }

      Object.assign(this.handleElement.style, {
        // transform,
        opacity,
      })
    }
  }

  // 销毁视图
  destroy() {
    this.handleElement.removeEventListener('dragstart', this.onDragStart)
  }
}

// 创建拖拽句柄插件
export function handlePlugin(options) {
  const plugin = new Plugin({
    key: dragHandlePluginKey,
    state: {
      init() {
        return {
          minX: 0,
          maxX: Number.MAX_SAFE_INTEGER,
          x: null,
          y: null,
          pos: null,
        }
      },
      apply(tr, value) {
        const newState = Object.assign({}, value, tr.getMeta(dragHandlePluginKey))
        const isDrop = tr.getMeta('uiEvent') === 'drop'

        if (isDrop) {
          const nodeSelection = tr.selection
          newState.pos = nodeSelection.anchor + 1
        }

        return newState
      },
    },
    props: {
      handleDOMEvents: {
        mouseenter(view) {
          onMouseenterDebounce(view)
        },

        mousemove(view, e) {
          onMousemoveDebounce(view, e)
        },
        mouseleave(view, e) {
          onMouseleaveDebounce(view, e, options)
        },
      },
    },
    view(view) {
      return new HandleView({
        editorView: view,
        dragHandlePluginKey,
        ...options,
      })
    },
  })

  return plugin
}


// 创建拖拽句柄扩展
export default Extension.create({
  name: 'dragHandle',

  addOptions() {
    return {
      handleId: 'editor-handle',
      handleBarId: 'editor-handle-bar',
    }
  },

  addProseMirrorPlugins() {
    return [
      handlePlugin({
        handleId: this.options.handleId,
        handleBarId: this.options.handleBarId,
      }),
    ]
  },

  onBeforeCreate() {
    if (document.getElementById(this.options.handleId)) {
      return
    }

    const handleElement = document.createElement('div')
    handleElement.setAttribute('id', this.options.handleId)
    handleElement.setAttribute('data-editor', 'true')

    const handleBarElement = document.createElement('div')
    handleBarElement.setAttribute('id', this.options.handleBarId)
    handleBarElement.classList.add('icon-park-outline--drag')
    handleBarElement.setAttribute('draggable', 'true')

    handleElement.appendChild(handleBarElement)
    createStyleTag(getStyle(this.options.handleId, this.options.handleBarId), undefined, this.options.handleId)
    document.body.appendChild(handleElement)
  },
  onDestroy() {
    // disable in development, for StrictMode in React dev
    if (!import.meta.env.PROD) {
      return
    }

    const handleElement = document.getElementById(this.options.handleId)

    if (handleElement?.getAttribute('data-editor') === 'true') {
      handleElement.remove()
    }
  },
})