# isle-editor

[![NPM](https://img.shields.io/npm/v/@isle-editor/core.svg)](https://www.npmjs.com/package/@isle-editor/core)
[![GitHub](https://img.shields.io/github/stars/isboyjc/isle-editor.svg?style=social)](https://github.com/isboyjc/isle-editor)

[简体中文](./README-zh.md)

For more detailed information, make sure to check out our [documentation](https://editor.islenote.com). If you encounter any problems or have suggestions for our system, please open an issue.

## Introduction

`isle-editor` is an open-source web editor that supports rich text, block-based, and `markdown` editing. It's efficient and ready to use out of the box, built on top of [prosemirror](https://github.com/prosemirror) and [tiptap](https://github.com/ueberdosis/tiptap).

With `isle-editor` we want to make it easy for developers to add text editing to their apps. `isle-editor` is `new` compared to open-source editors on the market, and it supports the popular `Notion Style` style in addition to the normal rich text style.

You can output `HTML` as a normal rich text editor or `JSON` as a block editor.

Considering the extensibility, you can use our built-in combo extensions to build the editor quickly, or you can selectively use our core extensions to customize your editor step by step, and you can also customize the extensions to enrich the functionality of the editor.

## Why choose isle-editor

`prosemirror` is a powerful and flexible open-source rich text editing framework that provides a set of core tools and `API`s for building highly customizable rich text editors. `tiptap` is a modern rich text editor framework built on top of `prosemirror`, providing higher-level abstractions and default implementations that make it more user-friendly.

Both `prosemirror` and `tiptap` are headless, meaning they don't depend on any specific framework. While `tiptap` greatly simplifies editor development, it remains complex because it doesn't provide a `UI` view. When developing with it, you need to handle many aspects, including implementing various extensions and managing the view layer.

`isle-editor`'s goal is to provide developers with a completely out-of-the-box rich text editor that can be quickly integrated into existing projects without complex configuration. We leverage `tiptap`'s core implementation for its reliability while providing `UI` views and additional core extensions that enable out-of-the-box functionality through configuration.

You can use `isle-editor` in any framework and quickly integrate it into existing projects without complex configuration. (We prioritize support for `Vue` views, with more framework views in development. You can also contribute your code on [GitHub](https://github.com/isboyjc/isle-editor) to help us implement view support for additional frameworks.)

`isle-editor`'s core extensions are fully compatible with `tiptap`. If you're developing a project using `tiptap`, you can seamlessly use our core extensions. You can also reference the `isle-editor` source code, as we aim for it to be a best practice implementation of `tiptap`.

## Features

- **Ready to Use**: Simple to integrate with just a few lines of code, no complex configuration needed.
- **Extensible**: Rich set of plug-and-play extensions and view components, with support for customization.
- **Customizable**: Supports custom theme styling, comes with built-in light and dark themes.
- **Multilingual**: Supports multilingual editing, with built-in English and Chinese support, extensible for more languages.
- **Flexible**: Supports various editing modes including block editing, rich text, WYSIWYG, Markdown, and Notion Style editing.
- **High Performance**: Built on ProseMirror and TipTap for smooth editing experience.

## Use Cases

isle-editor is suitable for various scenarios:

- **Content Creation**: Blogs, documentation, notes, and other content creation scenarios
- **Collaborative Editing**: Team collaboration and real-time editing scenarios
- **Rich Text Editing**: Support for images, videos, tables, and other rich text content
- **Custom Editors**: Can be customized to create specialized editors for specific needs

## Quick Demo

Visit our [online playground](https://playground.islenote.com) to quickly experience isle-editor in action.

## License

isle-editor is open sourced software licensed under the [MIT license](https://github.com/isboyjc/isle-editor/blob/main/LICENSE).
