<template>
  <div class="w-full h-100vh flex flex-col">
    <div class="w-full h-52px border-b-1 border-b-#e5e5e5 border-b-solid box-border flex justify-between">
      <div></div>
      <div class="h-full flex justify-end items-center">
        <div class="flex flex-col items-end justify-center text-0.8rem text-#737373 font-500" v-if="!editorEl?.isEmpty">
          <span>{{ words }} words</span>
          <span>{{ characters }} characters</span>
        </div>
        <div class="flex justify-center items-center text-0.8rem text-#737373 font-500" v-else>empty</div>
        <div class="w-1px h-65% bg-#e5e5e5 ml-1rem mr-1rem"></div>
        <div class="w-65px pr-1rem" v-if="editorEl?.isFocused">
          <span class="w-0.51em h-0.5em inline-block rounded-full bg-#16a34a mr-0.5rem"></span>
          <span class="text-0.9rem text-#737373 font-500">Editing</span>
        </div>
        <div class="w-65px pr-1rem" v-else>
          <span class="w-0.51em h-0.5em inline-block rounded-full bg-#e5e5e5 mr-0.5rem"></span>
          <span class="text-0.9rem text-#737373 font-500">Ready</span>
        </div>
      </div>
    </div>
    <div class="max-w-42rem w-full mx-auto overflow-y-auto overflow-x-hidden flex flex-1">
      <IsleEditor ref="editorEl" v-model="content" :extensions="extensions" @update="editorUpdate"></IsleEditor>
    </div>
  </div>
</template>

<script setup>
import { Heading, OrderedList, BulletList, TaskList, Blockquote, Divider, Bold, Italic, Strike, Underline, Subscript, Superscript } from '@isle/editor'
import { IsleEditor } from '@isle/vue3'
import '@isle/vue3/dist/style.css'

const content = ref(`<h1 class="isle-editor__title">H1 标题一</h1><h2 class="isle-editor__heading">H2 标题二</h2><h3 class="isle-editor__heading">H3 标题三</h3><h4 class="isle-editor__heading">H4 标题四</h4><h5 class="isle-editor__heading">H5 标题五</h5><h6 class="isle-editor__heading">H6 标题六</h6><p class="isle-editor__paragraph">段落示意段落示意段落示意段落示意段落示意段落示意段落示意段落示意段落示意段落示意段落示意段落示意段落示意段落示意段落示意段落示意段落示意段落示意段落示意段落示意段落示意段落示意段落示意段落示意段落示意段落示意段落示意段落示意段落示意段落示意段落示意段落示意段落示意段落示意段落示意段落示意段落示意段落示意</p><ul class="isle-editor__bullet-list"><li><p class="isle-editor__paragraph">无序列表项</p><ul class="isle-editor__bullet-list"><li><p class="isle-editor__paragraph">无序列表项</p></li><li><p class="isle-editor__paragraph">无序列表项</p></li></ul></li><li><p class="isle-editor__paragraph">无序列表项</p></li><li><p class="isle-editor__paragraph">无序列表项</p></li></ul><ol class="isle-editor__ordered-list"><li><p class="isle-editor__paragraph">有序列表项</p><ol class="isle-editor__ordered-list"><li><p class="isle-editor__paragraph">有序列表项</p></li><li><p class="isle-editor__paragraph">有序列表项</p></li></ol></li><li><p class="isle-editor__paragraph">有序列表项</p></li><li><p class="isle-editor__paragraph">有序列表项</p></li></ol><ul class="isle-editor__task-list" data-type="taskList"><li data-checked="true" data-type="taskItem"><label><input type="checkbox" checked="checked"><span></span></label><div><p class="isle-editor__paragraph">任务列表项</p><ul class="isle-editor__task-list" data-type="taskList"><li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p class="isle-editor__paragraph">任务列表项</p></div></li><li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p class="isle-editor__paragraph">任务列表项</p></div></li><li data-checked="true" data-type="taskItem"><label><input type="checkbox" checked="checked"><span></span></label><div><p class="isle-editor__paragraph">任务列表项</p></div></li></ul></div></li><li data-checked="true" data-type="taskItem"><label><input type="checkbox" checked="checked"><span></span></label><div><p class="isle-editor__paragraph">任务列表项</p></div></li><li data-checked="true" data-type="taskItem"><label><input type="checkbox" checked="checked"><span></span></label><div><p class="isle-editor__paragraph">任务列表项</p></div></li></ul>`)
const editorEl = ref(null)

const extensions = [Heading, OrderedList, BulletList, TaskList, Blockquote, Divider, Bold, Italic, Strike, Underline, Subscript, Superscript]

const characters = ref(0)
const words = ref(0)
function charactersCount(editor) {
  const characterObj = editor.getCharacters()
  characters.value = characterObj.characters
  words.value = characterObj.words
}

function editorUpdate({ editor }) {
  charactersCount(editor)
}
</script>

<style></style>