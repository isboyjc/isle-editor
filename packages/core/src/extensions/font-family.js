import { Extension } from "@tiptap/core";

export default Extension.create({
  name: "fontFamily",

  addOptions() {
    return {
      types: ["textStyle"],
      name: "fontFamily",
      desc: "",
      toolbar: true,
      bubble: true,
      command: ({ editor, fontFamily }) =>
        editor.chain().focus().setFontFamily(fontFamily).run(),
      isActive: ({ editor, fontFamily }) =>
        editor.isActive("textStyle", { fontFamily }),
      isDisabled: ({ editor }) => !editor.can().setFontFamily(),
      fonts: [
        // 无衬线字体（Sans-serif）
        {
          label: "Default",
          value: "",
        },
        {
          label: "MicrosoftYaHei",
          value: '"Microsoft YaHei", "PingFang SC", sans-serif',
        },
        {
          label: "SimSun",
          value: '"SimSun", "STSong", serif',
        },
        {
          label: "SimHei",
          value: '"SimHei", "STHeiti", sans-serif',
        },
        {
          label: "KaiTi",
          value: '"KaiTi", "STKaiti", serif',
        },
        // 等宽字体（Monospace）
        {
          label: "CourierNew",
          value: '"Courier New", Courier, monospace',
        },
        // 装饰性字体
        {
          label: "Arial",
          value: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
        },
        {
          label: "Georgia",
          value: "Georgia, serif",
        },
        // 衬线字体（Serif）
        {
          label: "TimesNewRoman",
          value: '"Times New Roman", TimesNewRoman, serif',
        },
      ],
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontFamily: {
            default: null,
            parseHTML: (element) =>
              element.style.fontFamily?.replace(/['"]+/g, ""),
            renderHTML: (attributes) => {
              if (!attributes.fontFamily) {
                return {};
              }

              return {
                style: `font-family: ${attributes.fontFamily}`,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setFontFamily:
        (fontFamily) =>
        ({ chain }) => {
          return chain().setMark("textStyle", { fontFamily }).run();
        },
      unsetFontFamily:
        () =>
        ({ chain }) => {
          return chain()
            .setMark("textStyle", { fontFamily: null })
            .removeEmptyTextStyle()
            .run();
        },
    };
  },
});
