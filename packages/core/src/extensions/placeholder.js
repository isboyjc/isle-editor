import Placeholder from "@tiptap/extension-placeholder";
import { prefixClass } from "@/utils/prefix";

export default Placeholder.extend({
  addOptions() {
    return {
      emptyEditorClass: `${prefixClass}-empty`,
      emptyNodeClass: `${prefixClass}-node-empty`,
      placeholder: "",
      showOnlyCurrent: true,
      showOnlyWhenEditable: true,
    };
  },
});
