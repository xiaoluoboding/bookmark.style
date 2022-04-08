<template>
  <div class="text-secondary-darker dark:text-white bg-cloud-surface dark:bg-sky-darkest">
    <div class="relative flex items-top justify-center min-h-screen sm:items-center sm:pt-0">
      <div class="max-w-4xl mx-auto sm:px-6 lg:px-8">
        <div class="flex justify-center items-center pt-8 sm:justify-start sm:pt-0">
          <svg width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M29.7513 14.261C28.0767 11.3817 23.8903 11.3817 22.2157 14.261L3.96535 45.641C2.29077 48.5204 4.38399 52.1195 7.73316 52.1195H21.9804C20.5493 50.8688 20.0193 48.7051 21.1023 46.8487L34.9243 23.1556L29.7513 14.261Z"
              fill="#80EEC0" />
            <path
              d="M41.3151 21.1443C42.701 18.7885 46.1656 18.7885 47.5515 21.1443L62.6552 46.8188C64.0411 49.1746 62.3088 52.1194 59.537 52.1194H29.3296C26.5579 52.1194 24.8255 49.1746 26.2114 46.8188L41.3151 21.1443Z"
              fill="#00DC82" />
          </svg>
          <div class="ml-4">
            <h1 text="2xl">A Better Nuxt 3 Starter</h1>
          </div>
        </div>
        <div class="mt-4 bg-white dark:bg-sky-darker overflow-hidden shadow sm:rounded-lg">
          <div class="grid grid-cols-1 md:grid-cols-2">
            <div class="p-6">
              <div class="flex items-center">
                <svg class="w-6 h-6 text-cloud-dark dark:text-cloud-light" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
                <div class="ml-4 text-lg leading-7 font-semibold">
                  <a href="https://v3.nuxtjs.org" target="_blank" rel="noopener" class="hover:underline text-sky-black dark:text-white">
                    {{ messages.documentation }}
                  </a>
                </div>
              </div>
              <div class="ml-10">
                <div class="mt-2 text-cloud-dark dark:text-cloud-light text-sm">
                  {{ messages.readDocs }}<br/>
                  <a href="https://v3.nuxtjs.org" class="inline-block mt-2 text-primary hover:underline" target="_blank" rel="noopener">
                    {{ messages.documentation }}
                  </a>
                </div>
              </div>
            </div>
            <div class="p-6 border-t border-gray-200 dark:border-sky-darkest md:border-t-0 md:border-l">
              <div class="flex items-center">
                <svg class="w-6 h-6 text-cloud-dark dark:text-cloud-light" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                </svg>
                <div class="ml-4 text-lg leading-7 font-semibold">
                  <a href="https://twitter.com/nuxt_js" target="_blank" rel="noopener"
                    class="hover:underline text-sky-black dark:text-white">Twitter</a>
                </div>
              </div>
              <div class="ml-10">
                <div class="mt-2 text-cloud-dark dark:text-cloud-light text-sm">
                  {{ messages.followTwitter }}<br>
                  <a href="https://twitter.com/nuxt_js" target="_blank" class="inline-block mt-2 text-primary hover:underline" rel="noopener">@nuxt_js</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="mt-4 text-sm bg-white border-l-8 border-cloud-light dark:bg-sky-darker dark:border-sky overflow-hidden shadow sm:rounded-lg p-6 pl-4">
          <p>To remove this welcome page, <strong class="font-bold">you have 2 options</strong>:</p>
          <ul class="list-inside list-disc pt-1 pl-2">
            <li>Create an <code class="text-primary">app.vue</code></li>
            <li>Create a <code class="text-primary">pages/index.vue</code></li>
          </ul>
        </div>
        <!-- Plugins -->
        <div
          class="mt-4 text-sm bg-white border-l-8 border-cloud-light dark:bg-sky-darker dark:border-sky overflow-hidden shadow sm:rounded-lg p-6 pl-4">
          <p>Plugins</p>
          <ul class="list-inside list-disc pt-1 pl-2">
            <li><a class="text-primary hover:underline" href="https://github.com/windicss/nuxt-windicss" target="_blank">nuxt-windicss</a></li>
            <li><a class="text-primary hover:underline" href="https://github.com/antfu/unplugin-icons">unplugin-icons</a></li>
            <li><a class="text-primary hover:underline" href="https://pinia.esm.dev/ssr/nuxt.html">@pinia/nuxt</a></li>
            <li><a class="text-primary hover:underline" href="https://github.com/intlify/nuxt3">@intlify/nuxt3</a></li>
            <li><a class="text-primary hover:underline" href="https://vueuse.org/nuxt/readme.html#vueuse-nuxt">@vueuse/nuxt3</a></li>
          </ul>
        </div>
        <!-- Pinia -->
        <div
          class="mt-4 text-sm bg-white border-l-8 border-cloud-light dark:bg-sky-darker dark:border-sky overflow-hidden shadow sm:rounded-lg p-6 pl-4">
          <p>Some usefull examples:</p>
          <ul class="list-inside list-disc pt-1 pl-2">
            <li>
              Use <strong>Pinia</strong> manage store <button class="text-primary px-2 py-1 bg-sky-darker dark:bg-sky-dark focus:outline-transparent rounded-sm" @click="counterStore.increment">Counter {{ counterStore.n }}</button>
            </li>
            <li>
              Create a Serverless Functions in <a class="text-primary hover:underline" href="api/hello?name=World" target="_blank">server/api.ts</a>
              <code>{{ data }}</code>
            </li>
          </ul>
        </div>
        <!-- Vue i18n -->
        <div
          class="mt-4 text-sm bg-white border-l-8 border-cloud-light dark:bg-sky-darker dark:border-sky overflow-hidden shadow sm:rounded-lg p-6 pl-4">
          <p>Vue i18n examples:</p>
          <ul class="list-inside list-disc pt-1 pl-2">
            <li>
              {{ t('hello', { name: "A Better Nuxt 3 Starter" }) }}
            </li>
            <li>
              {{ t('menu.home') }}
            </li>
          </ul>
        </div>

        <div class="py-8 flex justify-center items-center space-x-2">
          <button class="text-primary px-2 py-1 bg-sky-darker dark:bg-sky-dark focus:outline-transparent rounded-sm" @click="toggleLocales">
            <carbon:language class="h-5 w-5" />
          </button>
          <button class="text-primary px-2 py-1 bg-sky-darker dark:bg-sky-dark focus:outline-transparent rounded-sm" @click="e => toggleDark()">
            <carbon:sun class="h-5 w-5" v-if="isDark" />
            <carbon:moon class="h-5 w-5" v-else />
          </button>
          <button class="text-primary px-2 py-1 bg-sky-darker dark:bg-sky-dark focus:outline-transparent rounded-sm" @click="e => gotoGitHub()">
            <carbon:logo-github class="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="absolute left-0 bottom-0 flex items-center justify-center w-full mb-4 text-primary">
    Powered By <simple-icons:nuxtdotjs class="h-4 w-4 mx-2" /> NuxtJS
  </div>
</template>

<script lang="ts" setup>
import { useCounter } from './store/counter'
import { useI18n } from 'vue-i18n'
import { isDark, toggleDark } from './composables/dark'

const { t, locale, availableLocales } = useI18n()
const counterStore = useCounter()

const messages = {
  "title": "Welcome to Nuxt 3!",
  "documentation": "Documentation",
  "readDocs": "We highly recommend you take a look at the Nuxt documentation, whether you are new or have previous experience with the framework.",
  "followTwitter": "Follow the Nuxt Twitter account to get latest news about releases, new modules, tutorials and tips."
}

// fetch data from server/api
const { data } = await useAsyncData('/api/hello', () => {
  return $fetch('/api/hello', {
    params: {
      name: 'world'
    }
  })
})

const toggleLocales = () => {
  // change to some real logic
  const locales = availableLocales
  console.log(locale.value)
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}

const gotoGitHub = () => {
  window.open('https://github.com/xiaoluoboding/nuxt3-starter')
}
</script>
