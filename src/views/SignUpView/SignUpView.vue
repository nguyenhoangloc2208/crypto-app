<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import validateEmail from '../../utils/validateEmail'

export default defineComponent({
  name: 'SignUpView',
  setup() {
    const email = ref<string>('')
    const password = ref<string>('')
    const error = ref('')
    const store = useStore()
    const isLoading = ref<boolean>(false)
    const isSuccess = ref<boolean>(false)
    const router = useRouter()

    const handleSubmit = async () => {
      if (!validateEmail(email.value)) {
        error.value = 'Invalid email address'
      } else {
        error.value = ''
        try {
          isLoading.value = true
          await store.dispatch('auth/signUp', { email: email.value, password: password.value })
          isSuccess.value = true
          await new Promise((resolve) => setTimeout(resolve, 2000))
          router.push('/signin')
        } catch (e) {
          console.error('Sign-up error:', e.message)
          error.value = e.message ? e.message : e
          console.log(error)
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
      isLoading,
      isSuccess
    }
  }
})
</script>

<template>
  <div>
    <div class="max-w-[400px] mx-auto min-h-[600px] px-4 py-20">
      <h1 class="text-2xl font-bold">Sign Up</h1>
      <p v-if="error" class="text-red-600 p-3 my-2">{{ error }}</p>
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
          <span v-else>Sign up</span>
        </button>
      </form>
      <div v-if="isSuccess" class="text-green-600">Success!</div>
      <p class="my-4">
        Already have an account?
        <router-link to="/signin" class="text-accent"> Sign in </router-link>
      </p>
    </div>
  </div>
</template>
