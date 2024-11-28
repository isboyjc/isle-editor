import {
  defineComponent,
  computed,
  h,
  watch,
  onMounted,
  onUnmounted,
  ref,
} from "vue";
import { prefixClass, t } from "@isle-editor/core";

export default defineComponent({
  name: "IsleEditorToc",
  props: {
    editor: {
      type: Object,
      required: true,
    },
    scrollView: {
      type: Object,
      default: null,
    },
  },
  setup(props) {
    const tocItems = computed(() => {
      return props.editor?.storage?.toc?.tocItems || [];
    });

    const activeId = ref("");
    let isManualClick = false;
    let manualClickTimeout = null;
    let scrollHandler = null;

    // 获取元素在编辑器视口中的位置信息
    const getElementViewportInfo = (element, editorView) => {
      const editorRect = editorView.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();

      // 计算元素相对于编辑器视口的位置
      const relativeTop = elementRect.top - editorRect.top;
      const relativeBottom = elementRect.bottom - editorRect.top;
      const viewportHeight = editorView.clientHeight;

      // 元素完全不在编辑器视口中
      if (relativeBottom < 0 || relativeTop > viewportHeight) {
        return {
          isVisible: false,
          top: relativeTop,
          id: element.getAttribute("data-id"),
        };
      }

      return {
        isVisible: true,
        top: relativeTop,
        id: element.getAttribute("data-id"),
      };
    };

    // 递归获取所有标题项
    const getAllHeadingItems = (items, result = []) => {
      items.forEach((item) => {
        result.push(item);
        if (item.children && item.children.length > 0) {
          getAllHeadingItems(item.children, result);
        }
      });
      return result;
    };

    // 处理标题高亮
    const handleHeadingVisibility = () => {
      // 如果是手动点击触发的，不处理自动高亮
      if (isManualClick) return;

      const editorView = props.scrollView || document.documentElement;

      // 获取所有标题元素（包括子标题）
      const allHeadings = getAllHeadingItems(tocItems.value);

      // 获取所有标题元素的视口信息并排序
      const headingsInfo = allHeadings
        .map((item) => {
          const element = document.querySelector(`[data-id="${item.id}"]`);
          return element ? getElementViewportInfo(element, editorView) : null;
        })
        .filter((info) => info && info.isVisible)
        .sort((a, b) => a.top - b.top); // 按照在编辑器视口中的位置从上到下排序

      // 如果有可见的标题，选择最靠上的一个
      if (headingsInfo.length > 0) {
        activeId.value = headingsInfo[0].id;
      }
    };

    // 点击滚动到目标位置
    const scrollToTarget = (id) => {
      const target = document.querySelector(`[data-id="${id}"]`);
      if (target) {
        // 设置手动点击标记并更新激活的 ID
        isManualClick = true;
        activeId.value = id;

        // 清除之前的定时器
        if (manualClickTimeout) {
          clearTimeout(manualClickTimeout);
        }

        const editorView = props.scrollView || document.documentElement;
        const targetRect = target.getBoundingClientRect();
        const editorRect = editorView.getBoundingClientRect();

        // 计算目标位置，将标题放在编辑器视口顶部偏下位置
        const targetPosition =
          editorView.scrollTop + (targetRect.top - editorRect.top) - 20;

        // 执行滚动
        editorView.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        // 在滚动动画完成后重置手动点击状态
        manualClickTimeout = setTimeout(() => {
          isManualClick = false;
        }, 1000);
      }
    };

    // 初始化滚动监听
    const initScrollListener = () => {
      const editorView = props.scrollView || document.documentElement;

      // 使用 requestAnimationFrame 优化滚动处理
      let ticking = false;
      scrollHandler = () => {
        if (!ticking && !isManualClick) {
          requestAnimationFrame(() => {
            handleHeadingVisibility();
            ticking = false;
          });
          ticking = true;
        }
      };

      // 添加滚动监听
      editorView.addEventListener("scroll", scrollHandler);

      // 初始检查一次
      handleHeadingVisibility();
    };

    // 监听 tocItems 变化
    watch(
      () => tocItems.value,
      () => {
        // 当 tocItems 更新时，重新检查一次
        handleHeadingVisibility();
      },
      { deep: true },
    );

    onMounted(() => {
      initScrollListener();
    });

    onUnmounted(() => {
      const editorView = props.scrollView || document.documentElement;
      if (scrollHandler) {
        editorView.removeEventListener("scroll", scrollHandler);
      }
    });

    const renderTocItem = (item) => {
      const children = [];

      if (item.children && item.children.length > 0) {
        children.push(...item.children.map((child) => renderTocItem(child)));
      }

      return h(
        "div",
        {
          class: `${prefixClass}-toc-box`,
          style: {
            paddingLeft: `${item.level == 1 ? "0" : "1rem"}`,
          },
        },
        [
          h(
            "div",
            {
              class: [
                `${prefixClass}-toc-item`,
                {
                  active: activeId.value === item.id,
                },
              ],
              onClick: () => {
                scrollToTarget(item.id);
              },
            },
            item.text?.trim() || t("empty"),
          ),
          ...children,
        ],
      );
    };

    const renderTocList = () => {
      return tocItems.value.map((item) => renderTocItem(item));
    };

    return () =>
      h(
        "div",
        {
          class: `${prefixClass}-toc`,
        },
        [
          h("div", { class: `${prefixClass}-toc-title` }, "TOC"),
          ...renderTocList(),
        ],
      );
  },
});
