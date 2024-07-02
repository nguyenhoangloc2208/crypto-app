<script lang="ts">
import { defineComponent, ref } from 'vue'
import ThemeToggle from '../Navbar/ThemeToggle/ThemeToggle.vue'
import Paper from '../Paper/Paper.vue'
import 'primeicons/primeicons.css'

export default defineComponent({
  name: 'AppFooter',
  components: {
    ThemeToggle,
    Paper
  },
  setup() {
    const email = ref('')

    const handleSubmit = () => {
      console.log('Email:', email.value)
    }

    return {
      email,
      handleSubmit
    }
  }
})
</script>

<template>
  <Paper class="rounded-div mt-8 pt-8 text-primary">
    <div class="grid md:grid-cols-2">
      <div class="flex justify-between w-full md:max-w-[300px] uppercase">
        <div>
          <h2 class="font-bold">Support</h2>
          <ul>
            <li class="text-sm py-2">Help Center</li>
            <li class="text-sm py-2">Contact Us</li>
            <li class="text-sm py-2">API Status</li>
            <li class="text-sm py-2">Documentation</li>
          </ul>
        </div>
        <div>
          <h2 class="font-bold">Info</h2>
          <ul>
            <li class="text-sm py-2">About Us</li>
            <li class="text-sm py-2">Careers</li>
            <li class="text-sm py-2">Invest</li>
            <li class="text-sm py-2">Legal</li>
          </ul>
        </div>
      </div>
      <div class="text-right">
        <div class="w-full flex justify-end">
          <div class="w-full md:w-[300px] py-4 relative">
            <div class="flex justify-center md:justify-end py-4 md:py-0 md:pb-4 mt-[-1rem]">
              <ThemeToggle />
            </div>
            <p class="text-center md:text-right">Sign up for crypto news</p>
            <div class="py-4">
              <form @submit.prevent="handleSubmit">
                <input
                  v-model="email"
                  class="text-primary p-2 mr-2 w-full shadow-xl rounded-2xl md:w-auto bg-input"
                  type="email"
                  placeholder="Enter your email"
                />
                <button
                  class="bg-button text-btnText px-4 p-2 w-full rounded-2xl shadow-xl hover:shadow-2xl md:w-auto my-2"
                  type="submit"
                >
                  Sign up
                </button>
              </form>
            </div>
            <div class="flex py-4 justify-between text-accent">
              <i class="pi pi-instagram"></i>
              <i class="pi pi-tiktok"></i>
              <i class="pi pi-twitter"></i>
              <i class="pi pi-facebook"></i>
              <i class="pi pi-github"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="text-center py-4">Powered by Coin Gecko</p>
  </Paper>
</template>
