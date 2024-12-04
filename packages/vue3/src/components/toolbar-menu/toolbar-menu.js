import { defineComponent, computed, h } from "vue";
import { prefixClass, t } from "@isle-editor/core";
import { IButton, IDivider, ITooltip } from "@/components/ui";
import { getIcon, isString, isObject } from "@/utils";
import ButtonLink from "@/components/special-button/button-link";
import ButtonTextAlign from "@/components/special-button/button-text-align";
import ButtonColor from "@/components/special-button/button-color";
import ButtonBackground from "@/components/special-button/button-background";
import ButtonFontFamily from "@/components/special-button/button-font-family";
import ButtonFontSize from "@/components/special-button/button-font-size";

const TOOLBAR_MENU_SORT = [
  "history",
  "|",
  "textClear",
  "|",
  "fontFamily",
  "fontSize",
  "|",
  "bold",
  "italic",
  "underline",
  "strike",
  "code",
  "subscript",
  "superscript",
  "|",
  "color",
  "background",
  "textAlign",
  "link",
  "|",
  "bulletList",
  "orderedList",
  "taskList",
  "|",
  "blockquote",
  "hardBreak",
  "indent",
  "outdent",
  "|",
  "divider",
];

export default defineComponent({
  name: "IsleEditorToolbar",
  props: {
    editor: {
      type: Object,
      required: true,
    },
    sort: {
      type: Array,
      default: () => TOOLBAR_MENU_SORT,
    },
  },
  setup(props, { slots }) {
    const slotPrefix = slots["prefix"];
    const slotSuffix = slots["suffix"];

    const toolbarMenus = computed(() => {
      return props.sort
        .map((menu) => {
          if (isString(menu)) {
            if (menu === "|") return { name: "|" };
            if (menu === "textClear") {
              return {
                name: "textClear",
                command: ({ editor }) =>
                  editor.chain().focus().unsetAllMarks().run(),
                isActive: () => null,
              };
            }
            const extension = props.editor.extensionManager.extensions.find(
              (ext) => ext.name === menu,
            );
            if (extension) {
              return {
                name: menu,
                ...extension?.options,
              };
            }

            return null;
          }

          if (isObject(menu)) {
            return menu;
          }
        })
        .filter(Boolean);
    });

    return () =>
      h("div", { class: `${prefixClass}-toolbar-menu` }, [
        slotPrefix && slotPrefix({ editor: props.editor }),
        toolbarMenus.value.map((menu) => {
          // 检查是否存在对应的具名插槽
          const slotName = slots[menu.name];

          if (slotName) {
            // 如果存在具名插槽，使用插槽内容
            return slotName({
              editor: props.editor,
              ...menu,
            });
          }

          if (menu.name === "|") {
            return h(IDivider, {
              type: "vertical",
              style: { height: "1.5rem" },
            });
          }

          if (menu.name === "history" || menu.name === "indent") {
            return menu.list.map((item) =>
              h(
                ITooltip,
                { text: t(item.name), shortcutkeys: item.shortcutkeys },
                {
                  default: () =>
                    h(
                      IButton,
                      {
                        active:
                          item?.isActive &&
                          item?.isActive({ editor: props.editor }),
                        disabled:
                          item?.isDisabled &&
                          item?.isDisabled({ editor: props.editor }),
                        onClick: () => item.command({ editor: props.editor }),
                      },
                      {
                        icon: () =>
                          h(getIcon(item.name), { size: 15, strokeWidth: 2.5 }),
                      },
                    ),
                },
              ),
            );
          }

          if (menu.name === "link") {
            return h(ButtonLink, {
              editor: props.editor,
              menu,
              toolbar: true,
            });
          }

          if (menu.name === "textAlign") {
            return h(ButtonTextAlign, {
              editor: props.editor,
              menu,
            });
          }

          if (menu.name === "color") {
            return h(ButtonColor, {
              editor: props.editor,
              menu,
            });
          }

          if (menu.name === "background") {
            return h(ButtonBackground, {
              editor: props.editor,
              menu,
            });
          }

          if (menu.name === "fontFamily") {
            return h(ButtonFontFamily, {
              editor: props.editor,
              menu,
            });
          }

          if (menu.name === "fontSize") {
            return h(ButtonFontSize, {
              editor: props.editor,
              menu,
            });
          }

          return h(
            ITooltip,
            { text: t(menu.name), shortcutkeys: menu.shortcutkeys },
            {
              default: () =>
                h(
                  IButton,
                  {
                    active:
                      menu?.isActive &&
                      menu?.isActive({ editor: props.editor }),
                    disabled:
                      menu?.isDisabled &&
                      menu?.isDisabled({ editor: props.editor }),
                    onClick: () => menu.command({ editor: props.editor }),
                  },
                  {
                    icon: () =>
                      h(getIcon(menu.name), { size: 15, strokeWidth: 2.5 }),
                  },
                ),
            },
          );
        }),
        slotSuffix && slotSuffix({ editor: props.editor }),
      ]);
  },
});
