import { defineComponent, ref, h, computed } from "vue";
import { prefixClass, t } from "@isle-editor/core";
import { ITooltip, IButton, ITrigger, IIcon } from "@/components/ui";

export default defineComponent({
  name: "ButtonFontFamily",
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
    const isShown = ref(false);

    const activeFont = computed(() => {
      const attrs = props.editor.getAttributes("textStyle");
      return props.menu.fonts.find((v) => v.value === (attrs.fontFamily || ""));
    });

    return () =>
      h(
        ITrigger,
        {
          ref: triggerRef,
          disabled:
            props.menu.isDisabled &&
            props.menu.isDisabled({
              editor: props.editor,
            }),
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
                      disabled:
                        props.menu.isDisabled &&
                        props.menu.isDisabled({
                          editor: props.editor,
                        }),
                      semiActive: isShown.value,
                    },
                    {
                      default: () => [
                        h(
                          "div",
                          {
                            class: `${prefixClass}-special-button__text-box`,
                          },
                          t(
                            activeFont.value?.value
                              ? `fonts.${activeFont.value?.label}`
                              : "fontFamily",
                          ),
                        ),
                        h(IIcon, {
                          name: "down",
                          style: {
                            marginLeft: "0.1rem",
                            marginTop: "0.1rem",
                            fontSize: "8px",
                          },
                        }),
                      ],
                    },
                  ),
              },
            ),
          content: () =>
            h("div", { class: `${prefixClass}-special-button__font-family` }, [
              ...props.menu.fonts.map((item) => {
                return h(
                  IButton,
                  {
                    long: true,
                    active: activeFont.value?.value === item.value,
                    onClick: () => {
                      props.menu.command({
                        editor: props.editor,
                        fontFamily: item.value,
                      });
                      triggerRef.value?.hide();
                    },
                  },
                  {
                    default: () =>
                      h(
                        "span",
                        {
                          class: `${prefixClass}-special-button__font-family-btn-text`,
                          style: {
                            fontFamily: item.value,
                          },
                        },
                        t(`fonts.${item.label}`),
                      ),
                  },
                );
              }),
            ]),
        },
      );
  },
});
