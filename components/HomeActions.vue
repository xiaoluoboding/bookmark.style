<template>
  <div class="dark:text-white w-136 mt-4">
    <div class="flex gap-4">
      <button
        class="btn btn-primary btn-blur w-full border"
        @click="handleCopyImage"
      >
        <div
          class="w-5 h-5 flex justify-center items-center"
          v-if="state.isCopying"
        >
          <SpinIcon />
        </div>
        <carbon:image-copy class="w-5 h-5" v-else />
        <span class="ml-2 text-base">Copy Image</span>
      </button>
      <button
        class="btn btn-primary btn-blur w-full border"
        @click="handleDownloadImage"
      >
        <carbon:download class="w-5 h-5" />
        <span class="ml-2 text-base">Download Image</span>
      </button>
    </div>
    <fieldset class="my-4">
      <figcaption>Markdown</figcaption>
      <figure
        class="w-full p-4 my-4 rounded-lg whitespace-pre-wrap break-all bg-slate-200 dark:bg-slate-600"
      >
        <code class="text-sm">{{ markdownCode }}</code>
      </figure>
    </fieldset>
    <div class="flex gap-4">
      <button
        class="btn btn-secondary btn-blur w-full border"
        @click="(e) => copy()"
      >
        <carbon:copy class="w-5 h-5" />
        <span class="ml-2 text-base" v-if="!copied">Copy to README.md</span>
        <span class="ml-2 text-base" v-else>Copied!</span>
      </button>

      <button
        class="btn btn-secondary btn-blur w-full border"
        @click="(e) => handleShareToTwitter()"
      >
        <mdi:twitter class="w-5 h-5" />
        <span class="ml-2 text-base">Share on Twitter</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { saveAs } from 'file-saver'
import { copyBlobToClipboard } from 'copy-image-clipboard'
import { useClipboard } from '@vueuse/core'

import { useGlobalStore, useNotificationStore } from '@/store'
import { useRetinaImage } from '@/composables/useRetinaImage'
import { useConstants } from '@/composables/useConstants'
import type { NotificationItem } from '@/types'

const globalStore = useGlobalStore()
const { TWITTER_SHARE_URL } = useConstants()
const { addNotification, removeNotification } = useNotificationStore()

const state = reactive({
  isCopying: false
})

const markdownCode = computed(() => {
  return `[![Bookmark Style Card](https://svg.bookmark.style/api?url=${globalStore.setting.bookmarkLink})](${globalStore.setting.bookmarkLink})`
})

const { copy, copied } = useClipboard({
  source: markdownCode
})

const handleCopyImage = async () => {
  state.isCopying = true
  const bookmarkEl = document.getElementById('bookmark') as HTMLImageElement
  let timer: any = null

  try {
    const { imageBlob } = await useRetinaImage(bookmarkEl)

    const newNotification: NotificationItem = {
      style: 'SUCCESS',
      title: 'Image copied to clipboard!'
    }

    addNotification(newNotification)

    if (timer) clearTimeout(timer)

    timer = setTimeout(() => {
      removeNotification(newNotification)
    }, 3333)

    state.isCopying = false
    return copyBlobToClipboard(imageBlob.value)
  } catch (error) {
    state.isCopying = false
    console.log(error)
  }
}

const handleDownloadImage = async () => {
  const bookmarkEl = document.getElementById('bookmark') as HTMLImageElement

  try {
    const { imageBlob } = await useRetinaImage(bookmarkEl)

    return saveAs(imageBlob.value, 'web-visual-bookmark@2x.png')
  } catch (error) {
    console.log(error)
  }
}

// const handleDownloadSVG = async () => {
//   const bookmarkEl = document.getElementById('bookmark') as HTMLImageElement
//   const dataURI = await domtoimage.toSvg(bookmarkEl)
//   if (dataURI) {
//     const link = document.createElement('a')
//     link.download = 'web-visual-bookmark.svg'
//     link.href = dataURI
//     link.click()
//   }
// }

const handleShareToTwitter = async () => {
  const url = globalStore.setting.bookmarkLink
  let text = encodeURIComponent(
    `Turn the link ${url} into a visual web bookmark using ${window.location.href}. Check it out! `
  )
  text += encodeURIComponent(`#bookmark #tools `)
  const tweetShareLink = `${TWITTER_SHARE_URL}text=${text}%0A&url=${encodeURIComponent(
    window.location.href
  )}`
  const link = document.createElement('a')
  link.href = tweetShareLink
  link.target = '_blank'
  link.click()
}
</script>
