import * as TiptapCore from '@tiptap/core'
// Filter the Editor class and export it using inherited classes
const { Editor: _Editor, ...rest } = TiptapCore
export const { ...exportedProps } = rest
export * from './editor.js'

export * from './locales/index.js'
export * from './extensions/index.js'
export * from './nodes/index.js'
export * from './marks/index.js'
export * from './utils/index.js'
