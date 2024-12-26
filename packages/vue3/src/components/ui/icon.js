import { defineComponent, h } from "vue";
import { Icon } from "@iconify/vue";
import { convertToKebabCase } from "@/utils";

export default defineComponent({
  name: "IIcon",
  props: {
    name: {
      type: String,
      required: true,
    },
    size: {
      type: [String, Number],
      default: "1em",
    },
    color: {
      type: String,
      default: "currentColor",
    },
  },

  setup(props, { attrs }) {
    return () =>
      h(Icon, {
        icon: `isle-editor:${convertToKebabCase(props.name)}`,
        width: props.size,
        height: props.size,
        color: props.color,
        ...attrs,
        style: {
          verticalAlign: "middle",
          display: "inline-block",
          ...(attrs.style || {}),
        },
      });
  },
});
