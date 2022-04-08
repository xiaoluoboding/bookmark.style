import { defineStore } from "pinia"

type GlobalSetting = {
  padding: number
}

type GlobalState = {
  setting: GlobalSetting
}

export const useGlobalStore = defineStore({
  id: "global",

  state: (): GlobalState => ({
    setting: {
      padding: 64,
    },
  }),

  getters: {
    isPaddingZero: (state) => state.setting.padding === 0,
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
