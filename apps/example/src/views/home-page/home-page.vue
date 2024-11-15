<template>
  <div class="w-full h-100vh flex">
    <div 
      class="w-320px h-full border-r-1 border-r-[var(--color-border-1)] border-r-solid box-border overflow-hidden transition-all duration-300" 
      :class="{ 'w-0px!': !showSidebar }"
    ></div>
    <div class="w-full h-full flex-1 flex flex-col">
      <div class="w-full h-52px border-b-1 border-b-[var(--color-border-1)] border-b-solid box-border flex justify-between">
        <div class="h-full flex items-center pl-20px">
          <a-button @click="showSidebar = !showSidebar" type="text" class="rounded-6px! text-[var(--color-text-2)]!">
            <template #icon>
              <icon-lucide-panel-left />
            </template>
          </a-button>
        </div>
        <div class="h-full flex justify-end items-center">
          <div class="flex flex-col items-end justify-center text-0.8rem text-[var(--color-text-3)] font-500" v-if="!editorEl?.isEmpty">
            <span>{{ words }} words</span>
            <span>{{ characters }} characters</span>
          </div>
          <div class="flex justify-center items-center text-0.8rem text-[var(--color-text-3)] font-500" v-else>empty</div>
          <div class="w-1px h-65% bg-[var(--color-border-1)] ml-1rem mr-1rem"></div>
          <div class="w-65px pr-1rem" v-if="editorEl?.isFocused">
            <span class="w-0.51em h-0.5em inline-block rounded-full bg-[rgba(var(--success-6),1)] mr-0.5rem"></span>
            <span class="text-0.9rem text-[var(--color-text-2)] font-500">Editing</span>
          </div>
          <div class="w-65px pr-1rem" v-else>
            <span class="w-0.51em h-0.5em inline-block rounded-full bg-[var(--color-fill-3)] mr-0.5rem"></span>
            <span class="text-0.9rem text-[var(--color-text-2)] font-500">Ready</span>
          </div>
        </div>
      </div>
      <div class="w-full h-full overflow-y-auto overflow-x-hidden flex-1">
        <div class="w-full border-b-1 border-b-[var(--color-border-1)] border-b-solid box-border">
          <IsleEditorToolbar v-if="editorEl?.editor" :editor="editorEl?.editor"></IsleEditorToolbar>
        </div>
        <div class="max-w-42rem w-full mx-auto flex flex-1 flex-col">
          <IsleEditorBubble v-if="editorEl?.editor" :editor="editorEl?.editor">
            <!-- @mousedown.prevent 阻止冒泡 保证按钮点击不失去页面焦点 -->
            <!-- <template #bold="{ editor }">
              <div @mousedown.prevent @click="editor.chain().focus().toggleBold().run()">
                Bold
              </div>
            </template> -->
          </IsleEditorBubble>
          <IsleEditor ref="editorEl" v-model="content" :extensions="extensions" @update="editorUpdate"></IsleEditor>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
  Heading, 
  OrderedList, 
  BulletList, 
  TaskList, 
  Blockquote, 
  Divider, 
  Bold, 
  Italic, 
  Strike, 
  Underline, 
  Subscript, 
  Superscript, 
  Code, 
  Link, 
  Color, 
  Background,
  TextAlign,
  UniqueID
} from '@isle-editor/core'
import { IsleEditor, IsleEditorBubble, IsleEditorToolbar} from '@isle-editor/vue3'
import '@isle-editor/vue3/dist/style.css'

const content = ref(`<h1 class="isle-editor__heading">H1 标题一</h1><h2 class="isle-editor__heading">H2 标题二</h2><h3 class="isle-editor__heading">H3 标题三</h3><h4 class="isle-editor__heading">H4 标题四</h4><h5 class="isle-editor__heading">H5 标题五</h5><h6 class="isle-editor__heading">H6 标题六</h6><p class="isle-editor__paragraph">段落示意段落示意段落示意<a target="_blank" rel="noopener noreferrer nofollow" href="https://www.baidu.com">段落示意段落</a>示意段落示意段落示意段落示意段落示意段落示意段落示意段落示意段落示意段落示意段落示意段落示意段落示意段落示意段落示意段落示意段落示意段落示意段落示意段落示意段落示意段落示意段落示意段落示意段落示意段落示意段落示意段落示意段落示意段落示意段落示意段落示意段落示意段落示意</p><ul class="isle-editor__bullet-list"><li><p class="isle-editor__paragraph">无序列表项</p><ul class="isle-editor__bullet-list"><li><p class="isle-editor__paragraph">无序列表项</p></li><li><p class="isle-editor__paragraph">无序列表项</p></li></ul></li><li><p class="isle-editor__paragraph">无序列表项</p></li><li><p class="isle-editor__paragraph">无序列表项</p></li></ul><ol class="isle-editor__ordered-list"><li><p class="isle-editor__paragraph">有序列表项</p><ol class="isle-editor__ordered-list"><li><p class="isle-editor__paragraph">有序列表项</p></li><li><p class="isle-editor__paragraph">有序列表项</p></li></ol></li><li><p class="isle-editor__paragraph">有序列表项</p></li><li><p class="isle-editor__paragraph">有序列表项</p></li></ol><ul class="isle-editor__task-list" data-type="taskList"><li data-checked="true" data-type="taskItem"><label><input type="checkbox" checked="checked"><span></span></label><div><p class="isle-editor__paragraph">任务列表项</p><ul class="isle-editor__task-list" data-type="taskList"><li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p class="isle-editor__paragraph">任务列表项</p></div></li><li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p class="isle-editor__paragraph">任务列表项</p></div></li><li data-checked="true" data-type="taskItem"><label><input type="checkbox" checked="checked"><span></span></label><div><p class="isle-editor__paragraph">任务列表项</p></div></li></ul></div></li><li data-checked="true" data-type="taskItem"><label><input type="checkbox" checked="checked"><span></span></label><div><p class="isle-editor__paragraph">任务列表项</p></div></li><li data-checked="true" data-type="taskItem"><label><input type="checkbox" checked="checked"><span></span></label><div><p class="isle-editor__paragraph">任务列表项</p></div></li></ul>`)
const editorEl = ref(null)

const extensions = [
Heading, 
  OrderedList, 
  BulletList, 
  TaskList, 
  Blockquote, 
  Divider, 
  Italic, 
  Strike, 
  Underline, 
  Subscript.configure({
    bubble: false
  }), 
  Superscript.configure({
    bubble: false
  }), 
  Bold, 
  Code, 
  Link, 
  Background, 
  Color,
  TextAlign,
  UniqueID.configure({
    types: ['heading', 'paragraph']
  })
]

const characters = ref(0)
const words = ref(0)
function charactersCount(editor) {
  const characterObj = editor.getCharacters()
  characters.value = characterObj.characters
  words.value = characterObj.words
}

function editorUpdate({ editor }) {
  console.log('editorUpdate', editor)
  charactersCount(editor)
}

const showSidebar = ref(false)
</script>

<style></style>