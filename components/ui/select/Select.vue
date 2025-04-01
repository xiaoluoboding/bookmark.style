<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  type SelectContentProps as SelectContentPropsBase,
  type SelectGroupProps as SelectGroupPropsBase,
  type SelectItemProps as SelectItemPropsBase,
  type SelectLabelProps as SelectLabelPropsBase,
  type SelectRootProps as SelectRootPropsBase,
  type SelectTriggerProps as SelectTriggerPropsBase,
  type SelectValueProps as SelectValuePropsBase,
} from 'reka-ui'

interface SelectProps extends SelectRootPropsBase {
  class?: HTMLAttributes['class']
}

interface SelectTriggerProps extends SelectTriggerPropsBase {
  class?: HTMLAttributes['class']
}

interface SelectValueProps extends SelectValuePropsBase {
  class?: HTMLAttributes['class']
}

interface SelectContentProps extends SelectContentPropsBase {
  class?: HTMLAttributes['class']
}

interface SelectLabelProps extends SelectLabelPropsBase {
  class?: HTMLAttributes['class']
}

interface SelectGroupProps extends SelectGroupPropsBase {
  class?: HTMLAttributes['class']
}

interface SelectItemProps extends SelectItemPropsBase {
  class?: HTMLAttributes['class']
}

const props = defineProps<SelectProps>()
</script>

<template>
  <SelectRoot v-bind="props" :class="cn('w-full', props.class)">
    <slot />
  </SelectRoot>
</template>
