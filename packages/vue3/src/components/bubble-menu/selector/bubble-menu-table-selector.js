import { defineComponent, h } from "vue";
import { prefixClass, t } from "@isle-editor/core";
import { ITooltip, IDivider, IButton, IIcon } from "@/components/ui";
// import DeleteTable from "~icons/tabler/table-minus";
// import HeaderRow from "~icons/tabler/table-row";
// import HeaderCol from "~icons/tabler/table-column";
// import AddColumnBefore from "~icons/tabler/column-insert-left";
// import AddColumnAfter from "~icons/tabler/column-insert-right";
// import DeleteColumn from "~icons/tabler/column-remove";
// import AddRowBefore from "~icons/tabler/row-insert-top";
// import AddRowAfter from "~icons/tabler/row-insert-bottom";
// import DeleteRow from "~icons/tabler/row-remove";
// import MergeCells from "~icons/lucide/table-cells-merge";
// import SplitCell from "~icons/lucide/table-cells-split";

export default defineComponent({
  name: "BubbleTableSelector",
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
    const tableBubbleMenu = [
      {
        name: "tables.addColumnBefore",
        command: ({ editor }) => editor.commands.addColumnBefore(),
        isActive: () => false,
        isDisabled: () => !props.editor.can().addColumnBefore(),
        icon: () => h(IIcon, { name: "addColumnBefore", size: 14 }),
      },
      {
        name: "tables.addColumnAfter",
        command: ({ editor }) => editor.commands.addColumnAfter(),
        isActive: () => false,
        isDisabled: () => !props.editor.can().addColumnAfter(),
        icon: () => h(IIcon, { name: "addColumnAfter", size: 14 }),
      },
      {
        name: "tables.deleteColumn",
        isDel: true,
        command: ({ editor }) => editor.commands.deleteColumn(),
        isActive: () => false,
        isDisabled: () => !props.editor.can().deleteColumn(),
        icon: () => h(IIcon, { name: "deleteColumn", size: 14 }),
      },
      {
        name: "|",
      },
      {
        name: "tables.addRowBefore",
        command: ({ editor }) => editor.commands.addRowBefore(),
        isActive: () => false,
        isDisabled: () => !props.editor.can().addRowBefore(),
        icon: () => h(IIcon, { name: "addRowBefore", size: 14 }),
      },
      {
        name: "tables.addRowAfter",
        command: ({ editor }) => editor.commands.addRowAfter(),
        isActive: () => false,
        isDisabled: () => !props.editor.can().addRowAfter(),
        icon: () => h(IIcon, { name: "addRowAfter", size: 14 }),
      },
      {
        name: "tables.deleteRow",
        isDel: true,
        command: ({ editor }) => editor.commands.deleteRow(),
        isActive: () => false,
        isDisabled: () => !props.editor.can().deleteRow(),
        icon: () => h(IIcon, { name: "deleteRow", size: 14 }),
      },
      {
        name: "|",
      },
      {
        name: "tables.mergeCells",
        command: ({ editor }) => editor.commands.mergeCells(),
        isActive: () => false,
        isDisabled: () => !props.editor.can().mergeCells(),
        icon: () => h(IIcon, { name: "mergeCells", size: 14 }),
      },
      {
        name: "tables.splitCell",
        command: ({ editor }) => editor.commands.splitCell(),
        isActive: () => false,
        isDisabled: () => !props.editor.can().splitCell(),
        icon: () => h(IIcon, { name: "splitCell", size: 14 }),
      },
      {
        name: "tables.headerRow",
        icon: () => h(IIcon, { name: "headerRow", size: 14 }),
        command: ({ editor }) => editor.commands.toggleHeaderRow(),
        isActive: () => false,
        isDisabled: () => !props.editor.can().toggleHeaderRow(),
      },
      {
        name: "tables.headerCol",
        icon: () => h(IIcon, { name: "headerCol", size: 14 }),
        command: ({ editor }) => editor.commands.toggleHeaderColumn(),
        isActive: () => false,
        isDisabled: () => !props.editor.can().toggleHeaderColumn(),
      },
      {
        name: "|",
      },
      {
        name: "tables.deleteTable",
        isDel: true,
        command: ({ editor }) => editor.commands.deleteTable(),
        isActive: () => false,
        isDisabled: () => !props.editor.can().deleteTable(),
        icon: () => h(IIcon, { name: "deleteTable", size: 14 }),
      },
    ];

    return () => {
      return h(
        "div",
        {
          class: `${prefixClass}-bubble-menu`,
        },
        [
          ...tableBubbleMenu.map((item) => {
            if (item.name === "|") {
              return h(IDivider, {
                type: "vertical",
                style: { height: "1.5rem" },
              });
            }

            return h(
              ITooltip,
              {
                text: t(item.name),
                shortcutkeys: item.shortcutkeys,
              },
              {
                default: () =>
                  h(
                    IButton,
                    {
                      danger: item?.isDel,
                      disabled:
                        item?.isDisabled &&
                        item?.isDisabled({ editor: props.editor }),
                      active: item?.isActive({ editor: props.editor }),
                      onClick: () => item.command({ editor: props.editor }),
                    },
                    {
                      icon: item.icon,
                    },
                  ),
              },
            );
          }),
        ],
      );
    };
  },
});
