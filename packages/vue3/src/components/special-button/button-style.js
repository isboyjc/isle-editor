import { defineComponent, ref, h, computed } from "vue";
import { prefixClass, t } from "@isle-editor/core";
import { getIcon } from "@/utils/icon";
import { ITooltip, IButton, ITrigger } from "@/components/ui";

export default defineComponent({
  name: "ButtonStyle",
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
      return props.menu.color.colors.find((v) =>
        props.menu.color.isActive({ editor: props.editor, color: v.color }),
      );
    });
    const activeBackground = computed(() => {
      return props.menu.background.colors.find((v) =>
        props.menu.background.isActive({
          editor: props.editor,
          color: v.color,
        }),
      );
    });

    return () =>
      h(
        ITrigger,
        {
          disabled:
            props.menu.color?.isDisabled &&
            props.menu.color?.isDisabled({ editor: props.editor }),
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
              { text: t("textStyle") },
              {
                default: () =>
                  h(
                    IButton,
                    {
                      disabled:
                        props.menu.color?.isDisabled &&
                        props.menu.color?.isDisabled({ editor: props.editor }),
                      semiActive: isShown.value,
                    },
                    {
                      icon: () =>
                        h(
                          "div",
                          {
                            class: `${prefixClass}-special-button__icon-box`,
                            style: {
                              color: activeColor.value?.color,
                              background: activeBackground.value?.color,
                            },
                          },
                          [
                            h(getIcon(props.menu.color.name || "color"), {
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
            h("div", { class: `${prefixClass}-special-button__style` }, [
              h(
                "div",
                { class: `${prefixClass}-special-button__style-title` },
                [
                  h(
                    "span",
                    {
                      class: `${prefixClass}-special-button__style-title-text`,
                    },
                    t(props.menu.color.name),
                  ),
                  h("span", {
                    class: `${prefixClass}-special-button__style-title-default`,
                    onClick: () =>
                      props.menu.color.command({
                        color: "",
                        editor: props.editor,
                      }),
                  }),
                ],
              ),
              h("div", { class: `${prefixClass}-special-button__style-box` }, [
                ...props.menu.color.colors.map(({ color }) =>
                  h(
                    "div",
                    {
                      class: `${prefixClass}-special-button__style-box-item`,
                      style: { color },
                      onClick: () =>
                        props.menu.color.command({
                          color: color,
                          editor: props.editor,
                        }),
                    },
                    [
                      h(getIcon(props.menu.color.name), {
                        class: `${prefixClass}-special-button__style-box-item-icon`,
                        size: 14,
                        strokeWidth: 2,
                      }),
                    ],
                  ),
                ),
              ]),
              h(
                "div",
                { class: `${prefixClass}-special-button__style-title mt-2` },
                [
                  h(
                    "span",
                    {
                      class: `${prefixClass}-special-button__style-title-text`,
                    },
                    t(props.menu.background.name),
                  ),
                  h("span", {
                    class: `${prefixClass}-special-button__style-title-default`,
                    onClick: () =>
                      props.menu.background.command({
                        color: "",
                        editor: props.editor,
                      }),
                  }),
                ],
              ),
              h("div", { class: `${prefixClass}-special-button__style-box` }, [
                ...props.menu.background.colors.map(({ color }) =>
                  h("div", {
                    class: `${prefixClass}-special-button__style-box-item`,
                    style: { background: color },
                    onClick: () =>
                      props.menu.background.command({
                        color: color,
                        editor: props.editor,
                      }),
                  }),
                ),
              ]),
            ]),
        },
      );
  },
});
