<template>
  <div
    class="h-full min-h-screen w-full min-w-screen bg-gradient-to-br from-slate-200 to-slate-50 dark:from-slate-700 dark:to-slate-900 m-0"
  >
    <div class="container mx-auto px-5">
      <!-- Home Header -->
      <HomeHeader />
    </div>
    <div class="container mx-auto px-5 lg:px-10 pb-20 flex flex-col justify-center items-center h-[calc(100vh-4rem)]">
      <!-- Home Main -->
      <main
        class="grid lg:grid-cols-[2fr,1fr] gap-8 py-16 md:py-4 lg:py-4 max-w-screen w-full"
      >
        <section class="relative flex-1 grid place-items-center">
          <div class="pointer-events-none">
            <div
              id="bookmark"
              class="overflow-hidden shadow-xl relative duration-200 transform-gpu transition-all ease-linear"
              :class="[
                bookmarkClass,
                `rounded-${globalStore.setting.wrapperRoundedCornersValue}`
              ]"
            >
              <div
                class="relative transition-all duration-200 filter drop-shadow-2xl aspect-auto ease-linear"
                :class="[
                  bookmarkClass,
                  selectedBackground,
                  `rounded-${globalStore.setting.wrapperRoundedCornersValue}`
                ]"
                :style="bookmarkBgStyle"
              >
                <img
                  v-if="globalStore.setting.gradientGrainy"
                  src="/nosie.svg"
                  class="absolute inset-0 w-full h-full bg-repeat opacity-30 filter brightness-100 contrast-150 rounded-none"
                />
                <VisualBookmark
                  :url="globalStore.setting.bookmarkLink"
                  :horizontal="globalStore.setting.isHorizontal"
                  :qrcode="globalStore.setting.showQRCode"
                  :corner="globalStore.setting.bookmarkRoundedCornersValue"
                >
                  <div
                    class="inset-0 absolute -z-1 rounded-xl inset-0"
                    :class="[selectedBackground, 'bg-transparent']"
                  />
                </VisualBookmark>
              </div>
            </div>
          </div>
        </section>

        <BookmarkPalette />
      </main>

      <!-- Home Footer -->
      <footer
        class="fixed bottom-4 left-0 flex flex-col justify-center items-center w-full"
        text="slate-900 dark:slate-300 opacity-60 sm"
      >
        <p class="flex items-center">
          Code with ❤️ & ☕️ By
          <GradientLink to="https://twitter.com/xiaoluoboding" class="flex items-center">
            <carbon:logo-twitter class="text-sky-500" /> @xiaoluoboding
          </GradientLink>
          © {{ new Date().getFullYear() }}
        </p>
        <p>Powered by Vite & Nuxt 3 & Netlify</p>
      </footer>

      <template v-if="notificationList.length > 0">
        <VbNotification
          placement="TOP"
          :notification-list="notificationList"
          @close="removeNotification"
        />
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useMediaQuery } from '@vueuse/core'

import { useGlobalStore, useNotificationStore } from '@/store'

const globalStore = useGlobalStore()
const { notificationList, removeNotification } = useNotificationStore()

const isMobileScreen = useMediaQuery('(max-width: 640px)')
const isLargeScreen = useMediaQuery('(min-width: 1024px)')

const selectedBackground = computed(() => {
  if (globalStore.setting.selectedGradientBgName) {
    const idx = globalStore.gradientColorList.findIndex(
      (item) => item.name === globalStore.setting.selectedGradientBgName
    )
    return globalStore.gradientColorList[idx].class
  }
  return globalStore.gradientColorList[0].class
})

const bookmarkBgStyle = computed(() => {
  return {
    padding: isMobileScreen.value && !isLargeScreen.value
      ? '0px'
      : `${globalStore.setting.padding}px`,
    backgroundColor:
      Number(globalStore.setting.padding) === 0 ? 'transparent !important' : ''
  }
})

const bookmarkClass = computed(() => {
  return Number(globalStore.setting.padding) === 0 ? '!bg-transparent' : ''
})
</script>

<style scoped>
.range {
  -webkit-appearance: none;
  @apply w-full h-4 cursor-pointer overflow-hidden bg-transparent rounded-full;
}

.range::-webkit-slider-thumb {
  -webkit-appearance: none;
  @apply bg-sky-500 rounded-full w-4 h-4;
  @apply transition-all duration-300 ease-in-out
  cursor: ew-resize;
  box-shadow: 0 0 2px 0 rgba(14, 165, 233, 0.66),;
}

.range::-webkit-slider-runnable-track  {
  -webkit-appearance: none;
  @apply bg-slate-200 border-slate-900 border shadow-transparent;
  @apply dark:bg-sky-700 dark:border-slate-200;
}

.range:focus {
  outline: none;
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
    rgba(6, 182, 212, .66),
    rgba(14, 165, 233, 0.66),
    rgba(6, 182, 212, .66)
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
