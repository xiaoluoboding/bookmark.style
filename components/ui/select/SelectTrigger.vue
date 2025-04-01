<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { SelectTrigger as SelectTriggerPrimitive, type SelectTriggerProps as SelectTriggerPropsBase } from 'reka-ui'

interface SelectTriggerProps extends SelectTriggerPropsBase {
  class?: HTMLAttributes['class']
}

const props = defineProps<SelectTriggerProps>()
</script>

<template>
  <SelectTriggerPrimitive
    v-bind="props"
    :class="cn(
      'flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
      props.class
    )"
  >
    <slot />
  </SelectTriggerPrimitive>
</template>
