# Vue3 中使用 isle-editor

## 安装

```bash
npm install @isle-editor/core @isle-editor/vue3

# or

yarn add @isle-editor/core @isle-editor/vue3

# or

pnpm add @isle-editor/core @isle-editor/vue3
```

## 基础使用

### 引入样式

使用 `isle-editor` 之前，请您引入样式

```js
import "@isle-editor/vue3/dist/style.css";
```

### 使用组件

```vue
<template>
  <div style="width: 1000px">
    <IsleEditor v-model="content" :extensions="extensions"></IsleEditor>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { IsleEditor, BasicKit } from "@isle-editor/vue3";

const content = ref("");
const extensions = [
  BasicKit.configure({
    placeholder: {
      placeholder: "写点什么...",
    },
  }),
];
</script>
```

我们建议您使用集成套件，`isle-editor` 提供了三种套件

- **BasicKit**：基础套件，需按需逐个安装扩展
- **RichTextKit**：富文本套件
- **NotionKit**：`Notion` 风格套件

如果您想要一个相对空白的基础编辑器，您可以使用 `BasicKit` 套件，`BasicKit` 套件帮助您安装了一些基础的、不涉及操作的扩展，如（`document`、`text`、`paragraph`、`history`、`placeholder` 等扩展），使用该套件后，您需要根据自己的需求从 `@isle-editor/core` 中引入其他扩展。

如果您需要一个完善的富文本编辑器，请直接使用 `RichTextKit` 套件。

如果您需要一个 `Notion` 风格的编辑器，请直接使用 `NotionKit` 套件。

当然，您也可以不使用任何套件，从 `0-1` 的去集成扩展，然后配置扩展的行为，这样您可以完全控制编辑器的行为，但是这样会使您的编辑器变得很复杂，不建议这么做。

使用套件是为了简化使用，不是为了限制您的扩展行为，我们只是将 `@isle-editor/core` 中所有符合主题的扩展集成到了套件中，并为其提供了符合套件主题的默认行为，如果您需要限制或修改套件中扩展的默认行为，您依然可以在套件配置中定义。

如果您想了解套件的详细使用，请查看套件文档(更新中...)
