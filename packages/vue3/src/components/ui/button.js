import { defineComponent, h } from "vue";
import { prefixClass } from "@isle-editor/core";

export default defineComponent({
  name: "IButton",
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
    semiActive: {
      type: Boolean,
      default: false,
    },
    danger: {
      type: Boolean,
      default: false,
    },
    success: {
      type: Boolean,
      default: false,
    },
    long: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots }) {
    return () =>
      h(
        "button",
        {
          class: [
            `${prefixClass}-button`,
            {
              disabled: props.disabled,
              active: props.active,
              "semi-active": props.semiActive,
              danger: props.danger,
              success: props.success,
              long: props.long,
            },
          ],
          // disabled: props.disabled,
          onMouseDown: (evt) => evt.preventDefault(),
        },
        [slots.icon && slots.icon(), slots.default && slots.default()],
      );
  },
});
