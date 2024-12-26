import { defineComponent, nextTick, watchEffect, h, ref } from "vue";
import { prefixClass, t } from "@isle-editor/core";
import { ITooltip, IButton, ITrigger, IIcon } from "@/components/ui";

export default defineComponent({
  name: "ButtonLink",
  props: {
    editor: {
      type: Object,
      required: true,
    },
    menu: {
      type: Object,
      required: true,
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
    toolbar: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const triggerRef = ref(null);
    const linkInputRef = ref(null);
    const isShown = ref(false);
    const openInNewTab = ref(true);

    watchEffect(() => {
      const linkData = props.editor.getAttributes("link");
      nextTick(() => {
        linkInputRef.value.value = "";
        if (linkData.href) linkInputRef.value.value = linkData.href;
      });
    });

    // getReferenceClientRect: () => {
    //   Get the coordinates of the selection so that the bubble menu follows the selection.
    //   const { view } = props.editor
    //   const { from, to } = props.editor.state.selection
    //   if (from === to) return null
    //   const domRect = view.coordsAtPos(from)
    //   const domRectEnd = view.coordsAtPos(to)
    //   return {
    //     top: domRect.top,
    //     bottom: domRect.bottom,
    //     left: domRect.left,
    //     right: domRectEnd.right,
    //     width: domRectEnd.right - domRect.left,
    //     height: domRect.bottom - domRect.top,
    //   }
    // },

    return () =>
      h(
        ITrigger,
        {
          ref: triggerRef,
          disabled:
            props.menu?.isDisabled &&
            props.menu?.isDisabled({ editor: props.editor }),
          tippyOptions: {
            onShown: () => {
              isShown.value = true;

              nextTick(() => {
                linkInputRef.value.focus();
              });
            },
            onHide: () => {
              isShown.value = false;

              linkInputRef.value.value = "";

              nextTick(() => {
                props.editor.commands.focus();
              });
            },
          },
        },
        {
          default: () =>
            h(
              ITooltip,
              {
                text: props.isEdit ? t("edit") : t(props.menu.name),
              },
              {
                default: () =>
                  h(
                    IButton,
                    {
                      disabled:
                        props.menu?.isDisabled &&
                        props.menu?.isDisabled({ editor: props.editor }),
                      semiActive: isShown.value,
                      active:
                        props.toolbar &&
                        props.menu?.isActive &&
                        props.menu?.isActive({
                          editor: props.editor,
                        }),
                    },
                    {
                      icon: () =>
                        props.isEdit
                          ? h(IIcon, {
                              name: "edit",
                              size: 13,
                            })
                          : h(IIcon, {
                              name: props.menu.name,
                              size: 13,
                            }),
                    },
                  ),
              },
            ),
          content: () =>
            h("div", { class: `${prefixClass}-special-button__link` }, [
              h("div", { class: `${prefixClass}-special-button__link-input` }, [
                h(IIcon, {
                  name: props.menu.name || "link",
                  class: `${prefixClass}-special-button__link-input-icon`,
                  size: 13,
                }),
                h("input", {
                  ref: linkInputRef,
                  class: `${prefixClass}-special-button__link-input-inner`,
                  placeholder: t("linkPlaceholder"),
                  onKeydown: (event) => {
                    if (event.key === "Enter") {
                      const url = event.target.value;
                      if (url && url.trim()) {
                        props.menu.command({
                          editor: props.editor,
                          href: url,
                          target: openInNewTab.value ? "_blank" : null,
                        });
                        triggerRef.value.hide();
                      }
                    }
                  },
                }),
              ]),
            ]),
        },
      );
  },
});
