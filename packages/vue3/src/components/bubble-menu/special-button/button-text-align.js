import {
  defineComponent,
  ref,
  h,
  onMounted,
  onBeforeUnmount,
  computed,
} from "vue";
import { prefixClass, t } from "@isle-editor/core";
import { getIcon } from "@/utils/icon";
import { createTippy } from "@/utils/tippy";
import { ITooltip, IButton } from "@/components/ui";

export default defineComponent({
  name: "ButtonTextAlign",
  props: {
    editor: {
      type: Object,
      required: true,
    },
    menu: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const triggerRef = ref(null);
    const contentRef = ref(null);
    const tippyInstance = ref(null);
    const isShown = ref(false);

    const activeAlign = computed(() => {
      return props.menu.list?.find((v) => v.isActive({ editor: props.editor }));
    });

    onMounted(() => {
      tippyInstance.value = createTippy(triggerRef.value, {
        content: contentRef.value,
        trigger: "click",
        hideOnClick: true,
        placement: "top",
        onShown: () => {
          isShown.value = true;
        },
        onHide: () => {
          isShown.value = false;
        },
      });
    });

    onBeforeUnmount(() => {
      tippyInstance.value && tippyInstance.value.destroy();
    });

    return () =>
      h("div", {}, [
        h(
          ITooltip,
          { text: t(props.menu.name) },
          {
            default: () =>
              h("div", { ref: triggerRef }, [
                h(
                  IButton,
                  {
                    semiActive: isShown.value,
                  },
                  {
                    icon: () =>
                      h(getIcon(activeAlign.value?.name || "alignLeft"), {
                        size: 15,
                        strokeWidth: 2.5,
                      }),
                  },
                ),
              ]),
          },
        ),
        h(
          "div",
          { ref: contentRef, class: `${prefixClass}-bubble-menu-text-align` },
          [
            ...props.menu.list.map((item) =>
              h(
                ITooltip,
                { text: t(item.name), shortcutkeys: item.shortcutkeys },
                {
                  default: () =>
                    h(
                      IButton,
                      {
                        active: activeAlign.value?.name === item.name,
                        onClick: () => item.command({ editor: props.editor }),
                      },
                      {
                        icon: () =>
                          h(getIcon(item?.name), {
                            size: 15,
                            strokeWidth: 2.5,
                          }),
                      },
                    ),
                },
              ),
            ),
          ],
        ),
      ]);
  },
});
