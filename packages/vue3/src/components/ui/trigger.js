import {
  defineComponent,
  h,
  onMounted,
  onBeforeUnmount,
  ref,
  watch,
  render,
} from "vue";
import { prefixClass } from "@isle-editor/core";
import { createTippy } from "@/utils/tippy";

export default defineComponent({
  name: "ITrigger",
  props: {
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

    // 是否启用实例
    function enable() {
      if (tippyInstance) tippyInstance.enable();
    }

    // 是否禁用实例
    function disable() {
      if (tippyInstance) tippyInstance.disable();
    }

    function hide() {
      if (tippyInstance) tippyInstance.hide();
    }

    function show() {
      if (tippyInstance) tippyInstance.show();
    }

    onMounted(() => {
      tippyInstance = createTippy(triggerRef.value, {
        content: tooltipContent.value,
        allowHTML: false,
        trigger: "click",
        hideOnClick: true,
        placement: "bottom",
        getReferenceClientRect: null,
        interactive: true,
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

    expose({ hide, show, enable, disable });

    return () =>
      h("div", { ref: triggerRef, class: `${prefixClass}-trigger__btn` }, [
        slots.default?.(),
        h(
          "div",
          { ref: tooltipContent, class: `${prefixClass}-trigger__content` },
          [slots.content?.()],
        ),
      ]);
  },
});
