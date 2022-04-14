<template>
  <figure
    class="web-bookmark-card relative inset-0 overflow-hidden text-left transition-all duration-300 ease-out max-w-screen"
    :class="[bookmarkClass, horizontal ? 'lg:w-[720px]' : 'lg:w-120']"
  >
    <slot />
    <a
      v-if="!isLoading"
      class="flex flex-wrap text-current no-underline hover:no-underline inset-0 backdrop-filter backdrop-blur-lg backdrop-saturate-[180%] filter drop-shadow-xl transition-all duration-300 ease-out z-10"
      bg="!opacity-75 white dark:slate-800"
      :class="[cover === 'right' ? 'flex-row-reverse' : 'flex-row']"
      :href="metaData.url"
      target="_blank"
    >
      <div
        class="relative flex order-1 min-w-1/2 w-full flex-grow-[999] basis-[0]"
        :class="[
          qrcode ? 'justify-between' : '',
          horizontal ? 'py-0 pl-4 pr-4': 'py-2 px-4',
          (qrcode && horizontal) ? '!pr-0' : '!pl-4 !pr-2'
        ]"
      >
        <div
          class="flex-1 flex flex-col justify-center font-sans"
          :class="qrcode && metaData.url ? 'has-qrcode' : 'w-full'"
        >
          <div
            class="items-center font-semibold line-clamp-1"
            :class="[horizontal ? 'text-sm' : 'text-base']"
            text="slate-800 dark:white"
          >
            <span>{{ metaData.title }}</span>
          </div>
          <div
            class="items-center mt-3 line-clamp-2"
            :class="[horizontal ? 'text-xs' : 'text-sm']"
            text="slate-800 dark:slate-400"
          >
            {{ metaData.description }}
          </div>
          <div class="items-center flex truncate mt-3">
            <div class="flex items-center truncate">
              <img
                v-if="metaData.logo"
                :src="metaData.logo"
                class="inline-block align-text-bottom mr-2 h-4 w-4"
                :class="[horizontal ? 'h-3.5 w-3.5' : 'h-4 w-4']"
              />
              <span
                class="truncate"
                :class="[horizontal ? 'text-xs' : 'text-sm']"
                text="slate-800 dark:slate-400"
              >
                {{ metaData.author || metaData.publisher || metaData.url }}
              </span>
            </div>
          </div>
        </div>

        <div v-if="qrcode && metaData.url" class="w-32 h-32">
          <FancyQRCode
            :url="metaData.url"
            class="w-32 h-32"
          />
        </div>
      </div>
      <div
        v-if="metaData.image"
        class="relative min-w-1/3 max-h-full"
        :class="[
          horizontal ? 'h-32 basis-[13.5rem]' : 'h-64 basis-[16rem] flex-grow'
        ]"
      >
        <img
          class="relative m-0 w-full h-full align-bottom object-cover"
          :src="metaData.base64Image || metaData.image"
        />
      </div>
    </a>
    <div
      v-else
      class="text-center p-20 flex flex-col justify-center items-center !bg-opacity-30 backdrop-filter backdrop-blur-lg backdrop-saturate-[180%] filter drop-shadow-xl transition-all duration-300 ease-out z-10"
      bg="!opacity-75 white dark:slate-800"
    >
      <svg
        class="animate-spin box-content text-slate-700 dark:text-slate-200"
        width="32"
        height="32"
        viewBox="0 0 16 16"
        fill="none"
        data-view-component="true"
      >
        <circle
          cx="8"
          cy="8"
          r="7"
          stroke="currentColor"
          stroke-opacity="0.25"
          stroke-width="2"
          vector-effect="non-scaling-stroke"
        ></circle>
        <path
          d="M15 8a7.002 7.002 0 00-7-7"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          vector-effect="non-scaling-stroke"
        ></path>
      </svg>
      <span class="mt-4 text-slate-800 dark:text-slate-200">
        Loading Visualization Bookmark...
      </span>
    </div>
  </figure>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, watch } from 'vue'
import axios from 'axios'

import FancyQRCode from './FancyQRCode.vue'
import { getBase64Image } from '@/utils'

const API_PREFIX = 'https://metafy.vercel.app/api?url='

type MetaData = {
  title: string
  description: string
  url: string
  image: string
  logo: string
  author: string
  publisher: string
  base64Image: string
  base64Logo: string
}

const props = defineProps({
  /**
   * find the special alias and render it
   */
  url: { type: String, require: true, default: '' },
  /**
   * control the bookmark size
   */
  size: { type: String, default: 'medium' },
  /**
   * control the bookmark corner
   */
  corner: { type: String, default: 'xl' },
  /**
   * the image render position of bookmark
   */
  cover: { type: String, default: 'right' },
  /**
   * when to show card shadows
   */
  shadow: { type: String, default: 'always' },
  /**
   * whether bookmark card is horizontal or vertical
   */
  horizontal: { type: Boolean, default: false },
  /**
   * whether bookmark card is show qrcode
   */
  qrcode: { type: Boolean, default: true }
})

const isLoading = ref(false)

const metaData = reactive<MetaData>({
  title: '',
  description: '',
  url: '',
  image: '',
  logo: '',
  author: '',
  publisher: '',
  base64Image: '',
  base64Logo: ''
})
const init = async () => {
  isLoading.value = true

  const { data } = (await axios.get(`${API_PREFIX}${props.url}`)) as {
    data: MetaData
  }
  // fetch data from server/api
  // const { data } = await useAsyncData('/api/metafy', () => {
  //   return $fetch('/api/metafy', { params: { url: props.url } })
  // })

  if (data) {
    let base64Image = ''
    if (data?.image) {
      try {
        base64Image = await getBase64Image(data.image)
      } catch (error) {
        console.log(`Oops, something went wrong: Maybe caused by CORS!!!`)
      }
    }

    metaData.title = data.title
    metaData.description = data.description
    metaData.url = props.url as string
    metaData.image = data.image
    metaData.logo = data.logo
    metaData.author = data.author
    metaData.publisher = data.publisher
    metaData.base64Image = base64Image
  } else {
    metaData.description = '🪄 Turn any link into a stylish visual web bookmark, one-click to copy the beautiful web bookmark image.'
    metaData.image = 'https://bookmark.style/preview.png'
    metaData.logo = 'https://bookmark.style/favicon.svg'
    metaData.title = 'bookmark.style: stylish your visual web bookmark'
    metaData.url = props.url
  }

  isLoading.value = false
}

const bookmarkClass = computed(() => {
  return [
    {
      'web-bookmark-card--large': props.size === 'large',
      'web-bookmark-card--medium': props.size === 'medium',
      'web-bookmark-card--small': props.size === 'small',
      'web-bookmark-card--horizontal': props.horizontal,
      'is-always-shadow': props.shadow === 'always',
      'is-hover-shadow': props.shadow === 'hover',
      'is-never-shadow': props.shadow === 'never'
    },
    `rounded-${props.corner}`
  ]
})

watch(
  () => props.url,
  async (newVal) => {
    if (newVal !== '') {
      await init()
    }
  },
  { deep: true, immediate: true }
)
</script>

<style scoped>
.has-qrcode {
  width: calc(100% - 8rem);
}
</style>
