<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { SelectValue as SelectValuePrimitive, type SelectValueProps as SelectValuePropsBase } from 'reka-ui'

interface SelectValueProps extends SelectValuePropsBase {
  class?: HTMLAttributes['class']
}

const props = defineProps<SelectValueProps>()
</script>

<template>
  <SelectValuePrimitive v-bind="props" :class="cn('truncate', props.class)">
    <slot />
  </SelectValuePrimitive>
</template>
