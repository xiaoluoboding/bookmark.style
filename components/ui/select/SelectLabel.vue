<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { SelectLabel as SelectLabelPrimitive, type SelectLabelProps as SelectLabelPropsBase } from 'reka-ui'

interface SelectLabelProps extends SelectLabelPropsBase {
  class?: HTMLAttributes['class']
}

const props = defineProps<SelectLabelProps>()
</script>

<template>
  <SelectLabelPrimitive v-bind="props" :class="cn('px-2 py-1.5 text-sm font-semibold', props.class)">
    <slot />
  </SelectLabelPrimitive>
</template>
