<template>
  <div class="qrcode-svg" v-html="baseQRCodeSVG" :class="{'is-dark': isDark}"></div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import fancyQRCode, { createQRCode, renderImage } from 'fancy-qrcode'
import { isDark } from "@/composables/useDark"

const props = defineProps({
  /**
   * find the special alias and render it
   */
  url: { type: String, require: true, default: '' },
  /**
   * control the bookmark size
   */
  size: { type: String, default: 'medium' }
})

const baseQRCodeSVG = computed(() => {
  return createQRCode({
    content: props.url,
    eyeframeType: 'round',
    eyeballType: 'round',
    eyeColor: isDark.value ? '#f9f9f9' : '#333',
    type: 'round',
    size: 50,
    bodyColor: isDark.value ? '#fafafa' : '#222'
  })
})
// const imageQRCodeSVG = computed(() => {
//   return renderImage({
//     content: props.url,
//     eyeType: 'round',
//     // eyeColor: isDark.value ? '#f9f9f9' : '#333',
//     type: 'round',
//     // size: 50,
//     opacity: 50,
//     // bodyColor: isDark.value ? '#fafafa' : '#222',
//   })
// })

// const resImageQRCodeSVG = ref()

// onMounted(async () => {
//   resImageQRCodeSVG.value = await fancyQRCode.renderResImage({
//     contrast: 50,
//     eyeColor: '#1af',
//     bodyColor: '#1af'
//   })
//   // eslint-disable-next-line no-console
//   // console.log(baseQRCodeSVG.value)
// })
</script>

<style scoped></style>
