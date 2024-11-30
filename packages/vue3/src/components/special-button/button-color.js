import { defineComponent, ref, h, computed } from "vue";
import { prefixClass, t } from "@isle-editor/core";
import { getIcon } from "@/utils/icon";
import { ITooltip, IButton, ITrigger } from "@/components/ui";

export default defineComponent({
  name: "ButtonColor",
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

    const activeColor = computed(() => {
      return props.menu.colors.find((v) =>
        props.menu.isActive({ editor: props.editor, color: v.color }),
      );
    });

    return () =>
      h(
        ITrigger,
        {
          tippyOptions: {
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
                      disabled:
                        props.menu?.isDisabled &&
                        props.menu?.isDisabled({ editor: props.editor }),
                      semiActive: isShown.value,
                    },
                    {
                      icon: () =>
                        h(
                          "div",
                          {
                            class: `${prefixClass}-special-button__icon-box`,
                            style: { color: activeColor.value?.color },
                          },
                          [
                            h(getIcon(props.menu.name || "color"), {
                              size: 13,
                              strokeWidth: 2.5,
                            }),
                          ],
                        ),
                    },
                  ),
              },
            ),
          content: () =>
            h("div", { class: `${prefixClass}-special-button__color` }, [
              h(
                "div",
                { class: `${prefixClass}-special-button__color-title` },
                [
                  h(
                    "span",
                    {
                      class: `${prefixClass}-special-button__color-title-text`,
                    },
                    t(props.menu.name),
                  ),
                  h("span", {
                    class: `${prefixClass}-special-button__color-title-default`,
                    onClick: () =>
                      props.menu.command({ color: "", editor: props.editor }),
                  }),
                ],
              ),
              h("div", { class: `${prefixClass}-special-button__color-box` }, [
                ...props.menu.colors.map(({ color }) =>
                  h(
                    "div",
                    {
                      class: `${prefixClass}-special-button__color-box-item`,
                      style: { color },
                      onClick: () =>
                        props.menu.command({
                          color: color,
                          editor: props.editor,
                        }),
                    },
                    [
                      h(getIcon(props.menu.name), {
                        class: `${prefixClass}-special-button__color-box-item-icon`,
                        size: 14,
                        strokeWidth: 2,
                      }),
                    ],
                  ),
                ),
              ]),
            ]),
        },
      );
  },
});
