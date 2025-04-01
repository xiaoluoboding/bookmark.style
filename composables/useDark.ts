import { useDark as useVueUseDark, useToggle } from '@vueuse/core'

export const isDark = useVueUseDark()
export const toggleDark = useToggle(isDark)
