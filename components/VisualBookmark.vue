<template>
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
          `rounded-${globalStore.setting.wrapperRoundedCorner}`
        ]"
        :style="[bookmarkBgStyle, selectedBackground]"
      >
        <img
          v-if="globalStore.setting.gradientGrainy"
          src="/nosie.svg"
          class="absolute inset-0 w-full h-full bg-repeat opacity-30 filter brightness-100 contrast-150 rounded-none"
        />
        <ClientOnly>
          <BookmarkCard
            :url="globalStore.setting.bookmarkLink"
            :horizontal="globalStore.setting.isHorizontal"
            :qrcode="globalStore.setting.showQRCode"
            :corner="globalStore.setting.bookmarkRoundedCorner"
          >
            <div
              class="inset-0 absolute -z-1 rounded-xl inset-0"
              :class="[selectedBackground, 'bg-transparent']"
            />
          </BookmarkCard>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useMediaQuery } from '@vueuse/core'

import { useGlobalStore } from '@/store'

const isMobileScreen = useMediaQuery('(max-width: 640px)')
const isLargeScreen = useMediaQuery('(min-width: 1024px)')

const globalStore = useGlobalStore()

const bookmarkBgStyle = computed(() => {
  return {
    padding:
      isMobileScreen.value && !isLargeScreen.value
        ? '0px'
        : `${globalStore.setting.padding}px`,
    backgroundColor:
      Number(globalStore.setting.padding) === 0 ? 'transparent !important' : ''
  }
})

const bookmarkClass = computed(() => {
  return Number(globalStore.setting.padding) === 0 ? '!bg-transparent' : ''
})

const selectedBackground = computed(() => {
  if (globalStore.setting.selectedGradientBgName) {
    const gradient = globalStore.gradientColorList.find(
      (item) => item.name === globalStore.setting.selectedGradientBgName
    ) || globalStore.gradientColorList[0];
    return gradient.style;
  }
  return globalStore.gradientColorList[0].style;
})
</script>

<style scoped>
.has-qrcode {
  width: calc(100% - 8rem);
}
</style>
