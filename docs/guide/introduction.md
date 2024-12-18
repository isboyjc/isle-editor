# Introduction

## What is isle-editor?

`isle-editor` is an open-source web editor that supports rich text, block-based, and `markdown` editing. It's efficient and ready to use out of the box, built on top of [prosemirror](https://github.com/prosemirror) and [tiptap](https://github.com/ueberdosis/tiptap).

Through `isle-editor`, we aim to make it easy for developers to add text editing capabilities to their applications. Compared to other open-source editors in the market, `isle-editor` is `new` and supports both traditional rich text styling and the popular `Notion Style` interface.

You can output `HTML` to use it as a regular rich text editor, or output `JSON` to use it as a block editor.

For extensibility, you can use our built-in combination extension packages to quickly set up your editor, selectively use our core extensions to customize your editor step by step, or create custom extensions to enhance the editor's functionality.

## Why choose isle-editor?

`prosemirror` is a powerful and flexible open-source rich text editing framework that provides a set of core tools and `API`s for building highly customizable rich text editors. `tiptap` is a modern rich text editor framework built on top of `prosemirror`, providing higher-level abstractions and default implementations that make it more user-friendly.

Both `prosemirror` and `tiptap` are headless, meaning they don't depend on any specific framework. While `tiptap` greatly simplifies editor development, it remains complex because it doesn't provide a `UI` view. When developing with it, you need to handle many aspects, including implementing various extensions and managing the view layer.

`isle-editor`'s goal is to provide developers with a completely out-of-the-box rich text editor that can be quickly integrated into existing projects without complex configuration. We leverage `tiptap`'s core implementation for its reliability while providing `UI` views and additional core extensions that enable out-of-the-box functionality through configuration.

You can use `isle-editor` in any framework and quickly integrate it into existing projects without complex configuration. (We prioritize support for `Vue` views, with more framework views in development. You can also contribute your code on [GitHub](https://github.com/isboyjc/isle-editor) to help us implement view support for additional frameworks.)

`isle-editor`'s core extensions are fully compatible with `tiptap`. If you're developing a project using `tiptap`, you can seamlessly use our core extensions. You can also reference the `isle-editor` source code, as we aim for it to be a best practice implementation of `tiptap`.

## Features

- **Ready to Use**: Simple to use, requires only a few lines of code to integrate, no complex configuration needed.
- **Extensible**: Rich set of plug-and-play extensions and view components, with support for customization.
- **Customizable**: Supports custom theme styling, comes with built-in `light` and `dark` themes.
- **Multilingual**: Supports multilingual editing, with built-in Chinese and English support, extensible for more languages.
- **Flexible**: Supports various editing modes including block editing, rich text, `WYSIWYG`, `Markdown`, and `Notion Style` editing.
- **High Performance**: Built on `prosemirror` and `tiptap` for high-performance implementation, providing a smooth editing experience.

## Use Cases

`isle-editor` is suitable for various scenarios:

- **Content Creation**: Blogs, documentation, notes, and other content creation scenarios
- **Collaborative Editing**: Team collaboration and real-time editing scenarios
- **Rich Text Editing**: Support for images, videos, tables, and other rich text content
- **Custom Editors**: Can be customized to create specialized editors for specific needs

## Quick Demo

Visit our [online playground](https://playground.islenote.com) to quickly experience `isle-editor` in action.

## Next Steps

- Check out the [Installation Guide](/guide/installation) to get started
- Read the [Quick Start](/guide/quick-start) to learn basic usage
