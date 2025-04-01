<template>
  <div class="dark:text-white w-[544px] mt-4">
    <div class="grid grid-cols-2 gap-4">
      <RainbowButton class="flex gap-2 items-center" @click="handleCopyImage">
        <div
          class="w-5 h-5 flex justify-center items-center"
          v-if="state.isCopying"
        >
          <SpinIcon />
        </div>
        <carbon:image-copy v-else />
        <span class="text-base">Copy Image</span>
      </RainbowButton>
      <RainbowButton
        class="flex gap-2 items-center"
        @click="handleDownloadImage"
      >
        <carbon:download />
        <span class="text-base">Download Image</span>
      </RainbowButton>
    </div>
    <fieldset class="my-4">
      <figure>
        <figcaption>Markdown</figcaption>
        <div
          class="w-full p-4 my-4 rounded-lg whitespace-pre-wrap break-all bg-neutral-200 dark:bg-neutral-900/80"
        >
          <code class="text-sm">{{ markdownCode }}</code>
        </div>
      </figure>
    </fieldset>
    <div class="grid grid-cols-2 gap-4">
      <RainbowButton
        class="flex gap-2 items-center"
        @click="handleCopyMarkdown"
        secondary
      >
        <carbon:copy />
        <span class="text-base" v-if="!copied">Copy to README.md</span>
        <span class="text-base" v-else>Copied!</span>
      </RainbowButton>

      <RainbowButton
        class="flex gap-2 items-center"
        @click="(e) => handleShareToTwitter()"
        secondary
      >
        <mdi:twitter />
        <span class="text-base">Share on Twitter</span>
      </RainbowButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import FileSaver from 'file-saver'
import { copyBlobToClipboard } from 'copy-image-clipboard'
import { useClipboard } from '@vueuse/core'

import { useGlobalStore } from '@/store'
import { useRetinaImage } from '@/composables/useRetinaImage'
import { useConstants } from '@/composables/useConstants'
import { toast } from 'vue-sonner'

const globalStore = useGlobalStore()
const { TWITTER_SHARE_URL } = useConstants()

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

  try {
    const { imageBlob } = await useRetinaImage(bookmarkEl)

    toast.success('Image copied to clipboard!')

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

    return FileSaver.saveAs(imageBlob.value, 'web-visual-bookmark@2x.png')
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

const handleCopyMarkdown = () => {
  copy()
  toast.success('Copied to clipboard!')
}
</script>
