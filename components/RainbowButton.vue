<template>
  <div class="group w-full">
    <component
    :is="is"
    :class="
      cn(
        'rainbow-button',
        'relative w-full inline-flex h-11 cursor-pointer items-center justify-center rounded-xl border-0 bg-[length:200%] px-8 py-2 font-medium text-primary-foreground transition-all duration-300 [background-clip:padding-box,border-box,border-box] [background-origin:border-box] [border:calc(0.08*1rem)_solid_transparent] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
        {
          'before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5 before:-translate-x-1/2 before:bg-[linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))] before:bg-[length:200%] before:[filter:blur(calc(0.8*1rem))] before:transition-opacity before:duration-300': true,
          'before:opacity-100 group-hover:before:opacity-100': !props.secondary,
          'before:opacity-0 group-hover:before:opacity-100': props.secondary,
          'bg-[linear-gradient(#121213,#121213),linear-gradient(#121213_50%,rgba(18,18,19,0.6)_80%,rgba(18,18,19,0)),linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))]': !props.secondary,
          'dark:bg-[linear-gradient(#fff,#fff),linear-gradient(#fff_50%,rgba(255,255,255,0.6)_80%,rgba(0,0,0,0)),linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))]': !props.secondary,
          'bg-neutral-800/60 dark:bg-neutral-700 dark:text-white group-hover:dark:text-black group-hover:bg-[linear-gradient(#121213,#121213),linear-gradient(#121213_50%,rgba(18,18,19,0.6)_80%,rgba(18,18,19,0)),linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))] dark:group-hover:bg-[linear-gradient(#fff,#fff),linear-gradient(#fff_50%,rgba(255,255,255,0.6)_80%,rgba(0,0,0,0)),linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))]': props.secondary,
        },
        props.class,
      )
    "
  >
    <slot />
  </component>
  </div>
</template>

<script setup lang="ts">
import { cn } from "@/lib/utils";
import { computed } from "vue";

interface RainbowButtonProps {
  class?: string;
  is?: string;
  speed?: number;
  secondary?: boolean;
}

const props = withDefaults(defineProps<RainbowButtonProps>(), {
  speed: 2,
  is: "button",
  secondary: false,
});

const speedInSeconds = computed(() => `${props.speed}s`);
</script>

<style scoped>
.rainbow-button {
  --color-1: hsl(0 100% 63%);
  --color-2: hsl(270 100% 63%);
  --color-3: hsl(210 100% 63%);
  --color-4: hsl(195 100% 63%);
  --color-5: hsl(90 100% 63%);
  --speed: v-bind(speedInSeconds);
  transition: background 0.3s ease;
}

.rainbow-button:not(.secondary), 
.group:hover .rainbow-button.secondary {
  animation: rainbow var(--speed) infinite linear;
}

.rainbow-button:not(.secondary):before,
.group:hover .rainbow-button.secondary:before {
  animation: rainbow var(--speed) infinite linear;
}

@keyframes rainbow {
  0% {
    background-position: 0;
  }
  100% {
    background-position: 200%;
  }
}
</style>