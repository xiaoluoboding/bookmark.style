<template>
  <div
    class="h-full min-h-screen w-full min-w-screen bg-gradient-to-br from-slate-200 to-slate-50 m-0"
    dark="from-slate-700 to-slate-900"
  >

    <div class="px-4 py-2 text-white !bg-gradient-to-r" :class="selectedBackground">
      <p class="flex items-center justify-center text-sm font-medium !text-white">
        bookmark.style also support the chrome extension version.
        <a
          class="underline flex items-center"
          href="https://chrome.google.com/webstore/detail/web-visual-bookmark/jcfidgjldodhkpiebmemhnhgpgdakham/"
          target="_blank"
        >
          <span class="ml-2 text-xs">Get Chrome Extension &rarr;</span>
        </a>
      </p>
    </div>
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
        <p class="flex items-center space-x-1">
          <carbon:logo-twitter class="text-sky-500" />
          <span>
            <a href="https://twitter.com/xiaoluoboding" class="text-neon" target="_blank">
              Follow me on Twitter
            </a>
          </span>
          <span class="px-2 text-sky-300">|</span>         
          <carbon:cafe class="text-sky-500" />
          <span>
            <a href="https://www.buymeacoffee.com/xlbd" target="_blank" class="text-neon">
              Buy me a coffee
            </a>
          </span>
          <span class="px-2 text-sky-300">|</span>  
          <mdi:heart class="text-sky-500" />
          <span>
            <a href="https://github.com/sponsors/xiaoluoboding" target="_blank" class="text-neon">
              Sponsor me on GitHub
            </a>
          </span>
          <!-- <span>© {{ new Date().getFullYear() }}</span> -->
        </p>
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
import { computed, onMounted } from 'vue'
import { useMediaQuery, useUrlSearchParams } from '@vueuse/core'

import { useGlobalStore, useNotificationStore } from '@/store'

const globalStore = useGlobalStore()
const { notificationList, removeNotification } = useNotificationStore()

const isMobileScreen = useMediaQuery('(max-width: 640px)')
const isLargeScreen = useMediaQuery('(min-width: 1024px)')
const urlSearchParams = useUrlSearchParams('history')

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

onMounted(() => {
  if (urlSearchParams.url) {
    globalStore.setting.bookmarkLink = urlSearchParams.url as string
  }
})
</script>

<style scoped>
</style>
