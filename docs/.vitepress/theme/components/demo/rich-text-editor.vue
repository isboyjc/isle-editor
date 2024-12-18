<template>
  <div
    class="w-full h-full flex flex-col border-2 border-solid border-[var(--isle-editor-border-color)] rounded-2 box-border"
    uno-focus-within="border-[var(--vp-c-brand)] shadow-[var(--vp-shadow-5)]"
  >
    <div
      class="w-full border-b border-b-solid border-b-[var(--isle-editor-border-color)] box-border"
    >
      <IsleEditorToolbar v-if="editorEl?.editor" :editor="editorEl?.editor" />
    </div>
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
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  IsleEditor,
  IsleEditorToolbar,
  IsleEditorBubble,
  RichTextKit,
} from "@isle-editor/vue3";

const props = defineProps({
  locale: {
    type: String,
    default: "zh",
  },
  theme: {
    type: String,
    default: "light",
  },
  placeholder: {
    type: String,
    default: "",
  },
});

const editorEl = ref(null);
const content = ref("");
const extensions = [
  RichTextKit.configure({
    placeholder: {
      placeholder: props.placeholder,
    },
  }),
];
</script>
