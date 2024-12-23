import { defineComponent, ref, h, computed } from "vue";
import { prefixClass, t } from "@isle-editor/core";
import { getIcon } from "@/utils";
import { ITooltip, IButton, ITrigger } from "@/components/ui";

export default defineComponent({
  name: "ButtonTable",
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
    // 当前悬浮的行列
    const hoverPosition = ref({ row: 0, col: 0 });
    // 表格大小配置
    const tableSize = {
      rows: 10,
      cols: 10,
    };

    // 计算单元格是否应该高亮
    const isCellHighlighted = (row, col) => {
      return row <= hoverPosition.value.row && col <= hoverPosition.value.col;
    };

    // 处理单元格悬浮
    const handleCellHover = (row, col) => {
      hoverPosition.value = { row, col };
    };

    // 处理单元格点击
    const handleCellClick = (row, col) => {
      // 插入表格
      props.menu.command({
        editor: props.editor,
        params: {
          rows: row + 1,
          cols: col + 1,
          withHeaderRow: false,
        },
      });
      hoverPosition.value = { row: 0, col: 0 };
      // 关闭弹窗
      triggerRef.value.hide();
    };

    // 渲染表格选择器
    const tableModelRender = () => {
      return h(
        "div",
        {
          class: `${prefixClass}-special-button__table`,
        },
        [
          // 表格预览区域
          h(
            "div",
            {
              class: `${prefixClass}-special-button__table-grid`,
              onMouseleave: () => {
                hoverPosition.value = { row: 0, col: 0 };
              },
            },
            Array.from({ length: tableSize.rows * tableSize.cols }).map(
              (_, index) => {
                const row = Math.floor(index / tableSize.cols);
                const col = index % tableSize.cols;

                return h("div", {
                  class: [
                    `${prefixClass}-special-button__table-grid-cell`,
                    { "is-highlighted": isCellHighlighted(row, col) },
                  ],
                  onMouseenter: () => handleCellHover(row, col),
                  onClick: () => handleCellClick(row, col),
                });
              },
            ),
          ),
          h(
            "div",
            {
              class: `${prefixClass}-special-button__table-size-text`,
            },
            `${hoverPosition.value.row + 1} × ${hoverPosition.value.col + 1}`,
          ),
        ],
      );
    };

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
                        props.menu?.isDisabled &&
                        props.menu?.isDisabled({ editor: props.editor }),
                      semiActive: isShown.value,
                      active:
                        props.menu?.isActive &&
                        props.menu?.isActive({
                          editor: props.editor,
                        }),
                    },
                    {
                      icon: () =>
                        h(getIcon(props.menu.name), {
                          style: { fontSize: "12px" },
                        }),
                      default: () =>
                        h(getIcon("down"), {
                          style: {
                            marginLeft: "0.1rem",
                            marginTop: "0.1rem",
                            fontSize: "8px",
                          },
                        }),
                    },
                  ),
              },
            ),
          content: () => tableModelRender(),
        },
      );
  },
});
