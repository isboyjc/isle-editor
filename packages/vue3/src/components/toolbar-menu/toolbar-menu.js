import { defineComponent, computed, h } from "vue";
import { prefixClass, t } from "@isle-editor/core";
import { IButton, IDivider, ITooltip } from "@/components/ui";
import { getIcon, sortArrayByPropertyArray } from "@/utils";

const TOOLBAR_MENU_SORT = [
  "history",
  "|",
  "bold",
  "italic",
  "underline",
  "strike",
  "code",
  "style",
  "color",
  "background",
  "link",
  "subscript",
  "superscript",
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
        toolbarMenus.value.map((v) => {
          if (v.name === "|") {
            return h(IDivider, {
              type: "vertical",
              style: { height: "1.5rem" },
            });
          }

          if (
            v.name === "history" ||
            v.name === "indent" ||
            v.name === "textAlign"
          ) {
            return v.list.map((item) =>
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

          return h(
            ITooltip,
            { text: t(v.name), shortcutkeys: v.shortcutkeys },
            {
              default: () =>
                h(
                  IButton,
                  {
                    active:
                      v?.isActive && v?.isActive({ editor: props.editor }),
                    disabled:
                      v?.isDisabled && v?.isDisabled({ editor: props.editor }),
                    onClick: () => v.command({ editor: props.editor }),
                  },
                  {
                    icon: () =>
                      h(getIcon(v.name), { size: 15, strokeWidth: 2.5 }),
                  },
                ),
            },
          );
        }),
      ]);
  },
});
