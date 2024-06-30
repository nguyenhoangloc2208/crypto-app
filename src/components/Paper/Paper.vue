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
        `border border-secondary rounded-2xl shadow-xl bg-primary p-4 max-w-[1140px] w-full mx-auto`,
        this.className
      )
    }
  }
})
</script>
