import { defineComponent, h } from "vue";

export const NodeViewWrapper = defineComponent({
  name: "NodeViewWrapper",

  props: {
    as: {
      type: String,
      default: "div",
    },
  },

  inject: ["onDragStart", "decorationClasses"],

  render() {
    return h(
      this.as,
      {
        class: this.decorationClasses,
        style: {
          whiteSpace: "normal",
        },
        "data-node-view-wrapper": "",
        onDragstart: this.onDragStart,
      },
      this.$slots.default?.(),
    );
  },
});
