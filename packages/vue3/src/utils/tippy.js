import tippy from "tippy.js";

export function createTippy(element, tippyOptions = {}) {
  return tippy(element, {
    duration: 0,
    getReferenceClientRect: null,
    interactive: true,
    trigger: "manual",
    placement: "top",
    hideOnClick: "toggle",
    appendTo: document.body,
    ...tippyOptions,
  });
}
