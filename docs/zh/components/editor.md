# 编辑器组件

Isle Editor 的核心组件，提供了丰富的编辑功能和灵活的配置选项。

## 基本用法

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

| 属性名      | 类型              | 默认值          | 说明                                |
| ----------- | ----------------- | --------------- | ----------------------------------- |
| modelValue  | string            | ''              | 编辑器的内容，支持 v-model 双向绑定 |
| placeholder | string            | '请输入内容...' | 占位文本                            |
| readonly    | boolean           | false           | 是否只读                            |
| theme       | 'light' \| 'dark' | 'light'         | 主题模式                            |
| toolbar     | array             | [...]           | 工具栏配置，详见工具栏组件文档      |
| menubar     | array             | [...]           | 菜单栏配置，详见菜单栏组件文档      |
| height      | string \| number  | 'auto'          | 编辑器高度                          |
| minHeight   | string \| number  | '150px'         | 编辑器最小高度                      |
| maxHeight   | string \| number  | 'auto'          | 编辑器最大高度                      |
| autofocus   | boolean           | false           | 是否自动获取焦点                    |

## 事件

| 事件名            | 参数            | 说明                   |
| ----------------- | --------------- | ---------------------- |
| update:modelValue | (value: string) | 内容更新时触发         |
| focus             | -               | 获取焦点时触发         |
| blur              | -               | 失去焦点时触发         |
| change            | (value: string) | 内容变化时触发         |
| ready             | -               | 编辑器初始化完成时触发 |

## 方法

通过 ref 可以调用编辑器实例的方法：

```vue
<template>
  <isle-editor ref="editorRef" v-model="content" />
  <button @click="handleClear">清空内容</button>
</template>

<script setup>
import { ref } from "vue";

const editorRef = ref(null);
const content = ref("");

const handleClear = () => {
  editorRef.value?.clear();
};
</script>
```

| 方法名  | 参数 | 返回值 | 说明                 |
| ------- | ---- | ------ | -------------------- |
| focus   | -    | void   | 使编辑器获取焦点     |
| blur    | -    | void   | 使编辑器失去焦点     |
| clear   | -    | void   | 清空编辑器内容       |
| undo    | -    | void   | 撤销操作             |
| redo    | -    | void   | 重做操作             |
| getHTML | -    | string | 获取 HTML 格式的内容 |
| getText | -    | string | 获取纯文本格式的内容 |

## 插槽

| 插槽名  | 说明                   |
| ------- | ---------------------- |
| toolbar | 自定义工具栏           |
| menubar | 自定义菜单栏           |
| before  | 编辑器内容区域前的内容 |
| after   | 编辑器内容区域后的内容 |

## 示例

### 自定义工具栏

```vue
<template>
  <isle-editor v-model="content">
    <template #toolbar="{ commands }">
      <div class="custom-toolbar">
        <button @click="commands.bold">加粗</button>
        <button @click="commands.italic">斜体</button>
      </div>
    </template>
  </isle-editor>
</template>

<script setup>
import { ref } from "vue";

const content = ref("");
</script>
```

### 自定义主题

```vue
<template>
  <isle-editor v-model="content" :theme="theme" class="custom-editor" />
</template>

<script setup>
import { ref } from "vue";

const content = ref("");
const theme = ref("dark");
</script>

<style>
.custom-editor {
  /* 自定义样式 */
}
</style>
```

## 最佳实践

1. 设置合适的高度：

```vue
<isle-editor v-model="content" :min-height="200" :max-height="500" />
```

2. 处理内容变化：

```vue
<isle-editor
  v-model="content"
  @change="handleChange"
  @update:model-value="handleUpdate"
/>
```

3. 设置自动保存：

```vue
<template>
  <isle-editor v-model="content" @change="handleAutoSave" />
</template>

<script setup>
import { ref } from "vue";
import { debounce } from "lodash-es";

const content = ref("");

const handleAutoSave = debounce((value) => {
  // 执行保存操作
  console.log("自动保存:", value);
}, 1000);
</script>
```

## 注意事项

1. 内容安全：

   - 对输入内容进行过滤和验证
   - 使用 `v-html` 显示内容时注意 XSS 风险

2. 性能优化：

   - 避免频繁更新大量内容
   - 使用防抖处理自动保存
   - 合理设置编辑器高度，避免页面抖动

3. 兼容性：
   - 测试不同浏览器的兼容性
   - 确保移动端的使用体验
