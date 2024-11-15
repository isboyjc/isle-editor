import { Extension } from '@tiptap/core'

export default Extension.create({
  name: 'fontFamily',

  addOptions() {
    return {
      types: ['textStyle'],
      title: 'fontFamily',
      desc: '',
      bubble: true,
      command: ({ editor, fontFamily }) => editor.chain().focus().setFontFamily(fontFamily).run(),
      isActive: ({ editor }) => editor.isActive('fontFamily'),
      fonts: [
        // 无衬线字体（Sans-serif）
        {
          label: 'SystemDefault',
          value: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
        },
        {
          label: 'MicrosoftYaHei',
          value: '"Microsoft YaHei", "PingFang SC", sans-serif'
        },
        {
          label: 'SimSun',
          value: '"SimSun", "STSong", serif'
        },
        {
          label: 'SimHei',
          value: '"SimHei", "STHeiti", sans-serif'
        },
        {
          label: 'KaiTi',
          value: '"KaiTi", "STKaiti", serif'
        },
        // 衬线字体（Serif）
        {
          label: 'TimesNewRoman',
          value: '"Times New Roman", TimesNewRoman, serif'
        },
        // 等宽字体（Monospace）
        {
          label: 'CourierNew',
          value: '"Courier New", Courier, monospace'
        },
        // 装饰性字体
        {
          label: 'Georgia',
          value: 'Georgia, serif'
        },
        {
          label: 'Arial',
          value: 'Arial, "Helvetica Neue", Helvetica, sans-serif'
        }
      ],
    }
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontFamily: {
            default: null,
            parseHTML: element => element.style.fontFamily?.replace(/['"]+/g, ''),
            renderHTML: attributes => {
              if (!attributes.fontFamily) {
                return {}
              }

              return {
                style: `font-family: ${attributes.fontFamily}`,
              }
            },
          },
        },
      },
    ]
  },

  addCommands() {
    return {
      setFontFamily: fontFamily => ({ chain }) => {
        return chain()
          .setMark('textStyle', { fontFamily })
          .run()
      },
      unsetFontFamily: () => ({ chain }) => {
        return chain()
          .setMark('textStyle', { fontFamily: null })
          .removeEmptyTextStyle()
          .run()
      },
    }
  },
})
