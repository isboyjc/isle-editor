import { defineComponent, h, ref, onMounted } from "vue";
import { prefixClass } from "@isle-editor/core";
import { getAllColors, standardColors } from "@/utils";

export default defineComponent({
  name: "IColorPicker",
  props: {
    defaultColorName: {
      type: String,
      default: "Default Color",
    },
    baseColorName: {
      type: String,
      default: "Base Color",
    },
    standardColorName: {
      type: String,
      default: "Standard Color",
    },
    recentColorName: {
      type: String,
      default: "Recent Use",
    },
    storageKey: {
      type: String,
      default: "ICOLORPICKER-RECENTCOLORS",
    },
  },
  emits: ["select"],

  setup(props, { emit }) {
    const recentColors = ref([]);
    const isShowRecentColor = computed(() => recentColors.value.length);

    function recentColorsRender() {
      return isShowRecentColor.value
        ? [
            h(
              "div",
              {
                class: `${prefixClass}-color-picker__title`,
              },
              props.recentColorName,
            ),
            h(
              "div",
              {
                class: `${prefixClass}-color-picker__recent`,
              },
              recentColors.value.map((color) => {
                return h("div", {
                  class: [`${prefixClass}-color-picker__recent-item`],
                  style: { backgroundColor: color },
                  onClick: () => handleColorSelect(color),
                });
              }),
            ),
          ]
        : [];
    }

    onMounted(() => {
      const stored = localStorage.getItem(props.storageKey);
      if (stored && Array.isArray(JSON.parse(stored))) {
        recentColors.value = JSON.parse(stored).slice(0, 9);
      } else {
        recentColors.value = [];
      }
    });

    const handleColorSelect = (color) => {
      if (color) {
        const colorIndex = recentColors.value.indexOf(color);
        if (colorIndex > -1) {
          recentColors.value.splice(colorIndex, 1);
        }

        recentColors.value.unshift(color);

        if (recentColors.value.length > 9) {
          recentColors.value = recentColors.value.slice(0, 9);
        }

        localStorage.setItem(
          props.storageKey,
          JSON.stringify(recentColors.value),
        );
      }
      emit("select", color);
    };

    const allColors = getAllColors();

    return () =>
      h(
        "div",
        {
          class: `${prefixClass}-color-picker`,
        },
        [
          h(
            "div",
            {
              class: `${prefixClass}-color-picker__default`,
              onClick: () => handleColorSelect(""),
            },
            props.defaultColorName,
          ),
          h(
            "div",
            {
              class: `${prefixClass}-color-picker__base`,
            },
            allColors.map((color) =>
              h("div", {
                class: [`${prefixClass}-color-picker__base-item`],
                style: { backgroundColor: color },
                onClick: () => handleColorSelect(color),
              }),
            ),
          ),
          h(
            "div",
            {
              class: `${prefixClass}-color-picker__title`,
            },
            props.standardColorName,
          ),
          h(
            "div",
            {
              class: `${prefixClass}-color-picker__standard`,
            },
            standardColors.map((color) => {
              return h("div", {
                class: [`${prefixClass}-color-picker__standard-item`],
                style: { backgroundColor: color },
                onClick: () => handleColorSelect(color),
              });
            }),
          ),
          ...recentColorsRender(),
        ],
      );
  },
});
