import { defineComponent, h, computed } from "vue";
import { prefixClass } from "@isle-editor/core";
import {
  getPickerColorsFlat,
  getPickerStandardColors,
  getRecentColors,
  addRecentColor,
} from "@/utils";

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
    recentUseName: {
      type: String,
      default: "Recent Use",
    },
    storageKey: {
      type: String,
      default: "ICOLORPICKER-RECENTCOLORS",
    },
  },
  emits: ["change"],

  setup(props, { emit }) {
    const recentColors = getRecentColors(props.storageKey);
    const isShowRecentColor = computed(() => recentColors.value.length);

    function recentColorsRender() {
      return isShowRecentColor.value
        ? [
            h(
              "div",
              {
                class: `${prefixClass}-color-picker__title`,
              },
              props.recentUseName,
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

    const handleColorSelect = (color) => {
      if (color) {
        addRecentColor(color, props.storageKey);
      }
      emit("change", color);
    };

    const allColors = getPickerColorsFlat();

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
            getPickerStandardColors().map((color) => {
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
