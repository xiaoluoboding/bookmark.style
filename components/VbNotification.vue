<template>
  <div
    class="fixed inset-0 px-4 py-6 pointer-events-none sm:p-6 z-50"
    :class="placementClass"
  >
    <template
      v-for="(notification, idx) of notificationList.slice().reverse()"
      :key="idx"
    >
      <transition
        enter-active-class="transform ease-out duration-300 transition"
        enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          class="max-w-sm w-full bg-white bg-opacity-70 shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden glass"
          dark="bg-slate-700 bg-opacity-40"
        >
          <div class="p-4">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <template v-if="notification.style == 'SUCCESS'">
                  <heroicons-outline:check-circle
                    class="h-6 w-6 text-green-500"
                  />
                </template>
                <template v-else-if="notification.style == 'WARN'">
                  <heroicons-outline:exclamation
                    class="h-6 w-6 text-yellow-600"
                  />
                </template>
                <template v-else-if="notification.style == 'CRITICAL'">
                  <heroicons-outline:exclamation-circle
                    class="h-6 w-6 text-red-600"
                  />
                </template>
                <template v-else>
                  <heroicons-outline:information-circle
                    class="w-6 h-6 text-blue-600"
                  />
                </template>
              </div>
              <div class="ml-3 w-0 flex-1 pt-0.5">
                <p
                  class="text-sm font-medium text-slate-900 dark:text-slate-50 whitespace-pre-wrap"
                >
                  {{ notification.title }}
                </p>
                <p
                  class="mt-1 text-sm text-slate-500 dark:text-slate-50 whitespace-pre-wrap"
                >
                  {{ notification.description }}
                </p>
              </div>
              <div class="ml-4 flex-shrink-0 flex">
                <button
                  class="bg-transparent rounded-md inline-flex text-slate-400 hover:text-slate-500 focus:outline-none"
                  dark="hover:text-slate-300"
                  @click.prevent="$emit('close', notification)"
                >
                  <span class="sr-only">Close</span>
                  <!-- Heroicon name: solid/x -->
                  <heroicons-solid:x class="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { withDefaults, computed } from 'vue'
import type { NotificationItem, NotificationPlacement } from '@/types'

// For <sm breakpoint, we always position it at the center.
const placementClassMap: Map<NotificationPlacement, string> = new Map([
  [
    'TOP_LEFT',
    'flex flex-col-reverse items-start justify-center sm:justify-end'
  ],
  ['TOP', 'flex flex-col items-center justify-start'],
  [
    'TOP_RIGHT',
    'flex flex-col-reverse items-end justify-center sm:justify-end'
  ],
  [
    'BOTTOM_LEFT',
    'flex flex-col space-y-2 items-start justify-center sm:justify-end'
  ],
  ['BOTTOM', 'flex flex-col-reverse space-y-2 items-center justify-start'],
  [
    'BOTTOM_RIGHT',
    'flex flex-col space-y-2 items-end justify-center sm:justify-end'
  ],
  [
    'CENTER',
    'flex flex-col space-y-2 items-center justify-center sm:justify-center'
  ]
])

const props = withDefaults(
  defineProps<{
    notificationList: NotificationItem[]
    placement?: NotificationPlacement
  }>(),
  {
    placement: 'CENTER'
  }
)

defineEmits<{
  (event: 'close', notificationItem: NotificationItem): void
}>()

const placementClass = computed(() => placementClassMap.get(props.placement))
</script>
