# Getting Started

## Installation

Install Isle Editor using your preferred package manager:

Using npm:

```bash
npm install @isle-editor/vue3
```

Using pnpm:

```bash
pnpm add @isle-editor/vue3
```

Using yarn:

```bash
yarn add @isle-editor/vue3
```

## Basic Usage

1. Import and register the editor component:

```js
import { createApp } from "vue";
import { IsleEditor } from "@isle-editor/vue3";
import "@isle-editor/vue3/dist/style.css";
import App from "./App.vue";

const app = createApp(App);
app.use(IsleEditor);
app.mount("#app");
```

2. Use the editor in your component:

````vue
<template>
  <isle-editor v-model="content" />
</template>

<script setup>
import { ref } from "vue";

const content = ref("");
</script>

## Configuration You can customize the editor by passing props: ```vue
<template>
  <isle-editor
    v-model="content"
    :placeholder="'Start writing...'"
    :toolbar="['bold', 'italic', 'strike']"
    @update:content="handleUpdate"
  />
</template>

<script setup>
import { ref } from "vue";

const content = ref("");
const placeholder = ref("Please input content...");
const readonly = ref(false);
const theme = ref("light");
</script>

### Toolbar Configuration You can customize the toolbar by passing the `toolbar`
prop: ```vue
<template>
  <isle-editor v-model="content" :toolbar="toolbar" />
</template>

<script setup>
import { ref } from "vue";

const content = ref("");
const toolbar = ref([
  "bold",
  "italic",
  "underline",
  "strike",
  "|",
  "heading",
  "bullet_list",
  "ordered_list",
  "|",
  "code",
  "blockquote",
  "|",
  "undo",
  "redo",
]);
</script>

## Event Handling The editor provides several events that you can listen to:
```vue
<template>
  <isle-editor
    v-model="content"
    @update:model-value="onChange"
    @focus="onFocus"
    @blur="onBlur"
  />
</template>

<script setup>
import { ref } from "vue";

const content = ref("");

const onChange = (value) => {
  console.log("Content updated:", value);
};

const onFocus = () => {
  console.log("Editor focused");
};

const onBlur = () => {
  console.log("Editor blurred");
};
</script>

## Available Props | Prop | Type | Default | Description |
|------|------|---------|-------------| | `v-model` | `String` | `''` | Editor
content | | `placeholder` | `String` | `''` | Placeholder text | | `toolbar` |
`Array` | `[]` | Toolbar items to display | | `readonly` | `Boolean` | `false` |
Make editor readonly | | `theme` | `String` | `'light'` | Editor theme | ##
Events | Event | Parameters | Description | |-------|------------|-------------|
| `update:content` | `(content: string)` | Triggered when content changes | |
`focus` | `(event: FocusEvent)` | Editor receives focus | | `blur` | `(event:
FocusEvent)` | Editor loses focus | ## Next Steps - [Editor
Component](/components/editor.md) - Learn about editor component configuration -
[Toolbar Component](/components/toolbar.md) - Learn about toolbar component
usage
````
