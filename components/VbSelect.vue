<template>
  <div class="mt-1 relative">
    <button
      type="button"
      :class="cn(
        'relative w-full bg-neutral-100 bg-opacity-50 border border-neutral-300 rounded-md shadow-sm pl-2 pr-6 py-1 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-xs',
        'sm:text-sm',
        'lg:pl-3 lg:pr-10 lg:py-2',
        'dark:bg-neutral-700 dark:bg-opacity-40 dark:border-neutral-600 dark:text-neutral-200 dark:focus:border-neutral-500 dark:focus:bg-neutral-900 dark:focus:ring-2 dark:focus:ring-neutral-900'
      )"
      aria-haspopup="listbox"
      aria-expanded="true"
      aria-labelledby="listbox-label"
      @click="localState.showDropdown = !localState.showDropdown"
    >
      <span class="flex items-center">
        <span :class="cn('block truncate text-neutral-700', 'dark:text-neutral-200')">
          {{ localState.selectedOption }}
        </span>
      </span>
      <span
        class="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
      >
        <!-- Heroicon name: solid/selector -->
        <heroicons-solid:selector class="h-5 w-5 text-neutral-400" />
      </span>
    </button>

    <ul
      :class="cn(
        'absolute z-10 mt-1 w-full shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto glass focus:outline-none sm:text-sm',
        'bg-white bg-opacity-30 dark:bg-neutral-800',
        'text-neutral-800 dark:text-white'
      )"
      tabindex="-1"
      role="listbox"
      aria-labelledby="listbox-label"
      aria-activedescendant="listbox-option-3"
      v-show="localState.showDropdown"
      v-on-click-outside="handleCloseDropdown"
    >
      <li
        :class="cn(
          'cursor-pointer select-none relative py-2 pl-3 pr-9',
          'text-neutral-800 dark:text-white',
          'hover:bg-neutral-300 dark:hover:bg-neutral-900',
          { 'bg-neutral-300 dark:bg-neutral-900': option.label === localState.selectedOption }
        )"
        id="listbox-option-0"
        role="option"
        v-for="option in props.options"
        :key="option.label"
        @click="handleSelectOption(option)"
      >
        <div class="flex items-center">
          <span class="font-normal block truncate">
            {{ option.label }}
          </span>
        </div>
        <span
          class="text-neutral-600 absolute inset-y-0 right-0 flex items-center pr-2"
          v-if="option.label === localState.selectedOption"
        >
          <!-- Heroicon name: solid/check -->
          <heroicons-solid:check class="h-5 w-5" />
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { reactive, computed } from 'vue'
import { vOnClickOutside } from '@vueuse/components'
import { cn } from '../lib/utils'

type SelectOption = {
  label: string
  value: any
}

const props = defineProps({
  options: {
    type: Array as PropType<SelectOption[]>,
    default: () => []
  },
  value: {
    type: [String, Number] as PropType<SelectOption['value']>,
    default: ''
  },
  visiable: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits<{
  (e: 'update:value', content: SelectOption['value']): void,
  (e: 'change', content: SelectOption['value']): void
}>()

const localState = reactive({
  showDropdown: false,
  selectedOption: computed(() => {
    const option = props.options.find((option) => option.value === props.value)
    return option ? option.label : ''
  })
})

const handleCloseDropdown = () => {
  localState.showDropdown = false
}

const handleSelectOption = (option: SelectOption) => {
  handleCloseDropdown()
  emit('change', option.value)
}
</script>
