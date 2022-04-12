<template>
  <div class="mt-1 relative">
    <button
      type="button"
      class="relative w-full bg-slate-100 bg-opacity-50 border border-slate-300 rounded-md shadow-sm pl-2 pr-6 py-1 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-xs"
      sm="text-sm"
      lg="pl-3 pr-10 py-2"
      dark="bg-slate-700 bg-opacity-40 border-slate-600 text-slate-200 focus:border-sky-500 focus:bg-sky-900 focus:ring-2 focus:ring-sky-900"
      aria-haspopup="listbox"
      aria-expanded="true"
      aria-labelledby="listbox-label"
      @click="localState.showDropdown = !localState.showDropdown"
    >
      <span class="flex items-center">
        <span class="block truncate text-slate-700" dark="text-slate-200">
          {{ localState.selectedOption }}
        </span>
      </span>
      <span
        class="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
      >
        <!-- Heroicon name: solid/selector -->
        <heroicons-solid:selector class="h-5 w-5 text-slate-400" />
      </span>
    </button>

    <ul
      class="absolute z-10 mt-1 w-full shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto glass focus:outline-none sm:text-sm"
      bg="!opacity-30 white dark:slate-800"
      text="slate-800 dark:white"
      tabindex="-1"
      role="listbox"
      aria-labelledby="listbox-label"
      aria-activedescendant="listbox-option-3"
      v-show="localState.showDropdown"
      v-on-click-outside="handleCloseDropdown"
    >
      <li
        class="cursor-pointer select-none relative py-2 pl-3 pr-9"
        :class="[
          {
            'bg-slate-300 dark:bg-sky-900':
              option.label === localState.selectedOption
          }
        ]"
        text="slate-800 dark:white"
        hover="bg-slate-300 dark:bg-sky-900"
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
          class="text-sky-600 absolute inset-y-0 right-0 flex items-center pr-2"
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

type SelectOption = {
  label: string
  value: string | number
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
