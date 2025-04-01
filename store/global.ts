import { defineStore } from 'pinia'

import type { GlobalState, GlobalSetting } from '@/types'

export const useGlobalStore = defineStore({
  id: 'global',

  state: (): GlobalState => ({
    setting: {
      bookmarkLink: 'https://bookmark.style',
      selectedGradientBgName: 'OCEANIC',
      gradientAngle: 'br',
      gradientGrainy: false,
      padding: 32,
      wrapperRoundedCorner: '2xl',
      bookmarkRoundedCorner: 'lg',
      isHorizontal: false,
      showQRCode: true
    }
  }),

  getters: {
    gradientColorList(state) {
      const angle = state.setting.gradientAngle
      const direction =
        angle === 'r'
          ? '90deg'
          : angle === 'l'
          ? '270deg'
          : angle === 't'
          ? '0deg'
          : angle === 'b'
          ? '180deg'
          : angle === 'tr'
          ? '45deg'
          : angle === 'tl'
          ? '315deg'
          : angle === 'br'
          ? '135deg'
          : angle === 'bl'
          ? '225deg'
          : '135deg'

      return [
        {
          name: 'OCEANIC',
          style: {
            background: `linear-gradient(${direction}, var(--color-green-300), var(--color-blue-500), var(--color-purple-600))`
          }
        },
        {
          name: 'HYPER',
          style: {
            background: `linear-gradient(${direction}, var(--color-pink-500), var(--color-red-500), var(--color-yellow-500))`
          }
        },
        {
          name: 'COTTON CANDY',
          style: {
            background: `linear-gradient(${direction}, var(--color-pink-300), var(--color-purple-300), var(--color-indigo-400))`
          }
        },
        {
          name: 'SUNSET',
          style: {
            background: `linear-gradient(${direction}, var(--color-indigo-200), var(--color-red-200), var(--color-yellow-100))`
          }
        },
        {
          name: 'PEACHY',
          style: {
            background: `linear-gradient(${direction}, var(--color-red-200), var(--color-red-300), var(--color-yellow-200))`
          }
        },
        {
          name: 'POWERPUFF',
          style: {
            background: `linear-gradient(${direction}, var(--color-sky-400), var(--color-rose-400), var(--color-lime-400))`
          }
        },
        {
          name: 'GOTHAM',
          style: {
            background: `linear-gradient(${direction}, var(--color-gray-700), var(--color-gray-900), var(--color-black))`
          }
        },
        {
          name: 'SPACE',
          style: {
            background: `linear-gradient(${direction}, var(--color-gray-900), var(--color-gray-600))`
          }
        },
        {
          name: 'GUNMETAL',
          style: {
            background: `linear-gradient(${direction}, var(--color-gray-200), var(--color-gray-400), var(--color-gray-600))`
          }
        },
        {
          name: 'MIDNIGHT',
          style: {
            background: `linear-gradient(${direction}, var(--color-blue-700), var(--color-blue-800), var(--color-gray-900))`
          }
        },
        {
          name: 'MESSENGER',
          style: {
            background: `linear-gradient(${direction}, var(--color-sky-400), var(--color-blue-500))`
          }
        },
        {
          name: 'SEA',
          style: {
            background: `linear-gradient(${direction}, var(--color-teal-200), var(--color-lime-200))`
          }
        }
      ]
    }
  },

  actions: {
    setGlobalState(payload: GlobalState) {
      Object.assign(this.$state, payload)
    },
    setGlobalSetting(payload: GlobalSetting) {
      Object.assign(this.setting, payload)
    }
  }
})
