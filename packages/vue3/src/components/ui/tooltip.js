import {
  defineComponent,
  h,
  onMounted,
  onBeforeUnmount,
  ref,
  watch,
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
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots, expose }) {
    let tippyInstance = null;
    const tooltipContent = ref(null);
    const triggerRef = ref(null);

    watch(
      () => props.disabled,
      () => (props.disabled ? disable() : enable()),
    );

    function enable() {
      if (tippyInstance) tippyInstance.enable();
    }

    function disable() {
      if (tippyInstance) tippyInstance.disable();
    }

    function hide() {
      if (tippyInstance) tippyInstance.hide();
    }

    function show() {
      if (tippyInstance) tippyInstance.show();
    }

    function setProps(props = {}) {
      if (tippyInstance) tippyInstance.setProps(props);
    }

    onMounted(() => {
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
      props.disabled && disable();
    });

    onBeforeUnmount(() => {
      if (tippyInstance) {
        tippyInstance.destroy();
      }
    });

    expose({ hide, show, enable, disable, setProps });

    return () =>
      h("div", { ref: triggerRef }, [
        slots.default?.(),
        h("div", { ref: tooltipContent, class: `${prefixClass}-tooltip` }, [
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
      ]);
  },
});
