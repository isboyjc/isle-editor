import { h, markRaw, reactive, render } from 'vue'

/**
 * This class is used to render Vue components inside the editor.
 */
export class VueRenderer {
  constructor(component, { props = {}, editor }) {
    this.editor = editor
    this.component = markRaw(component)
    this.el = document.createElement('div')
    this.props = reactive(props)
    this.renderedComponent = this.renderComponent()
  }

  get element() {
    return this.renderedComponent.el
  }

  get ref() {
    // Composition API
    if (this.renderedComponent.vNode?.component?.exposed) {
      return this.renderedComponent.vNode.component.exposed
    }
    // Option API
    return this.renderedComponent.vNode?.component?.proxy
  }

  renderComponent() {
    let vNode = h(this.component, this.props)

    if (this.editor.appContext) {
      vNode.appContext = this.editor.appContext
    }
    if (typeof document !== 'undefined' && this.el) {
      render(vNode, this.el)
    }

    const destroy = () => {
      if (this.el) {
        render(null, this.el)
      }
      this.el = null
      vNode = null
    }

    return { vNode, destroy, el: this.el ? this.el.firstElementChild : null }
  }

  updateProps(props = {}) {
    Object.entries(props).forEach(([key, value]) => {
      this.props[key] = value
    })
    this.renderComponent()
  }

  destroy() {
    this.renderedComponent.destroy()
  }
}