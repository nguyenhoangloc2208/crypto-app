<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import validateEmail from '../../utils/validateEmail'

export default defineComponent({
  name: 'SignInView',
  components: {},
  setup() {
    const email = ref<string>('')
    const password = ref<string>('')
    const error = ref('')
    const router = useRouter()
    const store = useStore()
    const isLoading = ref<boolean>(false)

    const handleSubmit = async () => {
      if (!validateEmail(email.value)) {
        error.value = 'Invalid email address'
      } else {
        error.value = ''
        try {
          isLoading.value = true
          await store.dispatch('auth/signIn', { email: email.value, password: password.value })
          router.push('/account')
        } catch (e) {
          error.value = e.message ? e.message : e
          console.log(e.message)
        } finally {
          isLoading.value = false
        }
      }
    }

    return {
      email,
      password,
      error,
      handleSubmit,
      isLoading
    }
  }
})
</script>

<template>
  <div>
    <div class="max-w-[400px] mx-auto min-h-[600px] px-4 py-20">
      <h1 class="text-2xl font-bold">Sign In</h1>
      <form @submit.prevent="handleSubmit">
        <div class="my-4">
          <label>Email</label>
          <div class="my-2 w-full relative rounded-2xl shadow-xl">
            <input
              v-model="email"
              class="w-full p-2 bg-primary border border-input rounded-2xl"
              type="email"
            />
          </div>
        </div>
        <div class="my-4">
          <label>Password</label>
          <div class="my-2 w-full relative rounded-2xl shadow-xl">
            <input
              v-model="password"
              class="w-full p-2 bg-primary border border-input rounded-2xl"
              type="password"
            />
          </div>
        </div>
        <button
          :disabled="isLoading"
          class="w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl"
        >
          <div v-if="isLoading" class="flex justify-center items-center">
            <span class="loading loading-spinner loading-sm mt-1 mx-auto block"></span>
          </div>
          <span v-else>Sign in</span>
        </button>
      </form>
      <p class="my-4">
        Don't have an account?
        <router-link to="/signup" class="text-accent"> Sign up </router-link>
      </p>
      <p v-if="error" class="text-red-500">{{ error }}</p>
    </div>
  </div>
</template>
