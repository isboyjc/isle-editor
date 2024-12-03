import { defineComponent, computed, h } from "vue";
import { prefixClass, t } from "@isle-editor/core";
import { IButton, IDivider, ITooltip } from "@/components/ui";
import { getIcon, sortArrayByPropertyArray } from "@/utils";
import ButtonLink from "@/components/special-button/button-link";
import ButtonTextAlign from "@/components/special-button/button-text-align";
import ButtonColor from "@/components/special-button/button-color";
import ButtonBackground from "@/components/special-button/button-background";
import ButtonStyle from "@/components/special-button/button-style";
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
  "style",
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

      // If both color and background extensions exist
      // they are automatically merged into one extension with the name style.
      const colorExtension = toolbarExtensions.find((v) => v.name === "color");
      const backgroundExtension = toolbarExtensions.find(
        (v) => v.name === "background",
      );
      if (colorExtension && backgroundExtension) {
        toolbarExtensions = toolbarExtensions.filter(
          (v) => v.name !== "color" && v.name !== "background",
        );
        toolbarExtensions.push({
          name: "style",
          color: colorExtension,
          background: backgroundExtension,
        });
      }

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

          if (menu.name === "style") {
            return h(ButtonStyle, {
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
      ]);
  },
});
