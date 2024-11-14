import { 
  Bold, 
  Italic, 
  Strikethrough as Strike, 
  Subscript, 
  Superscript, 
  Underline, 
  Code, 
  Link, 
  Unlink, 
  Copy, 
  Check, 
  SquareArrowOutUpRight as OpenRight, 
  SquarePen as Edit,
  Baseline as Color,
  PaintBucket as Background,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Eraser as TextClear
} from 'lucide-vue-next';
const ICONS = {
  Bold,
  Italic, 
  Strike, 
  Subscript, 
  Superscript, 
  Underline,
  Code,
  Link,
  Unlink, 
  Copy, 
  Check,
  OpenRight,
  Edit,
  Color,
  Background,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  TextClear
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
