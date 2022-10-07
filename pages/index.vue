<template>
  <div
    class="h-full min-h-screen w-full min-w-screen bg-gradient-to-br from-slate-200 to-slate-50 m-0"
    dark="from-slate-700 to-slate-900"
  >
    <!-- bannder -->
    <div
      class="fixed w-full px-4 py-2 text-white !bg-gradient-to-r"
      :class="selectedBackground"
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
  </div>

  <client-only>
    <chatwoot />
  </client-only>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue'
import { useUrlSearchParams } from '@vueuse/core'

import { useGlobalStore, useNotificationStore } from '@/store'

const globalStore = useGlobalStore()
const { notificationList, removeNotification } = useNotificationStore()
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

onMounted(() => {
  if (urlSearchParams.url) {
    globalStore.setting.bookmarkLink = urlSearchParams.url as string
  }
})
</script>

<style scoped></style>
