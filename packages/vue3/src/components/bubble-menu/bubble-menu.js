import {
  BubbleMenuPlugin,
  isNodeSelection,
  isTextSelection,
} from "@isle-editor/core";
import { sortArrayByPropertyArray } from "@/utils/array";
import BubbleSelector from "./selector/bubble-menu-selector";
import BubbleLinkSelector from "./selector/bubble-menu-link-selector";

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
  "style",
  "color",
  "background",
  "textAlign",
  "link",
  "subscript",
  "superscript",
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
      if (editor.isActive("codeblock") || isNodeSelection(selection)) {
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
      if (!props.editor?.extensionManager?.extensions) {
        return [];
      }

      let markExtensions = props.editor.extensionManager.extensions
        .filter((v) => v?.options?.bubble)
        .map((v) => ({
          name: v.name,
          ...v?.options,
        }));

      // If both color and background extensions exist
      // they are automatically merged into one extension with the name style.
      const colorExtension = markExtensions.find((v) => v.name === "color");
      const backgroundExtension = markExtensions.find(
        (v) => v.name === "background",
      );
      if (colorExtension && backgroundExtension) {
        markExtensions = markExtensions.filter(
          (v) => v.name !== "color" && v.name !== "background",
        );
        markExtensions.push({
          name: "style",
          color: colorExtension,
          background: backgroundExtension,
        });
      }

      markExtensions.push({
        name: "textClear",
        command: ({ editor }) => editor.chain().focus().unsetAllMarks().run(),
        isActive: () => null,
      });

      // Sort the extensions according to the BUBBLE_MENU_SORT array
      const sortedExtensions = sortArrayByPropertyArray(
        markExtensions,
        props.sort,
        "name",
      );

      return sortedExtensions;
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

    return () =>
      h("div", { ref: root }, [
        // 渲染基础气泡菜单
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
            menu: bubbleMenus.value.find((menu) => menu.name === "link"),
          }),
      ]);
  },
});
