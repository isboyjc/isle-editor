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
        trigger: "click",
        hideOnClick: true,
        placement: "bottom",
        appendTo: "parent",
        ...props.tippyOptions,
      });

      props.disabled && disable();
    });

    onBeforeUnmount(() => {
      if (tippyInstance) tippyInstance.destroy();
    });

    expose({ hide, show, enable, disable, setProps });

    return () => [
      h("div", { ref: triggerRef, class: `${prefixClass}-trigger__btn` }, [
        slots.default?.(),
      ]),
      h(
        "div",
        { ref: tooltipContent, class: `${prefixClass}-trigger__content` },
        [slots.content?.()],
      ),
    ];
  },
});
