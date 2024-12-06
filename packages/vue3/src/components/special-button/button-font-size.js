import { defineComponent, ref, h, computed } from "vue";
import { prefixClass, t } from "@isle-editor/core";
import { getIcon } from "@/utils/icon";
import { ITooltip, IButton, ITrigger } from "@/components/ui";

export default defineComponent({
  name: "ButtonFontSize",
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
      return props.menu.sizes?.find((v) => v.value === (attrs.fontSize || ""));
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
                              ? `sizes.${activeFont.value?.label}`
                              : "fontSize",
                          ),
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
            h("div", { class: `${prefixClass}-special-button__font-size` }, [
              ...props.menu.sizes.map((item) => {
                return h(
                  IButton,
                  {
                    long: true,
                    active: activeFont.value?.value === item.value,
                    onClick: () => {
                      props.menu.command({
                        editor: props.editor,
                        fontSize: item.value,
                      });
                      triggerRef.value?.hide();
                    },
                  },
                  {
                    default: () =>
                      h(
                        "span",
                        {
                          class: `${prefixClass}-special-button__font-size-btn-text`,
                          style: {
                            fontSize:
                              props.menu?.type === "default" ? item.value : "",
                          },
                        },
                        t(`sizes.${item.label}`),
                      ),
                  },
                );
              }),
            ]),
        },
      );
  },
});
