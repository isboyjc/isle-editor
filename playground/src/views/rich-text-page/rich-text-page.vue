<template>
  <div class="w-full h-full">
    <div class="w-screen-lg min-h-500px">
      <IsleEditor
        ref="editorEl"
        v-model="content"
        :extensions="extensions"
        @update="editorUpdate"
      ></IsleEditor>
    </div>
  </div>
</template>

<script setup>
import { IsleEditor, IsleEditorToolbar, RichTextKit } from '@isle-editor/vue3'

const content = ref('')
const extensions = [RichTextKit.configure({})]
</script>
