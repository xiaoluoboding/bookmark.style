import { defineNuxtConfig } from 'nuxt3'
import ViteComponents from 'unplugin-vue-components/vite'
import IconsResolver from 'unplugin-icons/resolver'

export default defineNuxtConfig({
  meta: {
    title: 'bookmark.style: stylish your web visual bookmark',
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0',
    description: '🪄 Turn any link into a stylish web visual bookmark, one-click to copy the beautiful web bookmark image.',
    link: [
      {
        rel: "icon",
        type: "image/*",
        href: "/favicon.svg",
      },
    ],
  },
  modules: [
    'vue-plausible'
  ],
  buildModules: [
    'nuxt-windicss',
    '@pinia/nuxt',
    'unplugin-icons/nuxt',
    '@vueuse/nuxt'
  ],
  components: {
    global: true,
    dirs: ['~/components']
  },
  vite: {
    plugins: [
      ViteComponents({
        resolvers: [
          IconsResolver({
            componentPrefix: ''
          })
        ],
        dts: true
      })
    ]
  },
  plausible: {
    domain: 'bookmark.style'
  },
  publicRuntimeConfig: {
    PLAUSIBLE_TOKEN: process.env.PLAUSIBLE_TOKEN
  }
})
