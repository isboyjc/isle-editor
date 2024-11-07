import { Bold, Italic, Strikethrough as Strike, Subscript, Superscript, Underline, Code } from 'lucide-vue-next';

const ICONS = {
  Bold,
  Italic, 
  Strike, 
  Subscript, 
  Superscript, 
  Underline,
  Code
};

export const getIcon = (name) => {
  if (!name) {
    console.warn('Icon name is required');
    return null;
  }
  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
  if (!(capitalizedName in ICONS)) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }
  return ICONS[capitalizedName];
}

export const addIcon = (name, icon) => {
  if (!name) {
    console.warn('Icon name is required');
    return null;
  }
  if (!icon) {
    console.warn('Icon component is required');
    return null;
  }
  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
  ICONS[capitalizedName] = icon;
}
