import {
  Bold,
  Italic,
  Strikethrough as Strike,
  Subscript,
  Superscript,
  Underline,
  Code,
  Link,
  Unlink,
  Copy,
  Check,
  SquareArrowOutUpRight as OpenRight,
  SquarePen as Edit,
  Baseline as Color,
  PaintBucket as Background,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Eraser as TextClear,
  Heading,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  TextQuote as Blockquote,
  List as BulletList,
  ListOrdered as OrderedList,
  ListTodo as TaskList,
  Pilcrow as Paragraph,
  Divide as Divider,
  Undo,
  Redo,
  Indent,
  Outdent,
} from "lucide-vue-next";
const ICONS = {
  Bold,
  Italic,
  Strike,
  Subscript,
  Superscript,
  Underline,
  Code,
  Link,
  Unlink,
  Copy,
  Check,
  OpenRight,
  Edit,
  Color,
  Background,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  TextClear,
  Heading,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Blockquote,
  BulletList,
  OrderedList,
  TaskList,
  Paragraph,
  Divider,
  Undo,
  Redo,
  Indent,
  Outdent,
};

export const getIcon = (name) => {
  if (!name) {
    console.warn("Icon name is required");
    return null;
  }
  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
  if (!(capitalizedName in ICONS)) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }
  return ICONS[capitalizedName];
};

export const addIcon = (name, icon) => {
  if (!name) {
    console.warn("Icon name is required");
    return null;
  }
  if (!icon) {
    console.warn("Icon component is required");
    return null;
  }
  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
  ICONS[capitalizedName] = icon;
};
