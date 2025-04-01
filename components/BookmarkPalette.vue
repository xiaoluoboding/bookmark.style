<template>
  <nav
    class="grid place-items-start space-x-20 z-10 w-full"
    sm="px-8"
    lg="relative w-[360px] px-0"
    text="slate-800 xl dark:slate-50"
  >
    <div
      class="flex flex-col w-full glass bg-gradient-to-br from-slate-100 via-gray-100 to-stone-100 space-y-4 py-2 px-4 lg:py-4 rounded-xl inset-0"
      dark="from-slate-800 via-sky-900 to-slate-800"
      border="~ light-100 !opacity-10 dark:light-50"
    >
      <fieldset class="grid grid-cols-1 gap-y-4">
        <figure>
          <figcaption class="flex items-center text-base">URL</figcaption>
          <div class="relative w-full">
            <div
              class=""
              lg="relative flex justify-center w-full mx-auto rounded-lg shadow-sm"
            >
              <div
                class="absolute inset-y-0 left-0 px-3 flex items-center pointer-events-none"
              >
                <span class="text-gray-500 sm:text-sm">
                  <carbon:search class="w-4 h-4 lg:w-5 lg:h-5" />
                </span>
              </div>
              <input
                type="text"
                id="name"
                name="name"
                class="w-full rounded border text-sm outline-none px-10 py-1 leading-8 transition-colors duration-200 ease-in-out bg-slate-100 bg-opacity-50 border-slate-300 text-slate-700 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-200"
                lg="py-2 rounded-lg"
                dark="bg-slate-700 bg-opacity-40 border-slate-600 text-slate-100 focus:border-sky-500 focus:bg-sky-900 focus:ring-2 focus:ring-sky-900"
                placeholder="Paste or type a web site URL"
                v-model="state.localBookmarkLink"
                @input="handleRenderBookmark"
              />
            </div>
          </div>
        </figure>
      </fieldset>

      <div class="feature-divider feature-divider--between"></div>

      <fieldset class="grid grid-cols-1 gap-y-4">
        <figure>
          <figcaption class="flex items-center text-base">Background</figcaption>
          <section
            class="rounded-lg flex flex-wrap gap-2 justify-center items-center"
            lg="gap-1"
          >
            <div
              class="relative w-16 h-16 rounded-lg cursor-pointer"
              lg="w-12 h-12"
              v-for="item in globalStore.gradientColorList"
              :key="item.name"
              :class="[
                item.class,
                {
                  'border border-2 border-white border-opacity-60':
                    item.name === globalStore.setting.selectedGradientBgName
                }
              ]"
              @click="handleSelectBackground(item.name)"
            >
              <mdi:circle
                class="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] duration-300 w-5 h-5 text-slate-900/20 scale-100 ease-in-out"
                :class="{
                  'scale-0 translate-y-0':
                    item.name !== globalStore.setting.selectedGradientBgName
                }"
              />
            </div>
          </section>
        </figure>
        <figure>
          <div class="flex justify-between">
            <label class="flex items-center text-sm mb-1">Gradient Angle</label>
            <section
              class="rounded-lg flex flex-wrap gap-1 bg-slate-200 relative gradient-border"
              dark="bg-slate-900 bg-opacity-80"
            >
              <GradientAngleSelector
                v-model:value="globalStore.setting.gradientAngle"
                @change="handleGradientAngleChange"
              />
            </section>
          </div>
        </figure>
        <figure>
          <div class="flex justify-between items-center">
            <label class="flex items-center text-sm mb-1">Grainy</label>
            <section class="rounded-lg flex flex-wrap gap-1">
              <div class="flex items-center h-5">
                <input
                  aria-describedby="remember"
                  type="checkbox"
                  class="w-4 h-4 cursor-pointer bg-slate-50 rounded border border-gray-300 focus:ring-2 focus:ring-sky-300"
                  dark="bg-slate-700 border-slate-600 focus:ring-sky-600 ring-offset-slate-800"
                  required
                  v-model="globalStore.setting.gradientGrainy"
                />
              </div>
            </section>
          </div>
        </figure>
      </fieldset>

      <div class="feature-divider feature-divider--between"></div>

      <fieldset class="grid grid-cols-2 py-2">
        <figure>
          <figcaption class="flex items-center text-base">Padding</figcaption>
          <input
            type="range"
            min="0"
            max="128"
            step="2"
            class="w-full range"
            v-model="globalStore.setting.padding"
          />
        </figure>
      </fieldset>

      <div class="feature-divider feature-divider--between"></div>

      <fieldset class="grid py-2 gap-2">
        <figure>
          <figcaption class="flex items-center text-base">
            Rounded Corners
          </figcaption>
          <div class="flex justify-between items-center">
            <label class="flex items-center text-sm">Wrapper</label>
            <section class="rounded-lg flex flex-wrap gap-1">
              <VbSelect
                class="w-40"
                v-model:value="globalStore.setting.wrapperRoundedCorner"
                :options="state.roundedCornersOption"
                @change="
                  (val) => (globalStore.setting.wrapperRoundedCorner = val)
                "
              />
            </section>
          </div>
        </figure>

        <figure class="flex justify-between items-center">
          <label class="flex items-center text-sm">Bookmark</label>
          <section class="rounded-lg flex flex-wrap gap-1">
            <VbSelect
              class="w-40"
              v-model:value="globalStore.setting.bookmarkRoundedCorner"
              :options="state.roundedCornersOption"
              @change="
                (val) => (globalStore.setting.bookmarkRoundedCorner = val)
              "
            />
          </section>
        </figure>
      </fieldset>

      <div class="feature-divider feature-divider--between"></div>

      <div class="space-x-2 flex justify-center items-center">
        <button
          class="btn-icon text-xl inline-block"
          title="$t('button.toggle_layout')"
          @click="
            globalStore.setting.isHorizontal = !globalStore.setting.isHorizontal
          "
        >
          <mdi-dock-right v-if="globalStore.setting.isHorizontal" />
          <mdi-dock-top v-else />
        </button>

        <button
          class="btn-icon text-xl inline-block"
          title="$t('button.show_qrcode')"
          @click="
            globalStore.setting.showQRCode = !globalStore.setting.showQRCode
          "
        >
          <mdi:qrcode-plus v-if="globalStore.setting.showQRCode" />
          <mdi:qrcode-minus v-else />
        </button>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { reactive, watch } from 'vue'

import type { GradientAngle } from '@/types'
import { useGlobalStore } from '@/store'

const globalStore = useGlobalStore()

const state = reactive({
  isCopying: false,
  localBookmarkLink: '',
  roundedCornersOption: [
    {
      label: 'None',
      value: 'none'
    },
    {
      label: 'Small',
      value: 'lg'
    },
    {
      label: 'Medium',
      value: '2xl'
    },
    {
      label: 'Large',
      value: '3xl'
    }
  ]
})

const handleSelectBackground = (name: string) => {
  globalStore.setting.selectedGradientBgName = name
}

const handleGradientAngleChange = (angle: GradientAngle) => {
  globalStore.setting.gradientAngle = angle
}

const handleRenderBookmark = useDebounceFn((e: any) => {
  globalStore.setting.bookmarkLink = e?.target?.value ?? ''
}, 1000)

watch(
  () => globalStore.setting.bookmarkLink,
  (newVal) => {
    state.localBookmarkLink = newVal
  },
  { deep: true, immediate: true }
)
</script>

<style>
.range {
  -webkit-appearance: none;
  @apply w-full h-4 cursor-pointer overflow-hidden bg-transparent rounded-full;
}

.range::-webkit-slider-thumb {
  -webkit-appearance: none;
  @apply bg-sky-500 rounded-full w-4 h-4;
  @apply transition-all duration-300 ease-in-out
  cursor: ew-resize;
  box-shadow: 0 0 2px 0 rgba(14, 165, 233, 0.66);
}

.range::-webkit-slider-runnable-track {
  -webkit-appearance: none;
  @apply bg-slate-200 border-slate-900 border shadow-transparent;
  @apply dark:bg-sky-700 dark:border-slate-200;
}

.range:focus {
  outline: none;
}

.feature-divider {
  @apply w-full h-[2px] max-w-screen-xl mx-auto my-2;
}

.feature-divider--between {
  background: linear-gradient(
    90deg,
    rgba(179, 132, 201, 0),
    rgba(14, 165, 233, 0.66),
    rgba(179, 132, 201, 0)
  );
}

.aspect-auto {
  aspect-ratio: auto;
}

.bg-none {
  background-image: none;
}

.rounded-2xl {
  border-radius: 1rem;
}

.rounded-3xl {
  border-radius: 1.5rem;
}

.bg-gradient-to-t {
  background-image: linear-gradient(to top, var(--tw-gradient-stops));
}
.bg-gradient-to-tr {
  background-image: linear-gradient(to top right, var(--tw-gradient-stops));
}
.bg-gradient-to-r {
  background-image: linear-gradient(to right, var(--tw-gradient-stops));
}
.bg-gradient-to-br {
  background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));
}
.bg-gradient-to-b {
  background-image: linear-gradient(to bottom, var(--tw-gradient-stops));
}
.bg-gradient-to-bl {
  background-image: linear-gradient(to bottom left, var(--tw-gradient-stops));
}
.bg-gradient-to-l {
  background-image: linear-gradient(to left, var(--tw-gradient-stops));
}
.bg-gradient-to-tl {
  background-image: linear-gradient(to top left, var(--tw-gradient-stops));
}

.gradient-border {
  --borderWidth: 3px;
  border-radius: var(--borderWidth);
}
.gradient-border:after {
  content: '';
  position: absolute;
  top: calc(-1 * var(--borderWidth));
  left: calc(-1 * var(--borderWidth));
  height: calc(100% + var(--borderWidth) * 2);
  width: calc(100% + var(--borderWidth) * 2);
  background: conic-gradient(
    rgba(6, 182, 212, 0.66),
    rgba(14, 165, 233, 0.66),
    rgba(6, 182, 212, 0.66)
  );
  border-radius: calc(2 * var(--borderWidth));
  z-index: -1;
  background-size: 300% 300%;
}

.dark .gradient-border:after {
  background: conic-gradient(
    rgba(179, 132, 201, 0),
    rgba(14, 165, 233, 0.66),
    rgba(179, 132, 201, 0)
  );
}
</style>
