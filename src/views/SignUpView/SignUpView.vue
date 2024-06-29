<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'SignUpView',
  setup() {
    const email = ref('')
    const password = ref('')
    const error = ref('')
    const store = useStore()

    const handleSubmit = async () => {
      error.value = ''
      try {
        await store.dispatch('auth/signUp', { email: email.value, password: password.value })
      } catch (error) {
        console.error('Sign-up error:', error.message)
        error.value = error.message
      }
    }

    return {
      email,
      password,
      error,
      handleSubmit
    }
  }
})
</script>

<template>
  <div>
    <div class="max-w-[400px] mx-auto min-h-[600px] px-4 py-20">
      <h1 class="text-2xl font-bold">Sign Up</h1>
      <p v-if="error" class="bg-red-300 p-3 my-2">{{ error }}</p>
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
        <button class="w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl">
          Sign up
        </button>
      </form>
      <p class="my-4">
        Already have an account?
        <router-link to="/signin" class="text-accent"> Sign in </router-link>
      </p>
    </div>
  </div>
</template>
