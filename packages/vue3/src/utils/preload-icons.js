import { addCollection } from "@iconify/vue";

const icons = {
  "add-column-after": {
    body: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 4h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1m9 8h4m-2-2v4"/>',
    width: 24,
    height: 24,
  },
  "add-column-before": {
    body: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 4h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1m-9 8h4m-2-2v4"/>',
    width: 24,
    height: 24,
  },
  "add-row-after": {
    body: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 6v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1m-8 9v4m2-2h-4"/>',
    width: 24,
    height: 24,
  },
  "add-row-before": {
    body: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 18v-4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1m8-9V5m-2 2h4"/>',
    width: 24,
    height: 24,
  },
  "align-center": {
    body: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 12H7m12 6H5M21 6H3"/>',
    width: 24,
    height: 24,
  },
  "align-justify": {
    body: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12h18M3 18h18M3 6h18"/>',
    width: 24,
    height: 24,
  },
  "align-left": {
    body: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12H3m14 6H3M21 6H3"/>',
    width: 24,
    height: 24,
  },
  "align-right": {
    body: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12H9m12 6H7M21 6H3"/>',
    width: 24,
    height: 24,
  },
  background: {
    body: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 11l-8-8l-8.6 8.6a2 2 0 0 0 0 2.8l5.2 5.2c.8.8 2 .8 2.8 0zM5 2l5 5m-8 6h15m5 7a2 2 0 1 1-4 0c0-1.6 1.7-2.4 2-4c.3 1.6 2 2.4 2 4"/></svg>',
    width: 24,
    height: 24,
  },
  blockquote: {
    body: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 6H3m18 6H8m13 6H8m-5-6v6"/></svg>',
    width: 24,
    height: 24,
  },
  bold: {
    body: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8"/></svg>',
    width: 24,
    height: 24,
  },
  "bullet-list": {
    body: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12h.01M3 18h.01M3 6h.01M8 12h13M8 18h13M8 6h13"/></svg>',
    width: 24,
    height: 24,
  },
  check: {
    body: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 6L9 17l-5-5"/></svg>',
    width: 24,
    height: 24,
  },
  "code-block": {
    body: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m18 16l4-4l-4-4M6 8l-4 4l4 4m8.5-12l-5 16"/></svg>',
    width: 24,
    height: 24,
  },
  code: {
    body: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m16 18l6-6l-6-6M8 6l-6 6l6 6"/></svg>',
    width: 24,
    height: 24,
  },
  color: {
    body: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 20h16M6 16l6-12l6 12M8 12h8"/>',
    width: 24,
    height: 24,
  },
  copy: {
    body: '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></g>',
    width: 24,
    height: 24,
  },
  "delete-column": {
    body: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 4h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1m10 6l4 4m-4 0l4-4"/>',
    width: 24,
    height: 24,
  },
  "delete-row": {
    body: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 6v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1M10 16l4 4m-4 0l4-4"/>',
    width: 24,
    height: 24,
  },
  "delete-table": {
    body: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12.5 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10M3 10h18M10 3v18m6-2h6"/>',
    width: 24,
    height: 24,
  },
  divider: {
    body: '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="6" r="1"/><path d="M5 12h14"/><circle cx="12" cy="18" r="1"/></g>',
    width: 24,
    height: 24,
  },
  down: {
    body: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m6 9l6 6l6-6"/>',
    width: 24,
    height: 24,
  },
  edit: {
    body: '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/></g>',
    width: 24,
    height: 24,
  },
  "hard-break": {
    body: '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M3 6h18M3 12h15a3 3 0 1 1 0 6h-4"/><path d="m16 16l-2 2l2 2M3 18h7"/></g>',
    width: 24,
    height: 24,
  },
  "header-col": {
    body: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zm7 5h11M10 3v18M9 3L3 9m7-2l-7 7m7-2l-7 7m7-2l-4 4"/>',
    width: 24,
    height: 24,
  },
  "header-row": {
    body: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zm6-2L3 9m11-6l-7 7m12-7l-7 7m9-4l-4 4M3 10h18m-11 0v11"/>',
    width: 24,
    height: 24,
  },
  heading1: {
    body: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12h8m-8 6V6m8 12V6m5 6l3-2v8"/>',
    width: 24,
    height: 24,
  },
  heading2: {
    body: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12h8m-8 6V6m8 12V6m9 12h-4c0-4 4-3 4-6c0-1.5-2-2.5-4-1"/>',
    width: 24,
    height: 24,
  },
  heading3: {
    body: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12h8m-8 6V6m8 12V6m5.5 4.5c1.7-1 3.5 0 3.5 1.5a2 2 0 0 1-2 2m-2 3.5c2 1.5 4 .3 4-1.5a2 2 0 0 0-2-2"/>',
    width: 24,
    height: 24,
  },
  heading4: {
    body: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18V6m5 4v3a1 1 0 0 0 1 1h3m0-4v8M4 12h8m-8 6V6"/>',
    width: 24,
    height: 24,
  },
  heading5: {
    body: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12h8m-8 6V6m8 12V6m5 7v-3h4m-4 7.7c.4.2.8.3 1.3.3c1.5 0 2.7-1.1 2.7-2.5S19.8 13 18.3 13H17"/>',
    width: 24,
    height: 24,
  },
  heading6: {
    body: '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M4 12h8m-8 6V6m8 12V6"/><circle cx="19" cy="16" r="2"/><path d="M20 10c-2 2-3 3.5-3 6"/></g>',
    width: 24,
    height: 24,
  },
  heading: {
    body: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 12h12M6 20V4m12 16V4"/>',
    width: 24,
    height: 24,
  },
  indent: {
    body: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12H11m10 6H11M21 6H11M7 8l-4 4l4 4"/>',
    width: 24,
    height: 24,
  },
  italic: {
    body: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 4h-9m4 16H5M15 4L9 20"/>',
    width: 24,
    height: 24,
  },
  link: {
    body: '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></g>',
    width: 24,
    height: 24,
  },
  "merge-cells": {
    body: '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M12 21v-6m0-6V3M3 15h18M3 9h18"/><rect width="18" height="18" x="3" y="3" rx="2"/></g>',
    width: 24,
    height: 24,
  },
  "open-right": {
    body: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6m10 0l-9 9m3-9h6v6"/>',
    width: 24,
    height: 24,
  },
  "ordered-list": {
    body: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 12h11m-11 6h11M10 6h11M4 10h2M4 6h1v4m1 8H4c0-1 2-2 2-3s-1-1.5-2-1"/>',
    width: 24,
    height: 24,
  },
  outdent: {
    body: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12H11m10 6H11M21 6H11M3 8l4 4l-4 4"/>',
    width: 24,
    height: 24,
  },
  paragraph: {
    body: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 4v16m4-16v16m2-16H9.5a4.5 4.5 0 0 0 0 9H13"/>',
    width: 24,
    height: 24,
  },
  redo: {
    body: '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M21 7v6h-6"/><path d="M3 17a9 9 0 0 1 9-9a9 9 0 0 1 6 2.3l3 2.7"/></g>',
    width: 24,
    height: 24,
  },
  "split-cell": {
    body: '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M12 15V9m-9 6h18M3 9h18"/><rect width="18" height="18" x="3" y="3" rx="2"/></g>',
    width: 24,
    height: 24,
  },
  strike: {
    body: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 4H9a3 3 0 0 0-2.83 4M14 12a4 4 0 0 1 0 8H6m-2-8h16"/>',
    width: 24,
    height: 24,
  },
  subscript: {
    body: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m4 5l8 8m0-8l-8 8m16 6h-4c0-1.5.44-2 1.5-2.5S20 15.33 20 14c0-.47-.17-.93-.48-1.29a2.11 2.11 0 0 0-2.62-.44c-.42.24-.74.62-.9 1.07"/>',
    width: 24,
    height: 24,
  },
  superscript: {
    body: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m4 19l8-8m0 8l-8-8m16 1h-4c0-1.5.442-2 1.5-2.5S20 8.334 20 7.002c0-.472-.17-.93-.484-1.29a2.105 2.105 0 0 0-2.617-.436c-.42.239-.738.614-.899 1.06"/>',
    width: 24,
    height: 24,
  },
  table: {
    body: '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M12 3v18"/><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18M3 15h18"/></g>',
    width: 24,
    height: 24,
  },
  "task-list": {
    body: '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><rect width="6" height="6" x="3" y="5" rx="1"/><path d="m3 17l2 2l4-4m4-9h8m-8 6h8m-8 6h8"/></g>',
    width: 24,
    height: 24,
  },
  "text-clear": {
    body: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 21l-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21m9 0H7M5 11l9 9"/>',
    width: 24,
    height: 24,
  },
  underline: {
    body: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 4v6a6 6 0 0 0 12 0V4M4 20h16"/>',
    width: 24,
    height: 24,
  },
  undo: {
    body: '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9a9 9 0 0 0-6 2.3L3 13"/></g>',
    width: 24,
    height: 24,
  },
  unlink: {
    body: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m18.84 12.25l1.72-1.71h-.02a5.004 5.004 0 0 0-.12-7.07a5.006 5.006 0 0 0-6.95 0l-1.72 1.71m-6.58 6.57l-1.71 1.71a5.004 5.004 0 0 0 .12 7.07a5.006 5.006 0 0 0 6.95 0l1.71-1.71M8 2v3M2 8h3m11 11v3m3-6h3"/>',
    width: 24,
    height: 24,
  },
};

// 注册图标集合
addCollection({
  prefix: "isle-editor",
  icons,
});
