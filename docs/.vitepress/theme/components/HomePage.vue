<template>
  <div class="w-full pt-30">
    <section class="w-full">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <h1
            v-motion
            :initial="{ opacity: 0, y: 100 }"
            :enter="{ opacity: 1, y: 0, scale: 1 }"
            :delay="50"
            :duration="400"
            class="text-32px! font-bold text-primary"
            uno-sm="text-38px! leading-10!"
            uno-md="text-48px! leading-12!"
            uno-xl="text-56px! leading-16!"
          >
            {{ t(lang, "title") }}
          </h1>
          <h1
            v-motion
            :initial="{ opacity: 0, y: 100 }"
            :enter="{ opacity: 1, y: 0, scale: 1 }"
            :delay="100"
            :duration="400"
            class="text-32px! font-bold mt-2"
            uno-sm="text-38px! leading-10!"
            uno-md="text-48px! leading-12!"
            uno-xl="text-56px! leading-16!"
          >
            {{ t(lang, "desc") }}
          </h1>
          <div
            v-motion
            :initial="{ opacity: 0, y: 100 }"
            :enter="{ opacity: 1, y: 0, scale: 1 }"
            :delay="150"
            :duration="400"
            class="text-[var(--vp-c-text-2)] lg:text-xl max-w-2xl mt-4 mx-auto text-base"
          >
            {{ t(lang, "desc.secondary") }}
          </div>
          <div class="flex justify-start gap-3 mt-10 mb-5 flex-col sm:flex-row">
            <a
              v-motion
              :initial="{ opacity: 0, y: 100 }"
              :enter="{ opacity: 1, y: 0, scale: 1 }"
              :delay="200"
              :duration="400"
              target="_blank"
              class="items-center justify-center h-12 font-medium rounded-xl inline-flex duration-200 lg:w-auto px-6 py-3 text-center text-[var(--vp-c-text-1)]! w-full border-2 border-solid border-[var(--vp-c-gray-soft)] no-underline!"
              uno-hover="text-primary! border-primary"
              href="https://playground.islenote.com/"
            >
              {{ t(lang, "playground") }}
            </a>
            <a
              v-motion
              :initial="{ opacity: 0, y: 100 }"
              :enter="{ opacity: 1, y: 0, scale: 1 }"
              :delay="300"
              :duration="400"
              class="items-center justify-center h-12 font-medium rounded-xl inline-flex bg-primary border-solid border-2 border-primary duration-200 lg:w-auto px-6 py-3 text-center text-[var(--vp-c-neutral-inverse)]! w-full no-underline!"
              uno-hover="bg-transparent border-primary text-primary!"
              :href="routerPath(lang, '/guide/introduction')"
            >
              {{ t(lang, "guide") }} →
            </a>
          </div>
          <a
            v-motion
            :initial="{ opacity: 0, y: 100 }"
            :enter="{ opacity: 1, y: 0, scale: 1 }"
            :delay="400"
            :duration="400"
            href="https://github.com/isboyjc/isle-editor"
            target="_blank"
            class="h-34px font-semibold text-primary rounded-full px-1 text-sm leading-6 flex-left duration-200 no-underline!"
            uno-hover="underline!"
          >
            <span class="block lg:inline"
              >{{ t(lang, "github", { star: stars }) }}
              <span aria-hidden="true">→</span>
            </span>
          </a>
        </div>
        <div
          class="flex items-center justify-center md:justify-end"
          ref="target"
        >
          <div
            class="relative w-350px h-350px"
            uno-lg="w-450px h-450px"
            v-motion
            :initial="{ opacity: 0, scale: 0.8 }"
            :enter="{ opacity: 1, scale: 1 }"
          >
            <div
              class="absolute top-0 left-0 w-full h-full rounded-30% border-solid border-30 border-[var(--vp-c-brand-1)] opacity-10"
              uno-lg="border-35"
              :style="{
                transform: `translateX(${parallax.tilt * -30}px) translateY(${parallax.roll * -30}px) scale(1)`,
              }"
            ></div>
            <div
              class="w-full h-full rounded-30% flex-center border-solid border-30 border-[var(--vp-c-brand-1)]"
              uno-lg="border-35"
              :style="{
                transform: `translateX(${parallax.tilt * 20}px) translateY(${parallax.roll * 20}px) scale(1)`,
              }"
            >
              <icon-custom-islenote
                :style="{
                  transform: `translateX(${parallax.tilt * 40}px) translateY(${parallax.roll * 40}px) scale(1)`,
                }"
                class="text-60 text-primary"
                uno-lg="text-70"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="w-full mt-40">
      <div class="w-full min-h-250px grid grid-cols-12 gap-5">
        <div class="col-span-12" uno-md="col-span-4">
          <BaseEditor :locale="locale" :theme="isDark ? 'dark' : 'light'" />
        </div>
        <div class="col-span-12" uno-md="col-span-8">
          <RichTextEditor :locale="locale" :theme="isDark ? 'dark' : 'light'" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useData } from "vitepress";
import { useParallax } from "@vueuse/core";
import { ref, reactive, watch, onMounted, computed } from "vue";
import { t, routerPath } from "../locale";

const { lang, isDark } = useData();
const locale = computed(() => {
  if (!lang.value) return "en";
  return lang.value.split("-")[0];
});

const stars = ref(0);
const getGithubStars = async () => {
  try {
    const response = await fetch(
      "https://api.github.com/repos/isboyjc/isle-editor",
    );
    const data = await response.json();
    stars.value = data.stargazers_count;
  } catch (error) {
    console.error("Failed to fetch GitHub stars:", error);
  }
};

onMounted(() => {
  getGithubStars();
});

const target = ref(null);
const parallax = reactive(useParallax(target));
</script>
