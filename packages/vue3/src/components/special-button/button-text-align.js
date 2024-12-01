import { defineComponent, ref, h, computed } from "vue";
import { prefixClass, t } from "@isle-editor/core";
import { getIcon } from "@/utils/icon";
import { ITooltip, IButton, ITrigger } from "@/components/ui";

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
    const isShown = ref(false);

    const activeAlign = computed(() => {
      return props.menu.list?.find((v) => v.isActive({ editor: props.editor }));
    });

    return () =>
      h(
        ITrigger,
        {
          tippyOptions: {
            placement: "top",
            onShown: () => {
              isShown.value = true;
            },
            onHide: () => {
              isShown.value = false;
            },
          },
        },
        {
          default: () =>
            h(
              ITooltip,
              { text: t(props.menu.name) },
              {
                default: () =>
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
                      default: () =>
                        h(getIcon("down"), {
                          style: {
                            marginLeft: "0.1rem",
                            marginTop: "0.1rem",
                          },
                          size: 8,
                          strokeWidth: 3,
                        }),
                    },
                  ),
              },
            ),
          content: () =>
            h("div", { class: `${prefixClass}-special-button__text-align` }, [
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
            ]),
        },
      );
  },
});
