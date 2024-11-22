import {
  defineComponent,
  h,
  onMounted,
  onBeforeUnmount,
  ref,
  render,
  cloneVNode,
} from "vue";
import { prefixClass } from "@isle-editor/core";
import { createTippy } from "@/utils/tippy";
import { convertShortcutKeys } from "@/utils/shortcutkey";

export default defineComponent({
  name: "ITooltip",
  props: {
    text: String,
    shortcutkeys: String,
    tippyOptions: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, { slots }) {
    let tippyInstance = null;
    const tooltipContent = ref(null);
    const triggerRef = ref(null);

    onMounted(() => {
      tooltipContent.value = document.createElement("div");
      render(
        h("div", { class: `${prefixClass}-tooltip` }, [
          props.text &&
            h("div", { class: `${prefixClass}-tooltip-text` }, props.text),
          props.shortcutkeys &&
            h("div", { class: `${prefixClass}-tooltip-shortcutkeys` }, [
              ...convertShortcutKeys(props.shortcutkeys)
                .split("-")
                .map((key) =>
                  h(
                    "span",
                    { class: `${prefixClass}-tooltip-shortcutkeys-key` },
                    key,
                  ),
                ),
            ]),
        ]),
        tooltipContent.value,
      );

      tippyInstance = createTippy(triggerRef.value, {
        content: tooltipContent.value,
        allowHTML: false,
        duration: 0,
        getReferenceClientRect: null,
        interactive: true,
        trigger: "mouseenter",
        placement: "top",
        delay: [500, 250],
        hideOnClick: true,
        appendTo: () => document.body,
        ...props.tippyOptions,
      });
    });

    onBeforeUnmount(() => {
      if (tippyInstance) {
        tippyInstance.destroy();
      }
    });

    return () => h("div", { ref: triggerRef }, [slots.default?.()]);
  },
});
