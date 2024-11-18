import { isMacOS } from './is'

export function convertShortcutKeys(str){
  const isMac = isMacOS()
  
  return str.toUpperCase()
    .replace(/MOD/g, isMac ? '⌘' : 'Ctrl')
    .replace(/SHIFT/g, '⇧')
    .replace(/ALT|OPTION/g, '⌥')
    .replace(/ENTER/g, '↵')
    .replace(/BACKSPACE/g, '⌫');
}