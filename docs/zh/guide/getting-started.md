# 快速开始

## 安装

使用 npm:

```bash
npm install @isle-editor/vue3
```

使用 pnpm:

```bash
pnpm add @isle-editor/vue3
```

使用 yarn:

```bash
yarn add @isle-editor/vue3
```

## 基本使用

### 在 Vue 3 项目中使用

1. 在入口文件中注册组件：

```js
import { createApp } from "vue";
import { IsleEditor } from "@isle-editor/vue3";
import "@isle-editor/vue3/dist/style.css";
import App from "./App.vue";

const app = createApp(App);
app.use(IsleEditor);
app.mount("#app");
```

2. 在组件中使用：

```vue
<template>
  <isle-editor v-model="content" />
</template>

<script setup>
import { ref } from "vue";

const content = ref("");
</script>
```

## 配置选项

### 基本配置

```vue
<template>
  <isle-editor
    v-model="content"
    :placeholder="placeholder"
    :readonly="readonly"
    :theme="theme"
  />
</template>

<script setup>
import { ref } from "vue";

const content = ref("");
const placeholder = ref("请输入内容...");
const readonly = ref(false);
const theme = ref("light");
</script>
```

### 工具栏配置

```vue
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
```

## 事件处理

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
  console.log("内容更新:", value);
};

const onFocus = () => {
  console.log("编辑器获得焦点");
};

const onBlur = () => {
  console.log("编辑器失去焦点");
};
</script>
```

## 下一步

- [编辑器组件](/zh/components/editor.md) - 了解编辑器组件的详细配置
- [工具栏组件](/zh/components/toolbar.md) - 了解工具栏组件的使用
- [菜单栏组件](/zh/components/menu-bar.md) - 了解菜单栏组件的使用
