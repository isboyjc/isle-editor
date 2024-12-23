import BasicKit from "./basic-kit.js";
import {
  UniqueID,
  Toc,
  Color,
  TextAlign,
  FontFamily,
  FontSize,
  Heading,
  Blockquote,
  Divider,
  OrderedList,
  BulletList,
  TaskList,
  ListItem,
  Bold,
  Italic,
  Underline,
  Strike,
  Code,
  Subscript,
  Superscript,
  Link,
  Background,
  TextStyle,
  CodeBlock,
  Table,
} from "@isle-editor/core";

export default BasicKit.extend({
  name: "richTextKit",

  addOptions() {
    return {
      ...this.parent?.(),
    };
  },

  addExtensions() {
    const extensions = [...this.parent?.()];

    if (this.options.heading !== false) {
      extensions.push(Heading.configure(this.options?.heading));
    }

    if (this.options.blockquote !== false) {
      extensions.push(Blockquote.configure(this.options?.blockquote));
    }

    if (this.options.divider !== false) {
      extensions.push(Divider.configure(this.options?.divider));
    }

    if (this.options.bold !== false) {
      extensions.push(Bold.configure(this.options?.bold));
    }

    if (this.options.italic !== false) {
      extensions.push(Italic.configure(this.options?.italic));
    }

    if (this.options.underline !== false) {
      extensions.push(Underline.configure(this.options?.underline));
    }

    if (this.options.strike !== false) {
      extensions.push(Strike.configure(this.options?.strike));
    }

    if (this.options.code !== false) {
      extensions.push(Code.configure(this.options?.code));
    }

    if (this.options.subscript !== false) {
      extensions.push(Subscript.configure(this.options?.subscript));
    }

    if (this.options.superscript !== false) {
      extensions.push(Superscript.configure(this.options?.superscript));
    }

    if (this.options.link !== false) {
      extensions.push(Link.configure(this.options?.link));
    }

    if (this.options.uniqueID !== false) {
      extensions.push(UniqueID.configure(this.options?.uniqueID));
    }

    if (this.options.toc !== false) {
      extensions.push(Toc.configure(this.options?.toc));
    }

    if (this.options.orderedList !== false) {
      extensions.push(OrderedList.configure(this.options?.orderedList));
    }

    if (this.options.bulletList !== false) {
      extensions.push(BulletList.configure(this.options?.bulletList));
    }

    if (this.options.taskList !== false) {
      extensions.push(TaskList.configure(this.options?.taskList));
    }

    if (this.options.listItem !== false) {
      extensions.push(ListItem.configure(this.options?.listItem));
    }

    if (this.options.color !== false) {
      extensions.push(
        Color.configure(
          this.options?.color || {
            type: "picker",
          },
        ),
      );
    }

    if (this.options.textAlign !== false) {
      extensions.push(TextAlign.configure(this.options?.textAlign));
    }

    if (this.options.textStyle !== false) {
      extensions.push(TextStyle.configure(this.options?.textStyle));
    }

    if (this.options.fontFamily !== false) {
      extensions.push(FontFamily.configure(this.options?.fontFamily));
    }

    if (this.options.fontSize !== false) {
      extensions.push(FontSize.configure(this.options?.fontSize));
    }

    if (this.options.background !== false) {
      extensions.push(
        Background.configure(
          this.options?.background || {
            type: "picker",
          },
        ),
      );
    }

    if (this.options.codeBlock !== false) {
      extensions.push(CodeBlock.configure(this.options?.codeBlock));
    }

    if (this.options.table !== false) {
      extensions.push(
        Table.configure(
          this.options?.table || {
            resizable: true,
          },
        ),
      );
    }

    return extensions;
  },
});
