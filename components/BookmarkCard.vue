<template>
  <div
    class="relative overflow-hidden transition-all duration-300 ease-out"
    :class="[
      bookmarkClass,
      horizontal ? 'lg:w-[720px]' : 'lg:w-[480px]',
      isLoading ? 'opacity-75' : ''
    ]"
  >
    <a
      v-if="!isLoading"
      class="flex flex-wrap text-current no-underline hover:no-underline inset-0 filter backdrop-blur-lg backdrop-saturate-[180%] transition-all duration-300 ease-out z-10 bg-white/70 dark:bg-neutral-800/70"
      :class="[cover === 'right' ? 'flex-row-reverse' : 'flex-row']"
      :href="metaData.url"
      target="_blank"
    >
      <div
        class="relative flex order-1 min-w-[50%] w-full flex-grow-[999] basis-[0]"
        :class="[qrcode ? 'justify-between !pl-4' : 'p-4']"
      >
        <div
          class="flex-1 flex flex-col justify-center font-sans"
          :class="qrcode && metaData.url ? 'has-qrcode' : 'w-full'"
        >
          <div
            class="items-center font-semibold line-clamp-1 text-neutral-800 dark:text-neutral-100/90"
            :class="[horizontal ? 'text-sm' : 'text-base']"
          >
            <span>{{ metaData.title }}</span>
          </div>
          <div
            class="items-center mt-3 line-clamp-2 text-neutral-800 dark:text-neutral-300/90"
            :class="[horizontal ? 'text-xs' : 'text-sm']"
          >
            {{ metaData.description }}
          </div>
          <div class="items-center flex truncate mt-3">
            <div class="flex items-center truncate">
              <img
                v-if="metaData.logo"
                :src="metaData.logo"
                class="inline-block align-text-bottom mr-2"
                :class="[horizontal ? 'h-3.5 w-3.5' : 'h-4 w-4']"
                alt="Site logo"
              />
              <span
                class="truncate text-neutral-800 dark:text-neutral-300/90"
                :class="[horizontal ? 'text-xs' : 'text-sm']"
              >
                {{ metaData.author || metaData.publisher || metaData.url }}
              </span>
            </div>
          </div>
        </div>

        <div v-if="qrcode && metaData.url" class="w-32 h-32">
          <FancyQRCode :url="metaData.url" class="w-32 h-32" />
        </div>
      </div>
      <div
        v-if="metaData.image"
        class="relative min-w-[36%] max-h-full"
        :class="[
          horizontal ? 'h-32 basis-[13.5rem]' : 'h-64 basis-[16rem] flex-grow'
        ]"
      >
        <img
          class="relative m-0 w-full h-full align-bottom object-cover"
          :src="metaData.base64Image || metaData.image"
          :alt="metaData.title"
        />
      </div>
    </a>
    <div
      v-else
      class="text-center p-20 flex flex-col justify-center items-center backdrop-blur-lg backdrop-saturate-[180%] transition-all duration-300 ease-out z-10"
    >
      <svg
        class="animate-spin box-content"
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
      <span class="mt-4"> Styling your visual web bookmark... </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import axios from 'axios'
import FancyQRCode from './FancyQRCode.vue'
import { getBase64Image } from '@/utils'
import type { MetaData, BookmarkProps } from '@/types/bookmark'

const API_PREFIX_VERCEL = 'https://metafy.vercel.app/api?url='
const API_PREFIX_NETLIFY =
  'https://get-metafy.netlify.app/.netlify/functions/api?url='

const props = withDefaults(defineProps<BookmarkProps>(), {
  size: 'medium',
  corner: 'xl',
  cover: 'right',
  shadow: 'always',
  horizontal: false,
  qrcode: true
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

const config = useRuntimeConfig()

const apiPrefix = computed(() => {
  return config.NODE_ENV === 'development'
    ? API_PREFIX_NETLIFY
    : API_PREFIX_VERCEL
})

const init = async () => {
  isLoading.value = true

  try {
    const { data } = (await axios.get(`${apiPrefix.value}${props.url}`)) as {
      data: MetaData
    }

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
      metaData.url = props.url
      metaData.image = data.image
      metaData.logo = data.logo
      metaData.author = data.author
      metaData.publisher = data.publisher
      metaData.base64Image = base64Image
    } else {
      metaData.description =
        '🪄 Turn any link into a stylish visual web bookmark, one-click to copy the beautiful web bookmark image.'
      metaData.image = 'https://bookmark.style/preview.png'
      metaData.logo = 'https://bookmark.style/favicon.svg'
      metaData.title = 'bookmark.style: stylish your visual web bookmark'
      metaData.url = props.url
    }
  } catch (error) {
    console.error('Error fetching metadata:', error)
    metaData.description =
      '🪄 Turn any link into a stylish visual web bookmark, one-click to copy the beautiful web bookmark image.'
    metaData.image = 'https://bookmark.style/preview.png'
    metaData.logo = 'https://bookmark.style/favicon.svg'
    metaData.title = 'bookmark.style: stylish your visual web bookmark'
    metaData.url = props.url
  } finally {
    isLoading.value = false
  }
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
.is-always-shadow {
  @apply shadow-lg;
}

.is-hover-shadow {
  @apply hover:shadow-lg transition-shadow duration-300;
}

.is-never-shadow {
  @apply shadow-none;
}
</style>
