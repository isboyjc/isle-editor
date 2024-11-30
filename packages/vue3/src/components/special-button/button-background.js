import { defineComponent, ref, h, computed } from "vue";
import { prefixClass, t } from "@isle-editor/core";
import { getIcon } from "@/utils/icon";
import { ITooltip, IButton, ITrigger } from "@/components/ui";

export default defineComponent({
  name: "ButtonBackground",
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
                            style: {
                              backgroundColor: activeColor.value?.color,
                            },
                          },
                          [
                            h(getIcon(props.menu.name || "background"), {
                              size: 15,
                              strokeWidth: 2.5,
                            }),
                          ],
                        ),
                    },
                  ),
              },
            ),
          content: () =>
            h(
              "div",
              {
                class: `${prefixClass}-special-button__background`,
              },
              [
                h(
                  "div",
                  { class: `${prefixClass}-special-button__background-title` },
                  [
                    h(
                      "span",
                      {
                        class: `${prefixClass}-special-button__background-title-text`,
                      },
                      t(props.menu.name),
                    ),
                    h("span", {
                      class: `${prefixClass}-special-button__background-title-default`,
                      onClick: () =>
                        props.menu.command({ color: "", editor: props.editor }),
                    }),
                  ],
                ),
                h(
                  "div",
                  { class: `${prefixClass}-special-button__background-box` },
                  [
                    ...props.menu.colors.map(({ color }) =>
                      h("div", {
                        class: `${prefixClass}-special-button__background-box-item`,
                        style: { backgroundColor: color },
                        onClick: () =>
                          props.menu.command({
                            color: color,
                            editor: props.editor,
                          }),
                      }),
                    ),
                  ],
                ),
              ],
            ),
        },
      );
  },
});
