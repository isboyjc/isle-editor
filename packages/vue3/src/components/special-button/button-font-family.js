import { defineComponent, ref, h, computed } from "vue";
import { prefixClass, t } from "@isle-editor/core";
import { getIcon } from "@/utils/icon";
import { ITooltip, IButton, ITrigger } from "@/components/ui";

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
      return props.menu.fonts?.find((v) =>
        props.menu?.isActive({ editor: props.editor, fontFamily: v.value }),
      );
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
                          t(`fonts.${activeFont.value?.label || "title"}`),
                        ),
                        h(getIcon("down"), {
                          style: {
                            marginLeft: "0.1rem",
                            marginTop: "0.1rem",
                          },
                          size: 8,
                          strokeWidth: 3,
                        }),
                      ],
                    },
                  ),
              },
            ),
          content: () =>
            h("div", { class: `${prefixClass}-special-button__font-family` }, [
              ...props.menu.fonts.map((item) => {
                if (item.label === "Default") {
                  return h(
                    IButton,
                    {
                      long: true,
                      active: !activeFont.value?.value,
                      onClick: () => {
                        props.editor.chain().focus().unsetFontFamily().run();
                        triggerRef.value?.hide();
                      },
                    },
                    {
                      default: () =>
                        h(
                          "span",
                          {
                            class: `${prefixClass}-special-button__font-family-btn-text`,
                          },
                          t(`fonts.${item.label}`),
                        ),
                    },
                  );
                }

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
