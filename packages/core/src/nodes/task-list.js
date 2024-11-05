/*
 * @LastEditTime: 2024-11-01 19:07:46
 * @Description: 任务列表
 * @Date: 2024-04-01 21:37:05
 * @Author: isboyjc
 * @LastEditors: isboyjc
 */
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import { prefixClass } from '../utils/prefix.js'

const source = {
  title: 'tasklist',
  icon: 'ListTodo',
  desc: '[ ] [x]',
  command: ({ editor, range }) => {
    range
      ? editor.chain().focus().deleteRange(range).toggleTaskList().run()
      : editor.commands.toggleTaskList()
  },
  isActive: ({ editor }) => editor.isActive('taskList'),
  shortcutkeys: {
    mac: ['⌘', 'Shift', '9'],
    win: ['Ctrl', 'Shift', '9']
  },
  HTMLAttributes: {
    class: `${prefixClass}__task-list`
  }
}

export default TaskList.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      ...source
    }
  },
  addExtensions() {
    return [
      TaskItem.configure({
        nested: true
      })
    ]
  }
})
