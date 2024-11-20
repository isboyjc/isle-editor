<template>
  <div class="w-full h-100vh flex">
    <div
      class="w-320px h-full border-r-1 border-r-[var(--color-border-1)] border-r-solid box-border overflow-hidden transition-all duration-300"
      :class="{ 'w-0px!': !showSidebar }"
    >
      <IsleEditorToc
        v-if="editorEl?.editor"
        :scrollView="scrollViewRef"
        :editor="editorEl?.editor"
      ></IsleEditorToc>
    </div>
    <div class="w-full h-full flex-1 flex flex-col">
      <div
        class="w-full h-52px border-b-1 border-b-[var(--color-border-1)] border-b-solid box-border flex justify-between"
      >
        <div class="h-full flex items-center pl-20px">
          <a-button
            @click="showSidebar = !showSidebar"
            type="text"
            class="rounded-6px! text-[var(--color-text-2)]!"
          >
            <template #icon>
              <icon-lucide-panel-left />
            </template>
          </a-button>
        </div>
        <div class="h-full flex justify-end items-center">
          <div
            class="flex flex-col items-end justify-center text-0.8rem text-[var(--color-text-3)] font-500"
            v-if="!editorEl?.isEmpty"
          >
            <span>{{ words }} words</span>
            <span>{{ characters }} characters</span>
          </div>
          <div
            class="flex justify-center items-center text-0.8rem text-[var(--color-text-3)] font-500"
            v-else
          >
            empty
          </div>
          <div
            class="w-1px h-65% bg-[var(--color-border-1)] ml-1rem mr-1rem"
          ></div>
          <div class="w-65px pr-1rem" v-if="editorEl?.isFocused">
            <span
              class="w-0.51em h-0.5em inline-block rounded-full bg-[rgba(var(--success-6),1)] mr-0.5rem"
            ></span>
            <span class="text-0.9rem text-[var(--color-text-2)] font-500"
              >Editing</span
            >
          </div>
          <div class="w-65px pr-1rem" v-else>
            <span
              class="w-0.51em h-0.5em inline-block rounded-full bg-[var(--color-fill-3)] mr-0.5rem"
            ></span>
            <span class="text-0.9rem text-[var(--color-text-2)] font-500"
              >Ready</span
            >
          </div>
        </div>
      </div>
      <div
        ref="scrollViewRef"
        class="w-full h-full overflow-y-auto overflow-x-hidden flex-1"
      >
        <!-- <div class="w-full border-b-1 border-b-[var(--color-border-1)] border-b-solid box-border">
          <IsleEditorToolbar v-if="editorEl?.editor" :editor="editorEl?.editor"></IsleEditorToolbar>
        </div> -->
        <div class="max-w-42rem w-full mx-auto flex flex-1 flex-col">
          <IsleEditorBubble v-if="editorEl?.editor" :editor="editorEl?.editor">
            <!-- @mousedown.prevent 阻止冒泡 保证按钮点击不失去页面焦点 -->
            <!-- <template #bold="{ editor }">
              <div @mousedown.prevent @click="editor.chain().focus().toggleBold().run()">
                Bold
              </div>
            </template> -->
          </IsleEditorBubble>
          <IsleEditor
            ref="editorEl"
            v-model="content"
            :extensions="extensions"
            @update="editorUpdate"
          ></IsleEditor>
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
  UniqueID,
  Toc,
  CommandSlash,
  DragHandle,
  Placeholder,
  t
} from '@isle-editor/core'
import {
  IsleEditor,
  IsleEditorBubble,
  IsleEditorToolbar,
  IsleEditorToc,
  createSlashSuggestion
} from '@isle-editor/vue3'
import '@isle-editor/vue3/dist/style.css'

const content = ref(
  `<h1 class="isle-editor__heading" data-id="80b0bdc9-ecfc-4ea6-a5b2-d52ab3095412">这是一个文章标题</h1><h2 class="isle-editor__heading" data-id="172ba60c-e992-40d4-8f64-452beae7fced">这里是前言</h2><p class="isle-editor__paragraph" data-id="c9ef1e42-a79d-45df-8c1d-230727dd2a18">这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里<em><s><u><strong>是正文这里是</strong></u></s></em>正文</p><p class="isle-editor__paragraph" data-id="ff7f4dc5-1dfc-4c71-8fd9-a0884eec3344">/</p><p class="isle-editor__paragraph" data-id="89f3a9a6-69e7-4266-b445-86e2a7b3916f"></p><p class="isle-editor__paragraph" data-id="e0aa481b-1481-4990-8887-b81c4e847b38">这里是正文这里是正文这<code class="isle-editor__code">里是正文这里是正文这里是正文</code>这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文</p><h2 class="isle-editor__heading" data-id="94a61c67-9a88-4497-8d1a-592b0455b559">这里是二级标题1</h2><p class="isle-editor__paragraph" data-id="54b132f9-6db4-435b-9bc3-785a55d37d5a">这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是<a target="_blank" rel="noopener noreferrer nofollow" href="123">正文这里是正文这里是正</a>文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文</p><p class="isle-editor__paragraph" data-id="1a111be4-012e-472b-bb70-5c1cda981e6d">这里是正文这里是正文这里是正文这里是正文</p><h3 class="isle-editor__heading" data-id="8147aa5b-1c5d-41e6-805e-5ca14cf47178">这里是三级标题1</h3><p class="isle-editor__paragraph" data-id="5c6cd0a5-10dd-4748-a0cc-7e1105c833aa">是正文这里是正文这里是正<span style="color: var(--isle-editor-text-purple)"><mark data-color="var(--isle-editor-background-green)" style="background-color: var(--isle-editor-background-green); color: inherit">文这里是正文这里是正文这里是</mark></span>正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里</p><ul class="isle-editor__task-list" data-id="94989f64-fd17-4a6a-be0a-5ed646c35490" data-type="taskList"><li data-checked="true" data-type="taskItem"><label><input type="checkbox" checked="checked"><span></span></label><div><p class="isle-editor__paragraph" data-id="4b940a64-a4df-4d97-8111-95e3b7ee57fe">TODO1</p><ul class="isle-editor__task-list" data-id="dca3973e-639f-4569-becf-73d5509dec75" data-type="taskList"><li data-checked="true" data-type="taskItem"><label><input type="checkbox" checked="checked"><span></span></label><div><p class="isle-editor__paragraph" data-id="de799f08-45ff-4edc-a92e-5bb4ef21e615">TODO1-1</p></div></li><li data-checked="true" data-type="taskItem"><label><input type="checkbox" checked="checked"><span></span></label><div><p class="isle-editor__paragraph" data-id="9b1b8480-c002-458f-a66a-2e85a8a58534">TODO1-2</p></div></li></ul></div></li><li data-checked="true" data-type="taskItem"><label><input type="checkbox" checked="checked"><span></span></label><div><p class="isle-editor__paragraph" data-id="fe60f9da-dec4-48e8-a556-85c905b474d5">TODO2</p></div></li><li data-checked="true" data-type="taskItem"><label><input type="checkbox" checked="checked"><span></span></label><div><p class="isle-editor__paragraph" data-id="dd761172-309b-4c26-b0cf-252bc03d698c">TODO3</p></div></li></ul><h3 class="isle-editor__heading" data-id="0003298b-cc86-4e7c-9408-075744ff8faa">这里是三级标题 2</h3><p class="isle-editor__paragraph" data-id="b6af632f-6e73-452a-b80f-03d01f711b4c">是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里</p><ul class="isle-editor__bullet-list" data-id="6865b208-6bea-4478-a932-03f4d865572d"><li><p class="isle-editor__paragraph" data-id="9846b5cc-7a12-46fb-8c4a-1e56931bf7eb">是正文这里是正文这里</p></li><li><p class="isle-editor__paragraph" data-id="8c27a8cc-942b-4834-a435-20166cb02593">是正文这里是正文这里是正文这里是正文这里</p></li><li><p class="isle-editor__paragraph" data-id="d7065aba-8d6b-48d0-810f-ae24c68b84b3">是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里</p></li></ul><h2 class="isle-editor__heading" data-id="b965f0ad-43e1-4fa3-9018-53bd79246c13">这里是二级标题 2</h2><p class="isle-editor__paragraph" data-id="82dfeb2b-f797-41a7-9d82-eea35fdffd15">里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正</p><h3 class="isle-editor__heading" data-id="44fd7fdf-0d47-4aaf-baeb-859416161574">这里是三级级标题 1</h3><p class="isle-editor__paragraph" data-id="5d097f57-d98e-4966-9969-02e0603e59db">里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正</p><p class="isle-editor__paragraph" data-id="361da7dc-3d4e-4788-b224-611c669700e5"></p><h4 class="isle-editor__heading" data-id="219a1925-dd7a-407d-80f6-07dab7809094">这里是四级标题 1</h4><p class="isle-editor__paragraph" data-id="6d6673d5-1e7b-4229-815a-f1276423869e">里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正</p><h4 class="isle-editor__heading" data-id="73277281-81a4-4087-89bb-1ca90ca1fce5">这里是四级标题 2</h4><p class="isle-editor__paragraph" data-id="716a5062-0810-4700-ba5c-e3b0257d9a27">里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正</p><h5 class="isle-editor__heading" data-id="1eca2ed0-31cd-4565-bd70-0d5084aa310c">这里是五级标题</h5><p class="isle-editor__paragraph" data-id="b299ee0f-7e06-4572-800e-b8c31a1e7198">里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正</p><h3 class="isle-editor__heading" data-id="3555af04-f03c-40f1-8b16-55be5ac4b05b">这里是三级标题 2</h3><p class="isle-editor__paragraph" data-id="52195f69-431c-4b3a-9ca8-92cd66083028">里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正</p><p class="isle-editor__paragraph" data-id="14ff7beb-35d6-4faf-8a52-4c1eae7dfee4">里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正</p>`
)
const editorEl = ref(null)
const scrollViewRef = ref(null)

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
    types: ['heading', 'paragraph', 'bulletList', 'orderedList', 'taskList']
  }),
  Toc.configure({
    levels: [1, 2, 3]
  }),
  CommandSlash.configure(createSlashSuggestion()),
  DragHandle,
  Placeholder.configure({
    placeholder: ({ node }) => {
      switch (node.type.name) {
        case 'heading': {
          return t(`heading${node.attrs.level}`)
        }
        case 'bulletList':
        case 'orderedList':
        case 'taskList':
        case 'codeBlock': {
          return ''
        }
      }
      return 'Write something, or "/" for commands'
    }
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
  // console.log('editorUpdate', editor)
  charactersCount(editor)
}

const showSidebar = ref(true)
</script>

<style></style>
