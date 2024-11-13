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
      isActive: ({ editor }) => editor.isActive('fontFamily')
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
