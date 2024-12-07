import {
  h,
  markRaw,
  reactive,
  render,
  defineComponent,
  provide,
  ref,
} from "vue";
import { NodeView } from "@isle-editor/core";

/**
 * This class is used to render Vue components inside the editor.
 */
export class VueRenderer {
  constructor(component, { props = {}, editor }) {
    this.editor = editor;
    this.component = markRaw(component);
    this.el = document.createElement("div");
    this.props = reactive(props);
    this.renderedComponent = this.renderComponent();
  }

  get element() {
    return this.renderedComponent.el;
  }

  get ref() {
    // Composition API
    if (this.renderedComponent.vNode?.component?.exposed) {
      return this.renderedComponent.vNode.component.exposed;
    }
    // Option API
    return this.renderedComponent.vNode?.component?.proxy;
  }

  renderComponent() {
    let vNode = h(this.component, this.props);

    if (this.editor.appContext) {
      vNode.appContext = this.editor.appContext;
    }
    if (typeof document !== "undefined" && this.el) {
      render(vNode, this.el);
    }

    const destroy = () => {
      if (this.el) {
        render(null, this.el);
      }
      this.el = null;
      vNode = null;
    };

    return { vNode, destroy, el: this.el ? this.el.firstElementChild : null };
  }

  updateProps(props = {}) {
    Object.entries(props).forEach(([key, value]) => {
      this.props[key] = value;
    });
    this.renderComponent();
  }

  destroy() {
    this.renderedComponent.destroy();
  }
}

class VueNodeView extends NodeView {
  mount() {
    const props = {
      editor: this.editor,
      node: this.node,
      decorations: this.decorations,
      innerDecorations: this.innerDecorations,
      view: this.view,
      selected: false,
      extension: this.extension,
      HTMLAttributes: this.HTMLAttributes,
      getPos: () => this.getPos(),
      updateAttributes: (attributes = {}) => this.updateAttributes(attributes),
      deleteNode: () => this.deleteNode(),
    };

    const onDragStart = this.onDragStart.bind(this);

    this.decorationClasses = ref(this.getDecorationClasses());

    const extendedComponent = defineComponent({
      extends: { ...this.component },
      props: Object.keys(props),
      template: this.component.template,
      setup: (reactiveProps) => {
        provide("onDragStart", onDragStart);
        provide("decorationClasses", this.decorationClasses);

        return this.component.setup?.(reactiveProps, {
          expose: () => undefined,
        });
      },
      // add support for scoped styles
      // @ts-ignore
      // eslint-disable-next-line
      __scopeId: this.component.__scopeId,
      // add support for CSS Modules
      // @ts-ignore
      // eslint-disable-next-line
      __cssModules: this.component.__cssModules,
      // add support for vue devtools
      // @ts-ignore
      // eslint-disable-next-line
      __name: this.component.__name,
      // @ts-ignore
      // eslint-disable-next-line
      __file: this.component.__file,
    });

    this.handleSelectionUpdate = this.handleSelectionUpdate.bind(this);
    this.editor.on("selectionUpdate", this.handleSelectionUpdate);

    this.renderer = new VueRenderer(extendedComponent, {
      editor: this.editor,
      props,
    });
  }

  /**
   * Return the DOM element.
   * This is the element that will be used to display the node view.
   */
  get dom() {
    if (
      !this.renderer.element ||
      !this.renderer.element.hasAttribute("data-node-view-wrapper")
    ) {
      throw Error(
        "Please use the NodeViewWrapper component for your node view.",
      );
    }

    return this.renderer.element;
  }

  /**
   * Return the content DOM element.
   * This is the element that will be used to display the rich-text content of the node.
   */
  get contentDOM() {
    if (this.node.isLeaf) {
      return null;
    }

    return this.dom.querySelector("[data-node-view-content]");
  }

  /**
   * On editor selection update, check if the node is selected.
   * If it is, call `selectNode`, otherwise call `deselectNode`.
   */
  handleSelectionUpdate() {
    const { from, to } = this.editor.state.selection;
    const pos = this.getPos();

    if (typeof pos !== "number") {
      return;
    }

    if (from <= pos && to >= pos + this.node.nodeSize) {
      if (this.renderer.props.selected) {
        return;
      }

      this.selectNode();
    } else {
      if (!this.renderer.props.selected) {
        return;
      }

      this.deselectNode();
    }
  }

  /**
   * On update, update the React component.
   * To prevent unnecessary updates, the `update` option can be used.
   */
  update(node, decorations, innerDecorations) {
    const rerenderComponent = (props) => {
      this.decorationClasses.value = this.getDecorationClasses();
      this.renderer.updateProps(props);
    };

    if (typeof this.options.update === "function") {
      const oldNode = this.node;
      const oldDecorations = this.decorations;
      const oldInnerDecorations = this.innerDecorations;

      this.node = node;
      this.decorations = decorations;
      this.innerDecorations = innerDecorations;

      return this.options.update({
        oldNode,
        oldDecorations,
        newNode: node,
        newDecorations: decorations,
        oldInnerDecorations,
        innerDecorations,
        updateProps: () =>
          rerenderComponent({ node, decorations, innerDecorations }),
      });
    }

    if (node.type !== this.node.type) {
      return false;
    }

    if (
      node === this.node &&
      this.decorations === decorations &&
      this.innerDecorations === innerDecorations
    ) {
      return true;
    }

    this.node = node;
    this.decorations = decorations;
    this.innerDecorations = innerDecorations;

    rerenderComponent({ node, decorations, innerDecorations });

    return true;
  }

  /**
   * Select the node.
   * Add the `selected` prop and the `ProseMirror-selectednode` class.
   */
  selectNode() {
    this.renderer.updateProps({
      selected: true,
    });
    if (this.renderer.element) {
      this.renderer.element.classList.add("ProseMirror-selectednode");
    }
  }

  /**
   * Deselect the node.
   * Remove the `selected` prop and the `ProseMirror-selectednode` class.
   */
  deselectNode() {
    this.renderer.updateProps({
      selected: false,
    });
    if (this.renderer.element) {
      this.renderer.element.classList.remove("ProseMirror-selectednode");
    }
  }

  getDecorationClasses() {
    return (
      this.decorations
        // @ts-ignore
        .map((item) => item.type.attrs.class)
        .flat()
        .join(" ")
    );
  }

  destroy() {
    this.renderer.destroy();
    this.editor.off("selectionUpdate", this.handleSelectionUpdate);
  }
}

export function VueNodeViewRenderer(component, options) {
  return (props) => {
    // try to get the parent component
    // this is important for vue devtools to show the component hierarchy correctly
    // maybe it’s `undefined` because <editor-content> isn’t rendered yet
    if (!props.editor.contentComponent) {
      return {};
    }
    // check for class-component and normalize if neccessary
    const normalizedComponent =
      typeof component === "function" && "__vccOpts" in component
        ? component.__vccOpts
        : component;

    return new VueNodeView(normalizedComponent, props, options);
  };
}
