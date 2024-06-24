<template>
  <div :class="computedClasses">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { twMerge } from 'tailwind-merge'

interface Props {
  className?: string
  level?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}

export default defineComponent({
  name: 'PaperVue',
  props: {
    className: String,
    level: {
      type: String as PropType<Props['level']>,
      default: 'md'
    }
  },
  computed: {
    computedClasses(): string {
      return twMerge(
        `shadow-${this.level} w-full rounded-lg bg-white dark:bg-dblack p-4`,
        this.className
      )
    }
  }
})
</script>
