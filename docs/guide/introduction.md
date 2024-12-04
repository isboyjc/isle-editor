# Introduction

## What is isle-editor?

`isle-editor` is an open-source web editor that supports rich text, block-based, and `markdown` editing. It's efficient and ready to use out of the box, built on top of [prosemirror](https://github.com/prosemirror) and [tiptap](https://github.com/ueberdosis/tiptap).

With `isle-editor` we want to make it easy for developers to add text editing to their apps. `isle-editor` is `new` compared to open-source editors on the market, and it supports the popular `Notion Style` style in addition to the normal rich text style.

You can output `HTML` as a normal rich text editor or `JSON` as a block editor.

Considering the extensibility, you can use our built-in combo extensions to build the editor quickly, or you can selectively use our core extensions to customize your editor step by step, and you can also customize the extensions to enrich the functionality of the editor.

## Why choose isle-editor?

`prosemirror` is a powerful and flexible open source rich text editor framework, it provides a set of core tools and `API` for building highly customizable rich text editor. `tiptap` is based on `prosemirror` implementation of an open source modern rich text editor framework, it `prosemirror` provides a higher level of encapsulation and default implementation, making it easier to use.

Both `prosemirror` and `tiptap` are headless, i.e., they don't depend on any frameworks, and while you can use `tiptap` to greatly simplify the development of your editor, it is still complex because `tiptap` doesn't provide a `UI` view, and there is a lot of processing that needs to be done for the editor when developing it, including implementation of the extensions, and view-layer processing.

The goal of `isle-editor` is to provide developers with a fully out-of-the-box rich text editor that can be quickly integrated into existing projects without complex configuration. We reuse the core implementation of `tiptap` because it is relatively reliable, and we provide multiple versions of the `UI` view and more core extensions that allow users to use it out-of-the-box based on configuration.

You can use `isle-editor` in any framework and quickly integrate it into existing projects without complex configuration. (Currently we only support `vue` views, more framework views are in the queue, or you can submit your code on [GitHub](https://github.com/isboyjc/isle-editor) to help us implement view support for more frameworks).

Although `isle-editor` currently only supports `Vue` views, its core extensions are fully integrated with `tiptap`, so if you are developing a project using `tiptap`, you can use our core extensions seamlessly. You can also refer to the `isle-editor` source code as we expect it to be a best practice for `tiptap`.

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

## Next Steps

- Check out the [Installation Guide](/guide/installation) to get started
- Read the [Quick Start](/guide/quick-start) to learn basic usage
