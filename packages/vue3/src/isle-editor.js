import {
  Document,
  Text,
  Paragraph,
  Gapcursor,
  Dropcursor,
  HardBreak,
  CharacterCount,
  History,
  Indent,
  Typography,
  CommandAKeymap,
  ListItem,
  // Selection,
  TextStyle,
  prefixClass,
} from "@isle-editor/core";
import {
  defineComponent,
  ref,
  h,
  shallowRef,
  onMounted,
  getCurrentInstance,
} from "vue";
import { v4 as uuidv4 } from "uuid";
import { Editor } from "./editor.js";
import "./styles/index.scss";

export default defineComponent({
  name: "IsleEditor",
  props: {
    modelValue: {
      type: [Object, Array, String],
      default: "",
    },
    // 扩展
    extensions: {
      type: Array,
      default: () => [],
    },
    // 自动获焦
    autofocus: {
      type: [Boolean, String, Number],
      default: false,
    },
    // 是否可编辑 默认 true
    editable: {
      type: Boolean,
      default: true,
    },
    // 输入规则
    enableInputRules: {
      type: [Array, Boolean],
      default: true,
    },
    // 粘贴规则
    enablePasteRules: {
      type: [Array, Boolean],
      default: true,
    },
    // 是否启用内容校验
    enableContentCheck: {
      type: Boolean,
      default: false,
    },
    // 是否注入 CSS（默认 tiptap 会注入一些 css
    // https://github.com/ueberdosis/tiptap/blob/main/packages/core/src/style.ts）
    injectCSS: {
      type: Boolean,
      default: true,
    },
    // https://tiptap.dev/docs/editor/api/editor#injectnonce
    injectNonce: {
      type: String,
      default: undefined,
    },
    // editorProps 对象由 ProseMirror 处理
    // 可以使用它来覆盖各种编辑器事件或更改编辑器DOM元素属性，例如添加一些类
    // https://tiptap.dev/docs/editor/api/editor#editorprops
    editorProps: {
      type: Object,
      default: () => {},
    },
    // parseOptions 对象由 ProseMirror 解析
    // https://prosemirror.net/docs/ref/#model.ParseOptions
    parseOptions: {
      type: Object,
      default: () => {},
    },
    // 是否启用核心扩展
    enableCoreExtensions: {
      type: [Boolean, Object],
      default: true,
    },
    // 是否展示标题块
    title: {
      type: Boolean,
      default: false,
    },
    // 拼写检查是否开启 - ProseMirror 不提供内置拼写检查，此依托于浏览器内置拼写检查
    spellcheck: {
      type: Boolean,
      default: false,
    },
    // 字符配置
    characters: {
      type: Object,
      default: () => ({
        // 字符限制
        limit: null,
        // 计算模式 textSize | nodeSize
        mode: "textSize",
        // 文本字符数计算
        textCounter: (text) => [...new Intl.Segmenter().segment(text)].length,
        // 文本单词数计算
        wordCounter: (text) =>
          text.split(/\s+/).filter((word) => word !== "").length,
      }),
    },
  },
  emits: [
    "update:modelValue",
    "update",
    "beforeCreate",
    "create",
    "selectionUpdate",
    "transaction",
    "focus",
    "blur",
    "destroy",
    "contentError",
    "paste",
    "drop",
  ],
  setup(props, { slots, emit, expose }) {
    const instance = getCurrentInstance();
    const editorContainer = ref(null);
    // Editor 实例
    const editor = shallowRef(null);
    // 实例 uuid
    const uuid = uuidv4();
    // 是否聚焦
    const isFocused = ref(false);
    // 是否为空
    const isEmpty = ref(false);

    // 核心扩展 - 默认配置扩展
    const coreExtensions = props.enableCoreExtensions
      ? [
          Document.configure({
            title: props.title,
          }),
          Text,
          Paragraph,
          Gapcursor,
          HardBreak,
          CharacterCount.configure({
            ...props.characters,
          }),
          History,
          Indent,
          Typography,
          Dropcursor.configure({
            width: 5,
            color: `rgba(var(--${prefixClass}-theme-primary-val), 0.3)`,
            class: `${prefixClass}-dropcursor`,
          }),
          CommandAKeymap,
          props.extensions.some(
            (v) => v.name == "color" || v.name == "fontFamily",
          ) && TextStyle,
          props.extensions.some(
            (v) => v.name == "orderedList" || v.name == "bulletList",
          ) && ListItem,
        ].filter((ext) => {
          if (props.enableCoreExtensions === false) return false;
          if (typeof props.enableCoreExtensions === "object") {
            return props.enableCoreExtensions[ext.name] !== false;
          }
          return true;
        })
      : [];

    const extensions = [...coreExtensions, ...props.extensions].filter(
      (ext) => {
        return ["extension", "node", "mark"].includes(ext?.type);
      },
    );

    // 合并默认 editorProps & spellcheck 配置
    const editorProps = {
      ...props.editorProps,
      attributes: {
        ...(props.editorProps?.attributes || {}),
        spellcheck: String(props.spellcheck),
      },
    };

    // 获取字符数
    const getCharacters = (params = {}) => {
      return {
        characters: editor.value.storage.characterCount.characters(params),
        words: editor.value.storage.characterCount.words(params),
      };
    };

    // 校验编辑器是否为空
    function checkEditorEmpty() {
      isEmpty.value = editor.value ? editor.value.getText().trim() == "" : true;
    }
    checkEditorEmpty();

    const onUpdate = (options) => {
      let output =
        props?.output === "html"
          ? options?.editor.getHTML()
          : options?.editor.getJSON();
      // console.log(options?.editor.getHTML())

      checkEditorEmpty();

      emit("update:modelValue", output);

      emit("update", {
        output,
        editor: options?.editor,
      });
    };

    // Editor 渲染方法
    const editorRender = () => {
      if (!editor.value) editor.value?.destroy();

      editor.value = new Editor({
        element: editorContainer.value,
        content: props.modelValue,
        extensions: extensions,
        editable: props.editable,
        autofocus: !props.editable ? false : props.autofocus || false,
        editorProps,
        enableInputRules: props.enableInputRules,
        enablePasteRules: props.enablePasteRules,
        enableContentCheck: props.enableContentCheck,
        injectCSS: props.injectCSS,
        injectNonce: props.injectNonce,
        parseOptions: props.parseOptions,
        // 在编辑器视图创建之前触发
        onBeforeCreate: (options) => {
          emit("beforeCreate", options);
        },
        // 当编辑器完全初始化并准备就绪时发生
        onCreate: (options) => {
          onUpdate(options);
          emit("create", options);
        },
        // 当内容发生变化时触发
        onUpdate,
        // 当编辑器内的选择发生变化时发生
        onSelectionUpdate: (options) => {
          emit("selectionUpdate", options);
        },
        // 当编辑器状态由于任何操作而改变时调用
        onTransaction: (options) => {
          emit("transaction", options);
        },
        // 当编辑器获得焦点时触发
        onFocus: (options) => {
          isFocused.value = true;
          emit("focus", options);
        },
        // 当编辑器失去焦点时触发
        onBlur: (options) => {
          isFocused.value = false;
          emit("blur", options);
        },
        // 当编辑器实例被销毁时发生
        onDestroy: () => {
          emit("destroy");
        },
        // 内容与架构不匹配时触发
        onContentError: (options) => {
          emit("contentError", options);
        },
        // 当内容粘贴到编辑器时触发
        onPaste: (...options) => {
          emit("paste", ...options);
        },
        // 当内容被放入编辑器时触发
        onDrop: (...options) => {
          emit("drop", ...options);
        },
      });

      // 添加实例静态方法
      editor.value.uuid = uuid;
      editor.value.getCharacters = getCharacters;

      editor.contentComponent = instance.ctx._;

      if (instance) {
        editor.appContext = {
          ...instance.appContext,
          provides: instance.provides,
        };
      }
    };

    onMounted(() => {
      editorRender();
    });

    expose({
      editor: editor,
      isFocused,
      isEmpty,
    });
    return () =>
      h(
        "div",
        { ref: editorContainer, class: `${prefixClass}-editor-root` },
        slots.default?.(),
      );
  },
});
