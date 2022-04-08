<template>
  <header
    class="relative h-16 pt-8 flex justify-between items-center gap-4 w-full"
  >
    <GradientLink class="text-2xl font-semibold"> bookmark.style </GradientLink>

    <div class="flex items-center justify-end gap-4">
      <button
        class="icon-btn text-slate-900 dark:text-slate-200 !outline-none"
        title="Toggle Dark Mode"
        @click="(e) => toggleDark()"
      >
        <carbon-moon class="w-8 h-8" v-if="isDark" />
        <carbon-sun class="w-8 h-8" v-else />
      </button>
      <a
        class="icon-btn text-slate-900 dark:text-slate-200"
        rel="noreferrer"
        href="https://github.com/one-tab-group/bookmark.run"
        target="_blank"
        title="GitHub"
      >
        <carbon-logo-github class="h-8 w-8" />
      </a>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { isDark, toggleDark } from '@/composables/useDark'
</script>
