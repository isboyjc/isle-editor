<template>
  <div
    class="w-full h-full flex flex-col border-2 border-solid border-[var(--isle-editor-border-color)] rounded-2 box-border"
    uno-focus-within="border-[var(--vp-c-brand)] shadow-[var(--vp-shadow-5)]"
  >
    <div class="w-full flex-1">
      <IsleEditorBubble
        v-if="editorEl?.editor"
        :sort="[]"
        :editor="editorEl?.editor"
      />
      <IsleEditor
        ref="editorEl"
        :spellcheck="true"
        v-model="content"
        :locale="locale"
        :theme="theme"
        :extensions="extensions"
      ></IsleEditor>
    </div>
    <div
      class="w-full border-t border-t-solid border-t-[var(--isle-editor-border-color)] box-border"
    >
      <IsleEditorToolbar
        v-if="editorEl?.editor"
        :sort="toolbar"
        :editor="editorEl?.editor"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  IsleEditor,
  IsleEditorToolbar,
  IsleEditorBubble,
  BasicKit,
} from "@isle-editor/vue3";
import { Bold, Italic, Underline, Strike, Link, Code } from "@isle-editor/core";

const props = defineProps({
  locale: {
    type: String,
    default: "zh",
  },
  theme: {
    type: String,
    default: "light",
  },
});

const editorEl = ref(null);
const content = ref("");
const extensions = [
  BasicKit.configure({}),
  Bold,
  Italic,
  Underline,
  Strike,
  Link,
  Code,
];
const toolbar = [
  "bold",
  "italic",
  "underline",
  "strike",
  "code",
  "link",
  "|",
  "textClear",
];
</script>
