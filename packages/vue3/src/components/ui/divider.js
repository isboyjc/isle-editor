import { defineComponent, h } from "vue";
import { prefixClass } from "@isle-editor/core";

export default defineComponent({
  name: "IDivider",
  props: {
    type: {
      type: String,
      default: "horizontal",
      validator: (value) => ["horizontal", "vertical"].includes(value),
    },
    dashed: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    return () =>
      h("div", {
        class: [
          `${prefixClass}-divider`,
          `${prefixClass}-divider--${props.type}`,
          { [`${prefixClass}-divider--dashed`]: props.dashed },
        ],
      });
  },
});
