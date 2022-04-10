<template>
  <div
    class="h-full min-h-screen w-full min-w-screen bg-gradient-to-br from-slate-200 to-slate-50 dark:from-slate-700 dark:to-slate-900 m-0"
  >
    <div class="container mx-auto px-5 lg:px-10 pb-20">
      <!-- Home Header -->
      <HomeHeader />

      <!-- Home Main -->
      <main
        class="grid lg:grid-cols-[2fr,1fr] gap-8 py-16 lg:pt-32 max-w-screen w-full"
      >
        <section class="relative flex-1 grid place-items-center">
          <div class="pointer-events-none">
            <div
              id="bookmark"
              class="overflow-hidden shadow-xl relative duration-200 transform-gpu transition-all ease-linear"
              :class="[
                bookmarkClass,
                `rounded-${state.wrapperRoundedCornersValue}`
              ]"
            >
              <div
                class="relative transition-all duration-200 filter drop-shadow-2xl aspect-auto ease-linear"
                :class="[
                  bookmarkClass,
                  selectedBackground,
                  `rounded-${state.wrapperRoundedCornersValue}`
                ]"
                :style="bookmarkBgStyle"
              >
                <img
                  v-if="state.gradientGrainy"
                  src="/nosie.svg"
                  class="absolute inset-0 w-full h-full bg-repeat opacity-30 filter brightness-100 contrast-150 rounded-none"
                />
                <VisualBookmark
                  :url="localBookmarkLink"
                  :horizontal="isHorizontal"
                  :qrcode="showQRCode"
                  :corner="state.bookmarkRoundedCornersValue"
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

        <nav
          class="grid place-items-start space-x-20 z-10 w-full"
          sm="px-8"
          lg="relative w-[360px] px-0"
          text="slate-800 xl dark:slate-50"
        >
          <div
            class="flex flex-col w-full glass bg-gradient-to-br from-slate-100 via-gray-100 to-stone-100 space-y-4 py-3 px-6 lg:py-6 rounded-xl inset-0"
            dark="from-slate-800 via-sky-900 to-slate-800"
            border="~ light-100 !opacity-10 dark:light-50"
          >
            <fieldset class="grid grid-cols-1 gap-y-4">
              <figcaption class="flex items-center text-base">URL</figcaption>
              <figure>
                <div class="relative w-full">
                  <div
                    class=""
                    lg="relative flex justify-center w-full mx-auto rounded-lg shadow-sm"
                  >
                    <div
                      class="absolute inset-y-0 left-0 px-3 flex items-center pointer-events-none"
                    >
                      <span class="text-gray-500 sm:text-sm">
                        <carbon:search class="w-4 h-4 lg:w-5 lg:h-5" />
                      </span>
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      class="w-full rounded border text-sm outline-none px-10 py-1 leading-8 transition-colors duration-200 ease-in-out bg-slate-100 bg-opacity-50 border-slate-300 text-slate-700 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-200"
                      lg="py-2 rounded-lg"
                      dark="bg-slate-700 bg-opacity-40 border-slate-600 text-slate-100 focus:border-sky-500 focus:bg-sky-900 focus:ring-2 focus:ring-sky-900"
                      placeholder="Paste or type a web site URL"
                      v-model="state.bookmarkLink"
                      @input="handleRenderBookmark"
                    />
                  </div>
                </div>
              </figure>
            </fieldset>

            <div class="feature-divider feature-divider--between"></div>

            <fieldset class="grid grid-cols-1 gap-y-4">
              <figcaption class="flex items-center text-base">
                Background
              </figcaption>
              <figure>
                <section class="rounded-lg flex flex-wrap gap-2 justify-center items-center" lg="gap-1">
                  <div
                    class="relative w-16 h-16 rounded-lg cursor-pointer"
                    lg="w-12 h-12"
                    v-for="item in gradientColorList"
                    :key="item.name"
                    :class="[
                      item.class,
                      {
                        'border border-2 border-white border-opacity-60':
                          item.name === state.selectedGradientBgName
                      }
                    ]"
                    @click="handleSelectBackground(item.name)"
                  >
                    <mdi:circle
                      class="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] duration-300 w-5 h-5 text-slate-900/20 scale-100 ease-in-out"
                      :class="{
                        'scale-0 translate-y-0':
                          item.name !== state.selectedGradientBgName
                      }"
                    />
                  </div>
                </section>
              </figure>
              <figure>
                <div class="flex justify-between">
                  <label class="flex items-center text-sm mb-1"
                    >Gradient Angle</label
                  >
                  <section
                    class="rounded-lg flex flex-wrap gap-1 bg-slate-200 relative gradient-border"
                    dark="bg-slate-900 bg-opacity-80"
                  >
                    <GradientAngleSelector
                      v-model:value="state.gradientAngle"
                    />
                  </section>
                </div>
              </figure>
              <figure>
                <div class="flex justify-between items-center">
                  <label class="flex items-center text-sm mb-1">Grainy</label>

                  <section class="rounded-lg flex flex-wrap gap-1">
                    <div class="flex items-center h-5">
                      <input
                        aria-describedby="remember"
                        type="checkbox"
                        class="w-4 h-4 cursor-pointer bg-slate-50 rounded border border-gray-300 focus:ring-2 focus:ring-sky-300"
                        dark="bg-slate-700 border-slate-600 focus:ring-sky-600 ring-offset-slate-800"
                        required
                        v-model="state.gradientGrainy"
                      />
                    </div>
                  </section>
                </div>
              </figure>
            </fieldset>

            <div class="feature-divider feature-divider--between"></div>

            <fieldset class="grid grid-cols-2 py-2">
              <figcaption class="flex items-center text-base">
                Padding
              </figcaption>
              <figure>
                <input
                  type="range"
                  min="0"
                  max="128"
                  step="2"
                  class="w-full range"
                  v-model="globalStore.setting.padding"
                />
              </figure>
            </fieldset>

            <div class="feature-divider feature-divider--between"></div>

            <fieldset class="grid py-2 gap-2">
              <figcaption class="flex items-center text-base">
                Rounded Corners
              </figcaption>
              <figure class="flex justify-between items-center">
                <label class="flex items-center text-sm">Wrapper</label>
                <section class="rounded-lg flex flex-wrap gap-1">
                  <VbSelect
                    class="w-40"
                    v-model:value="state.wrapperRoundedCornersValue"
                    :options="state.roundedCornersOption"
                  />
                </section>
              </figure>

              <figure class="flex justify-between items-center">
                <label class="flex items-center text-sm">Bookmark</label>
                <section class="rounded-lg flex flex-wrap gap-1">
                  <VbSelect
                    class="w-40"
                    v-model:value="state.bookmarkRoundedCornersValue"
                    :options="state.roundedCornersOption"
                  />
                </section>
              </figure>
            </fieldset>

            <div class="feature-divider feature-divider--between"></div>

            <div class="space-x-2 flex justify-center items-center">
              <button
                class="btn-icon text-xl inline-block"
                title="$t('button.toggle_layout')"
                @click="isHorizontal = !isHorizontal"
              >
                <mdi-dock-right v-if="isHorizontal" />
                <mdi-dock-top v-else />
              </button>

              <button
                class="btn-icon text-xl inline-block"
                title="$t('button.show_qrcode')"
                @click="showQRCode = !showQRCode"
              >
                <mdi:qrcode v-if="showQRCode" />
                <mdi:qrcode-scan v-else />
              </button>
            </div>

            <div class="feature-divider feature-divider--between"></div>

            <div class="grid grid-cols-2 gap-2">
              <button
                class="btn btn-secondary btn-blur w-full"
                :disabled="state.isCopying"
                @click="handleCopyImage"
              >
                <div
                  class="w-5 h-5 flex justify-center items-center"
                  v-if="state.isCopying"
                >
                  <SpinIcon />
                </div>
                <carbon:copy class="w-5 h-5" v-else />
                <span class="ml-2 text-base">Copy</span>
              </button>

              <button
                class="btn btn-primary btn-blur w-full"
                @click="handleDownloadImage"
              >
                <carbon:download class="w-5 h-5" />
                <span class="ml-2 text-base">Download</span>
              </button>
            </div>
          </div>
        </nav>
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

      <template v-if="notifyList.length > 0">
        <VbNotify
          placement="TOP"
          :notify-list="notifyList"
          @close="removeNotify"
        />
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, onMounted } from 'vue'
import domtoimage from 'dom-to-image'
import { copyBlobToClipboard } from 'copy-image-clipboard'
import { saveAs } from 'file-saver'
import { useDebounceFn, useMediaQuery } from '@vueuse/core'

// import { isDark, toggleDark } from '@/composables/useDark'
import { useRetinaImage } from '@/composables/useRetinaImage'
import type { NotifyItem } from '@/types'
import { useGlobalStore } from '@/store/global'

// type CornerSize = 'none' | 'lg' | '2xl' | '3xl'
// type GradientAngle = 'tl' | 't' | 'tr' | 'l' | 'r' | 'bl' | 'b' | 'br'

const globalStore = useGlobalStore()
const showQRCode = ref(true)
const isHorizontal = ref(false)
const localBookmarkLink = ref('https://github.com/one-tab-group/bookmark.style')
const notifyList = ref<NotifyItem[]>([])

const state = reactive({
  // local state
  bookmarkLink: 'https://github.com/',
  isCopying: false,
  roundedCornersOption: [
    {
      label: 'None',
      value: 'none'
    },
    {
      label: 'Small',
      value: 'lg'
    },
    {
      label: 'Medium',
      value: '2xl'
    },
    {
      label: 'Large',
      value: '3xl'
    }
  ],
  wrapperRoundedCornersValue: '2xl',
  bookmarkRoundedCornersValue: 'lg',
  // background
  gradientAngle: 'br',
  gradientGrainy: false,
  selectedGradientBgName: 'OCEANIC'
})

const handleRenderBookmark = useDebounceFn((e: any) => {
  localBookmarkLink.value = e?.target?.value ?? ''
}, 1000)
const isMobileScreen = useMediaQuery('(max-width: 640px)')
const isLargeScreen = useMediaQuery('(min-width: 1024px)')

const gradientColorList = computed(() => {
  const angle = state.gradientAngle

  return [
    {
      name: 'OCEANIC',
      class: `bg-gradient-to-${angle} from-green-300 via-blue-500 to-purple-600`
    },
    {
      name: 'HYPER',
      class: `bg-gradient-to-${angle} from-pink-500 via-red-500 to-yellow-500`
    },
    {
      name: 'COTTON CANDY',
      class: `bg-gradient-to-${angle} from-pink-300 via-purple-300 to-indigo-400`
    },
    {
      name: 'SUNSET',
      class: `bg-gradient-to-${angle} from-indigo-200 via-red-200 to-yellow-100`
    },
    {
      name: 'PEACHY',
      class: `bg-gradient-to-${angle} from-red-200 via-red-300 to-yellow-200`
    },
    {
      name: 'POWERPUFF',
      class: `bg-gradient-to-${angle} from-sky-400 via-rose-400 to-lime-400`
    },
    {
      name: 'GOTHAM',
      class: `bg-gradient-to-${angle} from-gray-700 via-gray-900 to-black`
    },
    {
      name: 'SPACE',
      class: `bg-gradient-to-${angle} from-gray-900 to-gray-600`
    },
    {
      name: 'GUNMETAL',
      class: `bg-gradient-to-${angle} from-gray-200 via-gray-400 to-gray-600`
    },
    {
      name: 'MIDNIGHT',
      class: `bg-gradient-to-${angle} from-blue-700 via-blue-800 to-gray-900`
    },
    {
      name: 'MESSENGER',
      class: `bg-gradient-to-${angle} from-sky-400 to-blue-500`
    },
    {
      name: 'SEA',
      class: `bg-gradient-to-${angle} from-teal-200 to-lime-200`
    }
  ]
})

const selectedBackground = computed(() => {
  if (state.selectedGradientBgName) {
    const idx = gradientColorList.value.findIndex(
      (item) => item.name === state.selectedGradientBgName
    )
    return gradientColorList.value[idx].class
  }
  return gradientColorList.value[0].class
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

const removeNotify = (item: NotifyItem) => {
  const index = notifyList.value.indexOf(item)
  if (index >= 0) notifyList.value.splice(index, 1)
}

const handleCopyImage = async () => {
  state.isCopying = true
  const bookmarkEl = document.getElementById('bookmark') as HTMLImageElement
  let timer: any = null

  try {
    const { imageBlob } = await useRetinaImage(bookmarkEl)

    const newNotify: NotifyItem = {
      style: 'SUCCESS',
      title: 'Image copied to clipboard!'
    }

    notifyList.value.push(newNotify)

    if (timer) clearTimeout(timer)

    timer = setTimeout(() => {
      removeNotify(newNotify)
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

const handleDownloadSVG = async () => {
  const bookmarkEl = document.getElementById('bookmark') as HTMLImageElement
  const dataURI = await domtoimage.toSvg(bookmarkEl)
  if (dataURI) {
    const link = document.createElement('a')
    link.download = 'web-visual-bookmark.svg'
    link.href = dataURI
    link.click()
  }
}

const handleSelectBackground = (name: string) => {
  state.selectedGradientBgName = name
}

onMounted(() => {
  localBookmarkLink.value = state.bookmarkLink
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

.feature-divider {
  @apply w-full h-[2px] max-w-screen-xl mx-auto my-2;
}

.feature-divider--between {
  background: linear-gradient(
    90deg,
    rgba(179, 132, 201, 0),
    rgba(14, 165, 233, 0.66),
    rgba(179, 132, 201, 0)
  );
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
