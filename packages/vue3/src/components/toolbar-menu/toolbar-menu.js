import { defineComponent, computed, h } from "vue";
import { prefixClass, t } from "@isle-editor/core";
import { IButton, IDivider, ITooltip } from "@/components/ui";
import { getIcon, sortArrayByPropertyArray } from "@/utils";
import ButtonLink from "@/components/special-button/button-link";
import ButtonColor from "@/components/special-button/button-color";
import ButtonBackground from "@/components/special-button/button-background";
// import ButtonStyle from "@/components/special-button/button-style";

const TOOLBAR_MENU_SORT = [
  "history",
  "|",
  "textClear",
  "|",
  "bold",
  "italic",
  "underline",
  "strike",
  "code",
  "style",
  "color",
  "background",
  "subscript",
  "superscript",
  "|",
  "link",
  "|",
  "bulletList",
  "orderedList",
  "taskList",
  "|",
  "textAlign",
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
  setup(props) {
    const toolbarMenus = computed(() => {
      if (!props.editor?.extensionManager?.extensions) {
        return [];
      }

      let toolbarExtensions = props.editor.extensionManager.extensions
        .filter((v) => v?.options?.toolbar)
        .map((v) => ({
          name: v.name,
          type: v.type,
          ...v?.options,
        }));

      toolbarExtensions.push({
        name: "textClear",
        command: ({ editor }) => editor.chain().focus().unsetAllMarks().run(),
        isActive: () => null,
      });

      // Sort the extensions according to the BUBBLE_MENU_SORT array
      const sortedExtensions = sortArrayByPropertyArray(
        toolbarExtensions,
        props.sort,
        "name",
      );

      return sortedExtensions;
    });

    console.log(toolbarMenus.value);
    return () =>
      h("div", { class: `${prefixClass}-toolbar-menu` }, [
        toolbarMenus.value.map((menu) => {
          if (menu.name === "|") {
            return h(IDivider, {
              type: "vertical",
              style: { height: "1.5rem" },
            });
          }

          if (
            menu.name === "history" ||
            menu.name === "indent" ||
            menu.name === "textAlign"
          ) {
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
      ]);
  },
});
