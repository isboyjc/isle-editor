import { defineComponent, ref, h, computed } from "vue";
import { prefixClass, t } from "@isle-editor/core";
import { getDefaultColors } from "@/utils";
import {
  ITooltip,
  IButton,
  ITrigger,
  IColorPicker,
  IIcon,
} from "@/components/ui";

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
          ...getDefaultColors().map(({ color }) =>
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
                h(IIcon, {
                  name: props.menu.name,
                  class: `${prefixClass}-special-button__color-box-item-icon`,
                  size: 13,
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
                            h(IIcon, {
                              name: props.menu.name || "color",
                              size: 13,
                            }),
                          ],
                        ),
                      default: () =>
                        h(IIcon, {
                          name: "down",
                          style: {
                            marginLeft: "0.1rem",
                            marginTop: "0.1rem",
                            fontSize: "8px",
                          },
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
