<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'SignInView',
  components: {},
  setup() {
    const email = ref('')
    const password = ref('')
    const error = ref('')
    const router = useRouter()
    const store = useStore()

    const handleSubmit = async () => {
      error.value = ''
      try {
        await store.dispatch('auth/signIn', { email: email.value, password: password.value })
        router.push('/account')
      } catch (e) {
        error.value = e.message
        console.log(e.message)
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
        <button class="w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl">
          Sign in
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
