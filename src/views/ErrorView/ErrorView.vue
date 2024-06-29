<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import ErrorSVG from './icons/ErrorSVG.vue'
import Paper from '../../components/Paper/Paper.vue'

interface Error {
  message: string
  statusText: string
}

export default defineComponent({
  components: {
    ErrorSVG,
    Paper
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const error = ref<Error | null>(null)

    onMounted(() => {
      const routeError = route.meta.error as Error | undefined
      if (routeError) {
        error.value = routeError
        console.error('Error: ', error.value)
      }
    })

    const onHomeClick = () => {
      router.push('/')
    }

    return {
      error,
      onHomeClick
    }
  }
})
</script>

<template>
  <Paper id="error-page">
    <div class="h-full w-full bg-primary flex items-center mt-5">
      <div
        class="container flex flex-col md:flex-row items-center justify-center px-5 text-primary"
      >
        <div class="max-w-md">
          <div class="text-5xl font-dark font-bold">404</div>
          <p class="text-2xl md:text-3xl font-light leading-normal">
            Sorry we couldn&apos;t find this page.
          </p>
          <p>
            <i>{{ error?.statusText || error?.message }}</i>
          </p>
          <p class="mb-8">But don&apos;t worry, I&apos;m here to take you to our homepage.</p>
          <button
            class="px-4 inline py-2 text-sm font-medium leading-5 shadow text-btnText transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-button active:bg-button"
            @click="onHomeClick"
          >
            Back To HomePage
          </button>
        </div>
        <div class="max-w-lg">
          <ErrorSVG />
        </div>
      </div>
    </div>
  </Paper>
</template>
