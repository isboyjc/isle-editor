import { Extension } from "@tiptap/core";
import {
  Document,
  Gapcursor,
  History,
  Indent,
  Typography,
  CommandAKeymap,
  Dropcursor,
  CharacterCount,
  Placeholder,
  Text,
  Paragraph,
  HardBreak,
} from "@/extensions";
import { prefixClass } from "@/utils";

export default Extension.create({
  name: "basicKit",

  addExtensions() {
    const extensions = [];

    if (this.options.document !== false) {
      extensions.push(Document.configure(this.options?.document));
    }

    if (this.options.text !== false) {
      extensions.push(Text.configure(this.options?.text));
    }

    if (this.options.paragraph !== false) {
      extensions.push(Paragraph.configure(this.options?.paragraph));
    }

    if (this.options.gapcursor !== false) {
      extensions.push(Gapcursor.configure(this.options?.gapcursor));
    }

    if (this.options.history !== false) {
      extensions.push(History.configure(this.options?.history));
    }

    if (this.options.hardBreak !== false) {
      extensions.push(HardBreak.configure(this.options?.hardBreak));
    }

    if (this.options.indent !== false) {
      extensions.push(Indent.configure(this.options?.indent));
    }

    if (this.options.typography !== false) {
      extensions.push(Typography.configure(this.options?.typography));
    }

    if (this.options.commandAKeymap !== false) {
      extensions.push(CommandAKeymap.configure(this.options?.commandAKeymap));
    }

    if (this.options.dropcursor !== false) {
      extensions.push(
        Dropcursor.configure(
          this.options?.dropcursor || {
            width: 5,
            color: `rgba(var(--${prefixClass}-theme-primary-val), 0.3)`,
            class: `${prefixClass}-dropcursor`,
          },
        ),
      );
    }

    if (this.options.characterCount !== false) {
      extensions.push(CharacterCount.configure(this.options?.characterCount));
    }

    if (this.options.placeholder !== false) {
      extensions.push(Placeholder.configure(this.options?.placeholder));
    }

    return extensions;
  },
});
