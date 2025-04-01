<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { SelectItem as SelectItemPrimitive, type SelectItemProps as SelectItemPropsBase } from 'reka-ui'

interface SelectItemProps extends SelectItemPropsBase {
  class?: HTMLAttributes['class']
}

const props = defineProps<SelectItemProps>()
</script>

<template>
  <SelectItemPrimitive
    v-bind="props"
    :class="cn(
      'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      props.class
    )"
  >
    <slot />
  </SelectItemPrimitive>
</template>
