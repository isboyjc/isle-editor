import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import { prefixClass } from "@/utils/prefix.js";

const source = {
  slash: true,
  name: "taskList",
  desc: "[ ] [x]",
  command: ({ editor, range }) => {
    range
      ? editor.chain().focus().deleteRange(range).toggleTaskList().run()
      : editor.commands.toggleTaskList();
  },
  isActive: ({ editor }) => editor.isActive("taskList"),
  shortcutkeys: "Mod-Shift-9",
  HTMLAttributes: {
    class: `${prefixClass}__task-list`,
  },
};

export default TaskList.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      ...source,
    };
  },
  addExtensions() {
    return [
      TaskItem.configure({
        nested: true,
      }),
    ];
  },
});
