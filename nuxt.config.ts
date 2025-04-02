import { defineNuxtConfig } from 'nuxt/config'
import ViteComponents from 'unplugin-vue-components/vite'
import IconsResolver from 'unplugin-icons/resolver'

export default defineNuxtConfig({
  app: {
    head: {
      title: 'Bookmark Style: Stylish your visual web bookmark',
      viewport:
        'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0',
      link: [{ rel: 'icon', type: 'image/*', href: '/favicon.svg' }],
      meta: [
        {
          property: 'og:title',
          content: 'Bookmark Style: Stylish your visual web bookmark'
        },
        {
          property: 'og:description',
          content:
            '🪄 Turn any link into a stylish visual web bookmark, one-click to copy the beautiful web bookmark image.'
        },
        { property: 'og:image', content: 'https://bookmark.style/preview.png' },
        { property: 'og:url', content: 'https://bookmark.style' },
        { property: 'og:site_name', content: 'Bookmark Style' },
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
          content: 'Bookmark Style: Stylish your visual web bookmark'
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
          'data-domain': 'bookmark.style',
          src: 'https://plausible.io/js/script.js'
        },
        {
          defer: true,
          'data-key': 'wyrtuR2TisSg6v6gGW/r/A',
          src: 'https://analytics.ahrefs.com/analytics.js'
        }
      ]
    }
  },

  modules: [
    '@pinia/nuxt',
    'unplugin-icons/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/tailwindcss'
  ],

  css: ['~/assets/css/tailwind.css'],

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

  runtimeConfig: {
    public: {
      METAFY_API_KEY: process.env.METAFY_API_KEY,
      NODE_ENV: process.env.NODE_ENV
    }
  },

  compatibilityDate: '2025-04-01'
})
