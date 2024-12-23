import { prefixClass } from "@/utils";

/**
 * 获取列的样式声明
 * @param {number} minWidth - 最小宽度（像素）
 * @param {number} width - 当前宽度（像素）
 * @returns {Array} - 返回样式属性和值的数组 [属性名, 属性值]
 */
export function getColStyleDeclaration(minWidth, width) {
  if (width) {
    // 如果有指定宽度，确保不小于最小宽度
    return ["width", `${Math.max(width, minWidth)}px`];
  }
  // 如果没有指定宽度，确保不小于最小宽度
  return ["min-width", `${minWidth}px`];
}

/**
 * 更新表格列的宽度和样式
 * @param {Node} node - 表格节点
 * @param {HTMLElement} colgroup - colgroup元素
 * @param {HTMLElement} table - table元素
 * @param {number} cellMinWidth - 单元格最小宽度
 * @param {number} overrideCol - 要覆盖的列索引
 * @param {number} overrideValue - 覆盖的宽度值
 */
export function updateColumns(
  node,
  colgroup, // <colgroup> has the same prototype as <col>
  table,
  cellMinWidth,
  overrideCol,
  overrideValue,
) {
  // 跟踪表格总宽度
  let totalWidth = 0;
  // 标记是否所有列都有固定宽度
  let fixedWidth = true;
  // 当前处理的DOM元素
  let nextDOM = colgroup.firstChild;
  // 获取第一行
  const row = node.firstChild;

  if (row !== null) {
    // 遍历行中的每个单元格
    for (let i = 0, col = 0; i < row.childCount; i += 1) {
      // 获取单元格的colspan和宽度属性
      const { colspan, colwidth } = row.child(i).attrs;

      // 处理每个列（考虑colspan）
      for (let j = 0; j < colspan; j += 1, col += 1) {
        // 确定列宽度：使用覆盖值或原始值
        const hasWidth =
          overrideCol === col ? overrideValue : colwidth && colwidth[j];
        const cssWidth = hasWidth ? `${hasWidth}px` : "";

        // 累加总宽度
        totalWidth += hasWidth || cellMinWidth;

        // 如果没有明确的宽度，标记为非固定宽度
        if (!hasWidth) {
          fixedWidth = false;
        }

        // 创建或更新col元素
        if (!nextDOM) {
          // 创建新的col元素
          const colElement = document.createElement("col");

          const [propertyKey, propertyValue] = getColStyleDeclaration(
            cellMinWidth,
            hasWidth,
          );

          colElement.style.setProperty(propertyKey, propertyValue);

          colgroup.appendChild(colElement);
        } else {
          // 更新现有col元素的宽度
          if (nextDOM.style.width !== cssWidth) {
            const [propertyKey, propertyValue] = getColStyleDeclaration(
              cellMinWidth,
              hasWidth,
            );

            nextDOM.style.setProperty(propertyKey, propertyValue);
          }

          nextDOM = nextDOM.nextSibling;
        }
      }
    }
  }

  // 移除多余的col元素
  while (nextDOM) {
    const after = nextDOM.nextSibling;

    nextDOM.parentNode?.removeChild(nextDOM);
    nextDOM = after;
  }

  // 设置表格的宽度样式
  if (fixedWidth) {
    // 如果所有列都有固定宽度，设置表格的确切宽度
    table.style.width = `${totalWidth}px`;
    table.style.minWidth = "";
  } else {
    // 否则设置最小宽度，允许表格伸展
    table.style.width = "";
    table.style.minWidth = `${totalWidth}px`;
  }
}

/**
 * 表格视图类，处理表格的DOM结构和更新
 */
export class TableView {
  /**
   * 构造函数
   * @param {Node} node - 表格节点
   * @param {number} cellMinWidth - 单元格最小宽度
   */
  constructor(node, cellMinWidth) {
    this.node = node;
    this.cellMinWidth = cellMinWidth;
    // 创建表格包装器
    this.dom = document.createElement("div");
    this.dom.className = `${prefixClass}__table-wrapper`;
    // 创建表格元素
    this.table = this.dom.appendChild(document.createElement("table"));
    // 创建colgroup用于控制列宽
    this.colgroup = this.table.appendChild(document.createElement("colgroup"));
    // 初始化列宽
    updateColumns(node, this.colgroup, this.table, cellMinWidth);
    // 创建tbody作为内容容器
    this.contentDOM = this.table.appendChild(document.createElement("tbody"));
  }

  /**
   * 更新表格视图
   * @param {Node} node - 新的表格节点
   * @returns {boolean} - 是否成功更新
   */
  update(node) {
    // 检查节点类型是否匹配
    if (node.type !== this.node.type) {
      return false;
    }

    // 更新节点和列宽
    this.node = node;
    updateColumns(node, this.colgroup, this.table, this.cellMinWidth);

    return true;
  }

  /**
   * 判断是否忽略DOM突变
   * @param {MutationRecord} mutation - DOM突变记录
   * @returns {boolean} - 是否忽略该突变
   */
  ignoreMutation(mutation) {
    // 忽略表格和colgroup的属性变化
    return (
      mutation.type === "attributes" &&
      (mutation.target === this.table ||
        this.colgroup.contains(mutation.target))
    );
  }
}
