import { defineStore } from 'pinia'

import { GlobalState, GlobalSetting } from '@/types'

export const useGlobalStore = defineStore({
  id: 'global',

  state: (): GlobalState => ({
    setting: {
      bookmarkLink: 'https://bookmark.style',
      selectedGradientBgName: 'OCEANIC',
      gradientAngle: 'br',
      gradientGrainy: false,
      padding: 64,
      wrapperRoundedCorner: '2xl',
      bookmarkRoundedCorner: 'lg',
      isHorizontal: false,
      showQRCode: true,
    },
  }),

  getters: {
    gradientColorList(state) {
      const angle = state.setting.gradientAngle
    
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
    }
  },

  actions: {
    setGlobalState(payload: GlobalState) {
      Object.assign(this.$state, payload)
    },
    setGlobalSetting(payload: GlobalSetting) {
      Object.assign(this.setting, payload)
    },
  },
})
