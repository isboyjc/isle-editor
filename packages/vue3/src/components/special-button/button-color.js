import { defineComponent, ref, h, computed } from "vue";
import { prefixClass, t } from "@isle-editor/core";
import { getIcon, getColors } from "@/utils";
import { ITooltip, IButton, ITrigger, IColorPicker } from "@/components/ui";

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
      const attrs = props.editor.getAttributes("textStyle");
      return attrs?.color || "";
    });

    function defaultModelRender() {
      return h("div", { class: `${prefixClass}-special-button__color` }, [
        h("div", { class: `${prefixClass}-special-button__color-title` }, [
          h(
            "span",
            {
              class: `${prefixClass}-special-button__color-title-text`,
            },
            t(props.menu.name),
          ),
        ]),
        h("div", { class: `${prefixClass}-special-button__color-box` }, [
          ...getColors().map(({ color }) =>
            h(
              "div",
              {
                class: `${prefixClass}-special-button__color-box-item`,
                style: {
                  color,
                  borderColor: activeColor.value === color ? color : "",
                },
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
      ]);
    }

    function pickerModelRender() {
      return h("div", { class: `${prefixClass}-special-button__color` }, [
        h(IColorPicker, {
          defaultColorName: t("colors.defaultColor"),
          standardColorName: t("colors.standardColor"),
          recentUseName: t("colors.recentUse"),
          storageKey: "ICOLORPICKER-RECENT-COLOR",
          onChange: (color) => {
            if (color) {
              props.menu.command({
                color: color,
                editor: props.editor,
              });
            } else {
              props.menu.command({
                color: "",
                editor: props.editor,
              });
            }
          },
        }),
      ]);
    }

    return () =>
      h(
        ITrigger,
        {
          disabled:
            props.menu?.isDisabled &&
            props.menu?.isDisabled({ editor: props.editor }),
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
                            style: { color: activeColor.value },
                          },
                          [
                            h(getIcon(props.menu.name || "color"), {
                              size: 13,
                              strokeWidth: 2.5,
                            }),
                          ],
                        ),
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
            props.menu?.type === "picker"
              ? pickerModelRender()
              : defaultModelRender(),
        },
      );
  },
});
