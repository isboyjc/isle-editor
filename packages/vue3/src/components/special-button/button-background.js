import { defineComponent, ref, h, computed } from "vue";
import { prefixClass, t } from "@isle-editor/core";
import { getIcon, getDefaultColors } from "@/utils";
import { ITooltip, IButton, ITrigger, IColorPicker } from "@/components/ui";

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
      const attrs = props.editor.getAttributes("background");
      return attrs?.background || "";
    });

    function defaultModelRender() {
      return h(
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
            ],
          ),
          h("div", { class: `${prefixClass}-special-button__background-box` }, [
            ...getDefaultColors().map(({ background, color }) =>
              h("div", {
                class: `${prefixClass}-special-button__background-box-item`,
                style: {
                  backgroundColor: background,
                  borderColor: activeColor.value === background ? color : "",
                },
                onClick: () =>
                  props.menu.command({
                    background,
                    editor: props.editor,
                  }),
              }),
            ),
          ]),
        ],
      );
    }

    function pickerModelRender() {
      return h(
        "div",
        {
          class: `${prefixClass}-special-button__background`,
        },
        [
          h(IColorPicker, {
            defaultColorName: t("colors.defaultColor"),
            standardColorName: t("colors.standardColor"),
            recentUseName: t("colors.recentUse"),
            storageKey: "ICOLORPICKER-RECENT-BACKGROUND",
            onChange: (color) => {
              if (color) {
                props.menu.command({
                  background: color,
                  editor: props.editor,
                });
              } else {
                props.menu.command({
                  background: "",
                  editor: props.editor,
                });
              }
            },
          }),
        ],
      );
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
                            style: {
                              backgroundColor: activeColor.value,
                            },
                          },
                          [
                            h(getIcon(props.menu.name || "background"), {
                              style: { fontSize: "12px" },
                            }),
                          ],
                        ),
                      default: () =>
                        h(getIcon("down"), {
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
