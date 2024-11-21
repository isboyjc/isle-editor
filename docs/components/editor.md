# Editor Component

The Editor component is the main component of Isle Editor. It provides a rich text editing interface with various features and customization options.

## Basic Usage

```vue
<template>
  <isle-editor v-model="content" />
</template>

<script setup>
import { ref } from "vue";

const content = ref("");
</script>
```

## Props

### v-model

- Type: `String`
- Default: `''`

The content of the editor. You can use v-model for two-way binding.

### placeholder

- Type: `String`
- Default: `''`

Placeholder text shown when the editor is empty.

### readonly

- Type: `Boolean`
- Default: `false`

When set to true, the editor becomes read-only.

### theme

- Type: `'light' | 'dark'`
- Default: `'light'`

The theme of the editor.

### extensions

- Type: `Array`
- Default: `[]`

Array of extensions to be used in the editor.

```js
const extensions = [
  StarterKit,
  Placeholder.configure({
    placeholder: "Write something...",
  }),
];
```

## Events

### update:content

Emitted when the content changes.

```vue
<template>
  <isle-editor v-model="content" @update:content="handleUpdate" />
</template>

<script setup>
const handleUpdate = (newContent) => {
  console.log("Content updated:", newContent);
};
</script>
```

### focus

Emitted when the editor receives focus.

### blur

Emitted when the editor loses focus.

## Methods

### focus()

Focus the editor.

```js
const editor = ref(null);

// Focus the editor
editor.value?.focus();
```

### blur()

Remove focus from the editor.

### setContent(content: string)

Set the editor content programmatically.

```js
editor.value?.setContent("New content");
```

## Slots

### toolbar

Custom toolbar content.

```vue
<template>
  <isle-editor v-model="content">
    <template #toolbar="{ commands }">
      <button @click="commands.bold">Bold</button>
      <button @click="commands.italic">Italic</button>
    </template>
  </isle-editor>
</template>
```

### bubble-menu

Custom bubble menu content that appears when text is selected.

```vue
<template>
  <isle-editor v-model="content">
    <template #bubble-menu="{ commands }">
      <button @click="commands.bold">B</button>
      <button @click="commands.italic">I</button>
    </template>
  </isle-editor>
</template>
```

## Examples

### Basic Editor

```vue
<template>
  <isle-editor
    v-model="content"
    placeholder="Start writing..."
    @update:content="handleUpdate"
  />
</template>

<script setup>
import { ref } from "vue";

const content = ref("");
const handleUpdate = (newContent) => {
  console.log("Content updated:", newContent);
};
</script>
```

### Custom Toolbar

```vue
<template>
  <isle-editor v-model="content" :toolbar="customToolbar" />
</template>

<script setup>
import { ref } from "vue";

const content = ref("");
const customToolbar = [
  "bold",
  "italic",
  "strike",
  "|",
  "bulletList",
  "orderedList",
];
</script>
```

### With Extensions

```vue
<template>
  <isle-editor v-model="content" :extensions="extensions" />
</template>

<script setup>
import { ref } from "vue";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

const content = ref("");
const extensions = [
  StarterKit,
  Placeholder.configure({
    placeholder: "Write something amazing...",
  }),
];
</script>
```
