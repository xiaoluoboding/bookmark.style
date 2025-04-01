<template>
  <footer
    :class="cn(
      'fixed bottom-4 left-0 w-full flex justify-center items-center',
      'text-neutral-900 dark:text-neutral-300 text-sm opacity-60'
    )"
  >
    <div class="copyright flex flex-col justify-center items-center">
      <p>
        Code with ❤ & ☕️ by
        <a class="text-neon" href="https://x.com/robert_shaw_x"
          >@xiaoluoboding</a
        >
        <span> © {{ new Date().getFullYear() }}</span>
      </p>
      <p class="flex items-center space-x-1">
        <carbon:logo-twitter class="text-sky-500" />
        <span>
          <a
            href="https://x.com/robert_shaw_x"
            class="text-neon"
            target="_blank"
          >
            Follow me on Twitter
          </a>
        </span>
        <span class="px-2 text-sky-300">|</span>
        <carbon:cafe class="text-sky-500" />
        <span>
          <a
            href="https://www.buymeacoffee.com/xlbd"
            target="_blank"
            class="text-neon"
          >
            Buy me a coffee
          </a>
        </span>
        <span class="px-2 text-sky-300">|</span>
        <mdi:heart class="text-sky-500" />
        <span>
          <a
            href="https://github.com/sponsors/xiaoluoboding"
            target="_blank"
            class="text-neon"
          >
            Sponsor me on GitHub
          </a>
        </span>
      </p>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import { cn } from '@/lib/utils'
</script>
