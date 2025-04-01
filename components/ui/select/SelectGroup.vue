<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { SelectGroup as SelectGroupPrimitive, type SelectGroupProps as SelectGroupPropsBase } from 'reka-ui'

interface SelectGroupProps extends SelectGroupPropsBase {
  class?: HTMLAttributes['class']
}

const props = defineProps<SelectGroupProps>()
</script>

<template>
  <SelectGroupPrimitive v-bind="props" :class="cn('px-1 py-1.5', props.class)">
    <slot />
  </SelectGroupPrimitive>
</template>
