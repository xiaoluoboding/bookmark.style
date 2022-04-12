<template>
  <div class="grid grid-cols-3 p-1 rounded-lg z-10">
    <component
      class="cursor-pointer w-5 h-5"
      v-for="(item, key) in state.angleMap"
      :is="item"
      :key="key"
      :class="{
        'text-sky-500': state.selectedAngle === key,
        'cursor-not-allowed': key === 'none'
      }"
      @click="handleSelect(key)"
    />
  </div>
  <div class="absolute left-0 top-0 z-0">
    <svg viewBox="0 0 200 200" class="w-full h-full">
      <g class="dot-grid">
        <template v-for="m in 11" :key="m">
          <template v-for="n in 11" :key="n">
            <circle
              :cx="(m / 6) * 100"
              :cy="(n / 6) * 100"
              r="1"
              class="fill-slate-800 opacity-80"
              dark="fill-slate-50 opacity-80"
            ></circle>
          </template>
        </template>
      </g>
    </svg>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { reactive, shallowRef } from 'vue'
import MdiPanTopLeft from '~icons/mdi/pan-top-left'
import MdiPanUp from '~icons/mdi/pan-up'
import MdiPanTopRight from '~icons/mdi/pan-top-right'
import MdiPanLeft from '~icons/mdi/pan-left'
import MdiCircleMedium from '~icons/mdi/circle-medium'
import MdiPanRight from '~icons/mdi/pan-right'
import MdiPanBottomLeft from '~icons/mdi/pan-bottom-left'
import MdiPanDown from '~icons/mdi/pan-down'
import MdiPanBottomRight from '~icons/mdi/pan-bottom-right'

import { GradientAngle } from '@/types'

defineProps({
  value: {
    type: String as PropType<GradientAngle | string>,
    default: 'br',
    require: true
  }
})

const emit = defineEmits<{
  (e: 'update:value', content: GradientAngle): void,
  (e: 'change', content: GradientAngle): void
}>()


const state = reactive({
  angleMap: {
    tl: shallowRef(MdiPanTopLeft),
    t: shallowRef(MdiPanUp),
    tr: shallowRef(MdiPanTopRight),
    l: shallowRef(MdiPanLeft),
    none: shallowRef(MdiCircleMedium),
    r: shallowRef(MdiPanRight),
    bl: shallowRef(MdiPanBottomLeft),
    b: shallowRef(MdiPanDown),
    br: shallowRef(MdiPanBottomRight)
  },
  selectedAngle: 'br'
})

const handleSelect = (key: GradientAngle) => {
  if (key === 'none') return
  state.selectedAngle = key
  emit('change', key)

}
</script>
