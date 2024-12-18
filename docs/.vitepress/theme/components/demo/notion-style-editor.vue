<template>
  <div
    class="w-full h-full flex flex-col border-2 border-solid border-[var(--isle-editor-border-color)] rounded-2 box-border"
    uno-focus-within="border-[var(--vp-c-brand)] shadow-[var(--vp-shadow-5)]"
  >
    <div
      class="w-full border-b border-b-solid border-b-[var(--isle-editor-border-color)] box-border"
    >
      <div
        class="w-full h-52px px-1rem flex justify-between border-b border-b-solid border-b-[var(--isle-editor-border-color)] box-border"
      >
        <div></div>
        <div class="h-full">
          <div
            class="h-full flex flex-col justify-center items-end text-11px leading-4.5"
          >
            <span>{{ words || 0 }} words</span>
            <span>{{ characters || 0 }} characters</span>
          </div>
        </div>
      </div>
      <IsleEditorToolbar v-if="editorEl?.editor" :editor="editorEl?.editor" />
    </div>
    <div class="w-full flex-1">
      <IsleEditorBubble v-if="editorEl?.editor" :editor="editorEl?.editor" />
      <div class="max-w-full w-screen-md mx-auto">
        <IsleEditor
          class="px-2rem py-1rem"
          ref="editorEl"
          :spellcheck="true"
          v-model="content"
          :locale="locale"
          :theme="theme"
          :extensions="extensions"
          @update="editorUpdate"
        ></IsleEditor>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  IsleEditor,
  IsleEditorToolbar,
  IsleEditorBubble,
  NotionKit,
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
  defaultContent: {
    type: String,
    default: "",
  },
});

const editorEl = ref(null);
const content = ref(props.defaultContent);
const extensions = [
  NotionKit.configure({
    placeholder: {
      placeholder: props.placeholder,
    },
  }),
];

const characters = ref(0);
const words = ref(0);
function charactersCount(editor) {
  const characterObj = editor.getCharacters();
  characters.value = characterObj.characters;
  words.value = characterObj.words;
}

function editorUpdate({ editor, output }) {
  console.log(output);
  charactersCount(editor);
}
</script>
