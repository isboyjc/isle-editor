import { presetAttributify, presetUno, defineConfig } from "unocss";
import transformerDirectives from "@unocss/transformer-directives";
import transformerVariantGroup from "@unocss/transformer-variant-group";

export default defineConfig({
  shortcuts: {
    "flex-center": "flex justify-center items-center",
    "flex-justify-center": "flex justify-center",
    "flex-items-center": "flex items-center",
  },
  presets: [
    presetUno(),
    presetAttributify({
      prefix: "uno-",
      prefixedOnly: true,
    }),
  ],
  theme: {
    colors: {
      primary: "var(--vp-c-indigo-1)",
    },
    fontFamily: {
      mono: "var(--vt-font-family-mono)",
    },
  },
  transformers: [transformerDirectives(), transformerVariantGroup()],
});
