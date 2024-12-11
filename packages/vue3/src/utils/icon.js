import Bold from "~icons/lucide/bold";
import Italic from "~icons/lucide/italic";
import Strike from "~icons/lucide/strikethrough";
import Subscript from "~icons/lucide/subscript";
import Superscript from "~icons/lucide/superscript";
import Underline from "~icons/lucide/underline";
import Code from "~icons/lucide/code";
import Link from "~icons/lucide/link";
import Unlink from "~icons/lucide/unlink";
import Copy from "~icons/lucide/copy";
import Check from "~icons/lucide/check";
import OpenRight from "~icons/lucide/square-arrow-out-up-right";
import Edit from "~icons/lucide/square-pen";
import Color from "~icons/lucide/baseline";
import Background from "~icons/lucide/paint-bucket";
import AlignLeft from "~icons/lucide/align-left";
import AlignCenter from "~icons/lucide/align-center";
import AlignRight from "~icons/lucide/align-right";
import AlignJustify from "~icons/lucide/align-justify";
import TextClear from "~icons/lucide/eraser";
import Heading from "~icons/lucide/heading";
import Heading1 from "~icons/lucide/heading-1";
import Heading2 from "~icons/lucide/heading-2";
import Heading3 from "~icons/lucide/heading-3";
import Heading4 from "~icons/lucide/heading-4";
import Heading5 from "~icons/lucide/heading-5";
import Heading6 from "~icons/lucide/heading-6";
import Blockquote from "~icons/lucide/text-quote";
import BulletList from "~icons/lucide/list";
import OrderedList from "~icons/lucide/list-ordered";
import TaskList from "~icons/lucide/list-todo";
import Paragraph from "~icons/lucide/pilcrow";
import Divider from "~icons/lucide/divide";
import Undo from "~icons/lucide/undo";
import Redo from "~icons/lucide/redo";
import Indent from "~icons/lucide/indent-decrease";
import Outdent from "~icons/lucide/indent-increase";
import HardBreak from "~icons/lucide/wrap-text";
import Down from "~icons/lucide/chevron-down";
import CodeBlock from "~icons/lucide/code-xml";
import Table from "~icons/lucide/table";

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
  HardBreak,
  Down,
  CodeBlock,
  Table,
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
