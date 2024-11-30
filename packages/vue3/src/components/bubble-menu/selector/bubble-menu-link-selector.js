import { defineComponent, ref, watchEffect, h } from "vue";
import { prefixClass, t } from "@isle-editor/core";
import { getIcon } from "@/utils/icon";
import ButtonLink from "@/components/special-button/button-link";
import { ITooltip, IDivider, IButton } from "@/components/ui";

export default defineComponent({
  name: "BubbleLinkSelector",
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
    const href = ref(null);
    const target = ref("_blank");

    watchEffect(() => {
      const linkData = props.editor.getAttributes("link");
      href.value = linkData.href;
      target.value = linkData.target || "";
    });

    const copyOk = ref(false);
    function clipboardLink() {
      props.editor.chain().focus().run();
      navigator.clipboard.writeText(href.value);
      copyOk.value = true;
      setTimeout(() => {
        copyOk.value = false;
      }, 500);
    }

    function unLink() {
      if (!props.editor) return;
      props.editor.chain().focus().unsetLink().run();
    }

    function openLink() {
      window.open(href.value, target.value);
    }

    return () =>
      h("div", { class: `${prefixClass}-bubble-menu` }, [
        h(
          ITooltip,
          { text: t("openInNewTab") },
          {
            default: () =>
              h(
                IButton,
                {
                  onClick: openLink,
                },
                {
                  icon: () =>
                    h(getIcon("openRight"), { size: 15, strokeWidth: 2.5 }),
                  default: () =>
                    h(
                      "span",
                      { class: `${prefixClass}-bubble-menu__btn-text` },
                      href.value,
                    ),
                },
              ),
          },
        ),
        h(IDivider, { type: "vertical", style: { height: "1.5rem" } }),
        h(ButtonLink, { editor: props.editor, menu: props.menu, isEdit: true }),
        h(
          ITooltip,
          { text: t("copy") },
          {
            default: () =>
              h(
                IButton,
                {
                  success: copyOk.value,
                  onClick: clipboardLink,
                },
                {
                  icon: () =>
                    h(getIcon(copyOk.value ? "check" : "copy"), {
                      size: 15,
                      strokeWidth: 2.5,
                    }),
                },
              ),
          },
        ),
        h(IDivider, { type: "vertical", style: { height: "1.5rem" } }),
        h(
          ITooltip,
          { text: t("unlink") },
          {
            default: () =>
              h(
                IButton,
                {
                  danger: true,
                  onClick: unLink,
                },
                {
                  icon: () =>
                    h(getIcon("unlink"), { size: 15, strokeWidth: 2.5 }),
                },
              ),
          },
        ),
      ]);
  },
});
