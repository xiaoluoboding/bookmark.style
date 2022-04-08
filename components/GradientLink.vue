<script lang="ts">
import { h, defineComponent } from 'vue'

export default defineComponent({
  name: 'GradientLink',
  props: {
    to: {
      type: String,
      default: ''
    }
  },
  setup(props, { slots }) {
    return () =>
      h(
        'a',
        {
          class: [
            'gradient-link',
            'bg-clip-text',
            'text-transparent',
            'bg-gradient-to-r',
            'dark:from-sky-500',
            'dark:to-sky-200',
            'from-sky-500',
            'to-sky-800',
            'p-1',
            'no-underline',
            'transition-all',
            'duration-200',
            'ease-out'
          ],
          href: props.to,
          target: '_blank'
        },
        slots
      )
  }
})
</script>

<style scoped>
/* sky-500 */
.gradient-link:hover {
  box-shadow: inset 0 -2px 0 #0ea5e9;
}
</style>
