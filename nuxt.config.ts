import { defineNuxtConfig } from 'nuxt3'
import ViteComponents from 'unplugin-vue-components/vite'
import IconsResolver from 'unplugin-icons/resolver'

export default defineNuxtConfig({
  meta: {
    title: 'bookmark.style: stylish your visual web bookmark',
    viewport:
      'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0',
    description:
      '🪄 Turn any link into a stylish visual web bookmark, one-click to copy the beautiful web bookmark image.',
    link: [{ rel: 'icon', type: 'image/*', href: '/favicon.svg' }],
    meta: [
      {
        property: 'og:title',
        content: 'bookmark.style: stylish your visual web bookmark'
      },
      {
        property: 'og:description',
        content:
          '🪄 Turn any link into a stylish visual web bookmark, one-click to copy the beautiful web bookmark image.'
      },
      { property: 'og:image', content: 'https://bookmark.style/preview.png' },
      { property: 'og:url', content: 'https://bookmark.style' },
      { property: 'og:stie_name', content: 'Bookmark Style' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '900' },
      {
        property: 'og:image:alt',
        content:
          '🪄 Turn any link into a stylish visual web bookmark, one-click to copy the beautiful web bookmark image.'
      },
      { property: 'twitter:site', content: 'Bookmark Style' },
      {
        property: 'twitter:title',
        content: 'bookmark.style: stylish your visual web bookmark'
      },
      { property: 'twitter:card', content: 'summary_large_image' },
      {
        property: 'twitter:description',
        content:
          '🪄 Turn any link into a stylish visual web bookmark, one-click to copy the beautiful web bookmark image.'
      },
      {
        property: 'twitter:image:src',
        content: 'https://bookmark.style/preview.png'
      }
    ],
    script: [
      {
        async: true,
        defer: true,
        'data-website-id': process.env.UMAMI_WEBSITE_ID,
        src: 'https://analytics.bookmark.style/umami.js'
      }
    ]
  },
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
  publicRuntimeConfig: {
    NODE_ENV: process.env.NODE_ENV,
    CHATWOOT_WEBSITE_TOKEN: process.env.CHATWOOT_WEBSITE_TOKEN,
    UMAMI_WEBSITE_ID: process.env.UMAMI_WEBSITE_ID
  }
})
