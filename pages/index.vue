<template>
  <div
    class="h-full min-h-screen w-full min-w-screen bg-gradient-to-br from-slate-200 to-slate-50 m-0"
    dark="from-slate-700 to-slate-900"
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
                `rounded-${globalStore.setting.wrapperRoundedCorner}`
              ]"
            >
              <div
                class="relative transition-all duration-200 filter drop-shadow-2xl aspect-auto ease-linear"
                :class="[
                  bookmarkClass,
                  selectedBackground,
                  `rounded-${globalStore.setting.wrapperRoundedCorner}`
                ]"
                :style="bookmarkBgStyle"
              >
                <img
                  v-if="globalStore.setting.gradientGrainy"
                  src="/nosie.svg"
                  class="absolute inset-0 w-full h-full bg-repeat opacity-30 filter brightness-100 contrast-150 rounded-none"
                />
                <ClientOnly>
                  <VisualBookmark
                    :url="globalStore.setting.bookmarkLink"
                    :horizontal="globalStore.setting.isHorizontal"
                    :qrcode="globalStore.setting.showQRCode"
                    :corner="globalStore.setting.bookmarkRoundedCorner"
                  >
                    <div
                      class="inset-0 absolute -z-1 rounded-xl inset-0"
                      :class="[selectedBackground, 'bg-transparent']"
                    />
                  </VisualBookmark>
                </ClientOnly>
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
</style>
