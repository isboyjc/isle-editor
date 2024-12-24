import {
  BubbleMenuPlugin,
  isNodeSelection,
  isTextSelection,
} from "@isle-editor/core";
import { isString, isObject } from "@/utils";
import BubbleSelector from "./selector/bubble-menu-selector";
import BubbleLinkSelector from "./selector/bubble-menu-link-selector";
import BubbleTableSelector from "./selector/bubble-menu-table-selector";

import {
  defineComponent,
  h,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
  computed,
} from "vue";

const BUBBLE_MENU_SORT = [
  "fontFamily",
  "fontSize",
  "|",
  "bold",
  "italic",
  "underline",
  "strike",
  "code",
  "color",
  "background",
  "link",
  "textAlign",
  "|",
  "textClear",
];

export default defineComponent({
  name: "IsleEditorBubble",
  props: {
    pluginKey: {
      type: [String, Object],
      default: "isleEditorBubble",
    },

    sort: {
      type: Array,
      default: () => BUBBLE_MENU_SORT,
    },

    editor: {
      type: Object,
      required: true,
    },

    updateDelay: {
      type: Number,
      default: 60,
    },

    tippyOptions: {
      type: Object,
      default: () => ({
        appendTo: () => document.body,
        maxWidth: "none",
        moveTransition: "transform 0.02s ease-out",
        onHidden: () => {
          // console.log('IsleEditor bubbleMenu onhidden')
        },
      }),
    },

    shouldShow: {
      type: [Function, null],
      default: null,
    },
  },
  setup(props, { slots }) {
    const root = ref(null);
    const registered = ref(false);

    // Determine whether the current selection is link
    const isLink = computed(() =>
      !props.editor ? false : props.editor.isActive("link"),
    );
    // Determine whether the current selection is table
    const isTable = computed(() =>
      !props.editor
        ? false
        : /CellSelection$/.test(props.editor.state.selection.constructor.name),
    );
    // Determine whether the current selection is text
    // Why not use the TextSelection or AllSelection classes to determine if a selection instance belongs to that class?
    // Because the TextSelection and AllSelection classes were prefixed with module private prefixes during the rollup packaging,
    // it is not possible to correctly determine the
    const isText = computed(() =>
      !props.editor
        ? false
        : /TextSelection$/.test(
            props.editor.state.selection.constructor.name,
          ) ||
          /AllSelection$/.test(props.editor.state.selection.constructor.name) ||
          (typeof props.editor.state.selection.$cursor !== "undefined" &&
            typeof props.editor.state.selection.empty !== "undefined" &&
            typeof props.editor.state.selection.from === "number" &&
            typeof props.editor.state.selection.to === "number"),
    );

    const shouldShowDefault = ({ state, from, to, editor }) => {
      const { doc, selection } = state;
      const { empty } = selection;
      const isEmptyTextBlock =
        !doc.textBetween(from, to).length && isTextSelection(state.selection);

      // Empty content or empty text blocks do not show bubble menus
      if (empty || isEmptyTextBlock) return false;

      // 如果出现以下情况，则不显示气泡菜单：
      // 代码块 / 图片 / 该选择是一个节点选择（对于拖动控制柄）
      // 图片也是节点选择之一
      // if (editor.isActive('image')) {
      //   console.log(selection.node)
      //   return !!node.attrs?.src
      // }
      if (editor.isActive("codeBlock") || isNodeSelection(selection)) {
        return false;
      }

      // console.log("isText", isText.value);
      // console.log("isLink", isLink.value);
      // console.log("isTable", isTable.value);
      return isText.value || isLink.value || isTable.value;
    };

    const registerPlugin = () => {
      if (registered.value) return;
      const { updateDelay, editor, pluginKey, shouldShow, tippyOptions } =
        props;

      editor.registerPlugin(
        BubbleMenuPlugin({
          updateDelay,
          editor,
          element: root.value,
          pluginKey,
          shouldShow: shouldShow || shouldShowDefault,
          tippyOptions,
        }),
      );

      registered.value = true;
    };

    const bubbleMenus = computed(() => {
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
          return null;
        })
        .filter(Boolean);
    });

    const init = () => {
      if (!props?.editor) return;
      registerPlugin();
    };

    watch(
      () => props.editor,
      () => {
        init();
      },
    );
    onMounted(() => {
      init();
    });

    onBeforeUnmount(() => {
      const { pluginKey, editor } = props;
      editor.unregisterPlugin(pluginKey);
      registered.value = false;
    });

    watch(
      [() => isText.value, () => isLink.value, () => isTable.value],
      ([isText, isLink, isTable]) => {
        console.log("isText", isText);
        console.log("isLink", isLink);
        console.log("isTable", isTable);
      },
    );
    return () =>
      h("div", { ref: root }, [
        // 渲染基础气泡菜单
        bubbleMenus.value.length > 0 &&
          isText.value &&
          !isLink.value &&
          h(
            BubbleSelector,
            {
              editor: props.editor,
              menus: bubbleMenus.value,
            },
            slots,
          ),
        isLink.value &&
          h(BubbleLinkSelector, {
            editor: props.editor,
            menu: props.editor.extensionManager.extensions.find(
              (menu) => menu.name === "link",
            )?.options,
          }),
        isTable.value &&
          h(BubbleTableSelector, {
            editor: props.editor,
            menu: props.editor.extensionManager.extensions.find(
              (menu) => menu.name === "table",
            )?.options,
          }),
      ]);
  },
});
