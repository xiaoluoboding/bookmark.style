<template>
  <div
    class="h-full min-h-screen w-full min-w-screen bg-gradient-to-br from-neutral-200 to-neutral-50 dark:from-neutral-700 dark:to-neutral-900 m-0"
  >
    <!-- bannder -->
    <div
      class="fixed w-full px-4 py-2 text-white"
      :style="selectedBackground"
    >
      <p
        class="flex items-center justify-center text-sm font-medium !text-white"
      >
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
    <div class="container mx-auto px-5 pt-9">
      <!-- Home Header -->
      <HomeHeader />
    </div>
    <div
      class="container mx-auto px-5 lg:px-10 pb-20 flex flex-col justify-center items-center h-[calc(100vh-6.5rem)]"
    >
      <!-- Home Main -->
      <main
        class="grid lg:grid-cols-[2fr,1fr] gap-8 py-16 md:py-4 lg:py-4 max-w-screen w-full"
      >
        <section class="relative flex-1 grid place-items-center">
          <VisualBookmark />

          <HomeActions />
        </section>

        <BookmarkPalette />
      </main>

      <!-- Product Hunt Badge -->
      <div class="container">
        <a
          class="producthunt fixed bottom-4 cursor-pointer"
          href="https://www.producthunt.com/posts/bookmark-style?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-bookmark&#0045;style"
          target="_blank"
        >
          <img
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=344300&theme=dark"
            alt="bookmark&#0046;style - 🪄&#0032;Turn&#0032;any&#0032;link&#0032;into&#0032;a&#0032;stylish&#0032;visual&#0032;web&#0032;bookmark&#0046; | Product Hunt"
            style="width: 250px; height: 54px"
            width="250"
            height="54"
          />
        </a>
      </div>

      <!-- Home Footer -->
      <HomeFooter />

      <template v-if="notificationList.length > 0">
        <VbNotification
          placement="TOP"
          :notification-list="notificationList"
          @close="removeNotification"
        />
      </template>
    </div>
    <Toaster rich-colors position="top-center" />
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue'
import { useUrlSearchParams } from '@vueuse/core'
import { Toaster } from '@/components/ui/sonner'

import { useGlobalStore, useNotificationStore } from '@/store'

const globalStore = useGlobalStore()
const { notificationList, removeNotification } = useNotificationStore()
const urlSearchParams = useUrlSearchParams('history')

const selectedBackground = computed(() => {
  if (globalStore.setting.selectedGradientBgName) {
    const gradient = globalStore.gradientColorList.find(
      (item) => item.name === globalStore.setting.selectedGradientBgName
    ) || globalStore.gradientColorList[0];
    
    return gradient.style;
  }
  
  return globalStore.gradientColorList[0].style;
})

onMounted(() => {
  if (urlSearchParams.url) {
    globalStore.setting.bookmarkLink = urlSearchParams.url as string
  }
})
</script>

<style>
/* Define CSS variables for Tailwind colors */
:root {
  /* Green */
  --color-green-300: rgb(134, 239, 172);
  
  /* Blue */
  --color-blue-500: rgb(59, 130, 246);
  --color-blue-700: rgb(29, 78, 216);
  --color-blue-800: rgb(30, 64, 175);
  
  /* Purple */
  --color-purple-300: rgb(216, 180, 254);
  --color-purple-600: rgb(147, 51, 234);
  
  /* Pink */
  --color-pink-300: rgb(249, 168, 212);
  --color-pink-500: rgb(236, 72, 153);
  
  /* Red */
  --color-red-200: rgb(254, 202, 202);
  --color-red-300: rgb(252, 165, 165);
  --color-red-500: rgb(239, 68, 68);
  
  /* Yellow */
  --color-yellow-100: rgb(254, 249, 195);
  --color-yellow-200: rgb(254, 240, 138);
  --color-yellow-500: rgb(234, 179, 8);
  
  /* Indigo */
  --color-indigo-200: rgb(199, 210, 254);
  --color-indigo-400: rgb(129, 140, 248);
  
  /* Sky */
  --color-sky-400: rgb(56, 189, 248);
  
  /* Rose */
  --color-rose-400: rgb(251, 113, 133);
  
  /* Lime */
  --color-lime-200: rgb(217, 249, 157);
  --color-lime-400: rgb(163, 230, 53);
  
  /* Teal */
  --color-teal-200: rgb(153, 246, 228);
  
  /* Gray */
  --color-gray-200: rgb(229, 231, 235);
  --color-gray-400: rgb(156, 163, 175);
  --color-gray-600: rgb(75, 85, 99);
  --color-gray-700: rgb(55, 65, 81);
  --color-gray-900: rgb(17, 24, 39);
  
  /* Black */
  --color-black: rgb(0, 0, 0);
}
</style>
